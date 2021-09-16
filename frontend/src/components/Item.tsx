import './../styles/Item.css';
import ItemIcon from './ItemIcon';
import uncheckedIcon from '../assets/empty-checkbox.png';
import checkedIcon from '../assets/checked-box.png';
import deleteIcon from '../assets/delete.png';

import { Col, Container, Row } from 'react-bootstrap';


function Item(props: {
    id: string, title: string, content: string,
    status: string, setUpdateNeeded: (val: boolean) => void
}) {
    const id = props.id;
    const title = props.title;
    const content = props.content;
    const status = props.status;

    const setUpdateNeeded = props.setUpdateNeeded;

    function handleDeleteClick() {
        deleteTodoItem((res: Response) => {
            // console.log(res);
            setUpdateNeeded(true);
        }, id);
    }

    function deleteTodoItem(callback: (res: Response) => void, id: string) {
        let url: string = "http://localhost:5000/api/items/" + id + "/";
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
            .then((res) => {
                callback(res);
            });
    }

    function handleCheckboxClick() {
        updateTodoItemStatus((res: Response) => {
            // console.log(res);
            setUpdateNeeded(true);
        }, id, status);
    }

    function updateTodoItemStatus(callback: (res: Response) => void, id: string, status: string) {
        let url: string = "http://localhost:5000/api/items/" + status + "/" + id + "/";
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
            .then((res) => {
                callback(res);
            });
    }

    return (
        <Container id={"item-" + id} fluid>
            <Row className="justify-content-between align-items-center">
                <Col className="col-10">
                    <h2>{title}</h2>
                    <pre>{content}</pre>
                </Col>
                <Col className="col-1">
                    <ItemIcon
                        icon={status === "todo" ? uncheckedIcon : checkedIcon}
                        name="checkbox-icon"
                        onClick={handleCheckboxClick}
                    />
                </Col>
                <Col className="col-1">
                    <ItemIcon
                        icon={deleteIcon}
                        name="delete-icon"
                        onClick={handleDeleteClick}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default Item;