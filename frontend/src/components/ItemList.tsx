import './../styles/ItemList.css';
import Item from './Item';
import React, { useEffect, useState } from 'react';

import { ListGroup } from 'react-bootstrap';


function ItemList(props: {
    tabKey: string, updateNeeded: boolean,
    setUpdateNeeded: (val: boolean) => void
}) {
    const tabKey = props.tabKey;
    const [itemList, setItemList] = useState([]);
    const updateNeeded = props.updateNeeded;
    const setUpdateNeeded = props.setUpdateNeeded;


    function getTodoItems(callback: (res: any) => void, filter: string) {
        let url: string;
        if (filter === "all") {
            url = "http://localhost:5000/api/items/"
        } else if (filter === "todo") {
            url = "http://localhost:5000/api/items/todo/"
        } else {
            url = "http://localhost:5000/api/items/completed/"
        }

        // Get todo items
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.errors) {
                    console.log(res.errors);
                }
                else {
                    callback(res.items);
                }
            });
    }

    useEffect(() => {
        if (updateNeeded) {
            getTodoItems((res: any) => {
                // console.log(res);
                setItemList(res);
                setUpdateNeeded(false);
            }, tabKey);
        }
    });

    return (
        <ListGroup variant="flush">
            {
                itemList.map((item: { id: string, title: string, content: string, status: string },
                    i: React.Key) => {
                    return (
                        <ListGroup.Item key={i} className="bg-transparent">
                            <Item
                                id={item.id}
                                title={item.title}
                                content={item.content}
                                status={item.status}
                                setUpdateNeeded={setUpdateNeeded}
                            ></Item>
                        </ListGroup.Item>
                    )
                })
            }
        </ListGroup>
    );
}

export default ItemList;