import './../styles/ItemListTab.css';
import ItemList from './ItemList';
import { useState } from 'react';

import { Tab, Tabs } from 'react-bootstrap';


function ItemListTab(props: { updateNeeded: boolean, setUpdateNeeded: (val: boolean) => void }) {
    const [key, setKey] = useState('todo');
    const updateNeeded = props.updateNeeded;
    const setUpdateNeeded = props.setUpdateNeeded;


    function handleSelectTab(k: any) {
        setKey(k);
        setUpdateNeeded(true);
    }

    return (
        <Tabs
            id="todo-list-tab"
            activeKey={key}
            onSelect={handleSelectTab}
            className="mb-3"
        >
            <Tab
                eventKey="todo"
                title="Todo"
                tabClassName={"text-white " + (key === "todo" ? "bg-info" : "bg-secondary")}>
                <ItemList
                    tabKey={key}
                    updateNeeded={updateNeeded}
                    setUpdateNeeded={setUpdateNeeded}
                />
            </Tab>
            <Tab
                eventKey="completed"
                title="Completed"
                tabClassName={"text-white " + (key === "completed" ? "bg-info" : "bg-secondary")}>
                <ItemList
                    tabKey={key}
                    updateNeeded={updateNeeded}
                    setUpdateNeeded={setUpdateNeeded}
                />
            </Tab>
        </Tabs>
    );
}

export default ItemListTab;