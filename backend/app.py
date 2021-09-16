from flask import Flask, request, abort
from flask.helpers import make_response
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor


app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}, )

# Connect to db
conn = psycopg2.connect(dbname="postgres", user="postgres", password="postgres", host="localhost",
                        port="5432")
cur = conn.cursor(cursor_factory=RealDictCursor)

# Init item, statuses, and itemstatus tables
cur.execute("""
    CREATE TABLE IF NOT EXISTS Items (
        id SERIAL PRIMARY KEY, 
        title VARCHAR NOT NULL,
        content VARCHAR NOT NULL,
        status VARCHAR NOT NULL DEFAULT 'todo');
""")
conn.commit()


# CREATE
@app.route("/api/items/", methods=["POST"])
def add_item():
    # Return status 400 if missing title or content
    if "title" not in request.json.keys() or "content" not in request.json.keys():
        return make_response("Title or content is missing", 400)

    # Get title and content of new todo item from request body
    title = request.json["title"]
    content = request.json["content"]
    # print(title, content)

    # Insert new todo item into table with next id
    try:
        cur.execute(
            "INSERT INTO items (title, content) VALUES (%s, %s);", (title, content))
        conn.commit()
    except:
        abort(500)

    return "Todo Item created"


def _RealDictRow_to_Dict(obj):
    """ Convert RealDictRow to a dictionary where dict key is the column name from db 
        and value is its corresponding row value from db
    """
    item = {}
    for key in obj.keys():
        item[key] = obj[key]
    return item

# READ


@app.route("/api/items/", methods=["GET"])
def get_all_items():
    return _get_filtered_items("all")


@app.route("/api/items/todo/", methods=["GET"])
def get_todo_items():
    return _get_filtered_items("todo")


@app.route("/api/items/completed/", methods=["GET"])
def get_completed_items():
    return _get_filtered_items("completed")


def _get_filtered_items(filter):
    # Retrieve the todo items in table of todo items in reverse order
    try:
        if filter == "all":
            cur.execute("SELECT * FROM items ORDER BY id DESC;")
        else:
            cur.execute(
                "SELECT * FROM items WHERE status=%s ORDER BY id DESC;", (filter,))
    except:
        abort(500)
    queryResult = cur.fetchall()
    itemsList = []
    # print(queryResult)

    # Return the list of items in response
    for queryItem in queryResult:
        itemsList.append(_RealDictRow_to_Dict(queryItem))
    # print(itemsList)
    return {"items": itemsList}

# UPDATE
@app.route("/api/items/todo/<id>/", methods=["PATCH"])
def complete_todo_item(id):
    return _change_todo_item_status("completed", id)

@app.route("/api/items/completed/<id>/", methods=["PATCH"])
def uncomplete_todo_item(id):
    return _change_todo_item_status("todo", id)

def _change_todo_item_status(status, id):
    # Return status 404 if item to delete is not found
    try:
        cur.execute("SELECT * FROM items WHERE id=%s;", (id,))
    except:
        abort(500)
    item_to_delete = cur.fetchone()
    if item_to_delete is None:
        return make_response("There is no todo item with id:" + id, 404)
    
    # Update the todo item's status to completed
    try:
        cur.execute("UPDATE items SET status=%s WHERE id=%s;", (status, id))
    except:
        abort(500)
    return "Todo item status changed to " + status

# DELETE
@app.route("/api/items/<id>/", methods=["DELETE"])
def delete_item(id):
    # Return status 404 if item to delete is not found
    try:
        cur.execute("SELECT * FROM items WHERE id=%s;", (id,))
    except:
        abort(500)
    item_to_delete = cur.fetchone()
    if item_to_delete is None:
        return make_response("There is no todo item with id:" + id, 404)

    # Delete item from db
    cur.execute("DELETE FROM items WHERE id=%s", (id,))
    conn.commit()

    return "Todo item deleted"
