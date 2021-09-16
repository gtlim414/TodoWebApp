import './../styles/CreateItem.css';
import React, { useRef, useState } from 'react';

import { Button, Container, Form, Col, Row } from 'react-bootstrap';


function CreateItem(props: { setUpdateNeeded: (val: boolean) => void }) {
    const setUpdateNeeded = props.setUpdateNeeded;

    const ADD_TODO_TEXT = "Add a todo item..";
    const HIDDEN_CLASS = "hidden";
    const [titlePlaceholder, setTitlePlaceholder] = useState(ADD_TODO_TEXT);
    const [titleValue, setTitleValue] = useState("");
    const [contextValue, setContextValue] = useState("");
    const [hidden, setHidden] = useState(HIDDEN_CLASS);
    const inputTitleRef = useRef<HTMLInputElement>(null);
    const inputContextRef = useRef<HTMLTextAreaElement>(null);


    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (titleValue !== "" || contextValue !== "") {
            // Create todo item
            createTodoItem((res: Response) => {
                // console.log(res);
                setUpdateNeeded(true);
                clearForm();
            });
        }
    }

    function clearForm() {
        if (inputTitleRef.current !== null) {
            inputTitleRef.current.value = "";
        }
        if (inputContextRef.current !== null) {
            inputContextRef.current.value = "";
        }
    }

    function createTodoItem(callback: (res: Response) => void) {
        fetch("http://localhost:5000/api/items/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                title: titleValue,
                content: contextValue
            }),
        })
            .then((res) => {
                callback(res);
            });
    }

    function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTitleValue(e.target.value);
    }

    function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setContextValue(e.target.value);
    }

    function handleTitleClick(e: React.MouseEvent<HTMLInputElement>) {
        setTitlePlaceholder("Title");
        setHidden("");
    }

    function handleCloseClick(e: React.MouseEvent<HTMLButtonElement>) {
        setTitlePlaceholder(ADD_TODO_TEXT);
        setHidden(HIDDEN_CLASS);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="CreateItemFormControl">
                <Form.Control
                    ref={inputTitleRef}
                    className="bg-transparent text-white"
                    type="text"
                    placeholder={titlePlaceholder}
                    onChange={handleTitleChange}
                    onClick={handleTitleClick}
                />
                <Form.Control
                    ref={inputContextRef}
                    className={"bg-transparent text-white " + hidden}
                    as="textarea"
                    rows={4}
                    placeholder={ADD_TODO_TEXT}
                    onChange={handleContentChange}
                />
            </Form.Group>
            <Container>
                <Row className="justify-content-center">
                    <Col className="col-3 text-center">
                        <Button
                            variant="success"
                            type="submit"
                            className={hidden}>
                            Add
                        </Button>
                        <Button
                            variant="dark"
                            type="button"
                            className={hidden}
                            onClick={handleCloseClick}>
                            Close
                        </Button>
                    </Col>
                </Row>
            </Container>

        </Form>
    );
}

export default CreateItem;