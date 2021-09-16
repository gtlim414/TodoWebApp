import './App.css';
import CreateItem from './components/CreateItem';
import ItemListTab from './components/ItemListTab';
import { useState } from 'react';

import { Col, Container, Row } from 'react-bootstrap';

/**
 * Should use React.FC 
 * https://www.harrymt.com/blog/2020/05/20/react-typescript-react-fc.html
 * https://stackoverflow.com/questions/59988667/typescript-react-fcprops-confusion
 **/
function App() {
  const [updateNeeded, setUpdateNeeded] = useState(true)

  return (
    <div className="todo h-100">
      <Container fluid>
        <Row className="justify-content-center mt-3">
          <Col className="col-3 text-center">
            <h1>ToDo</h1>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col className="col-6">
            <CreateItem setUpdateNeeded={setUpdateNeeded}></CreateItem>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col className="col-8">
            <ItemListTab
              updateNeeded={updateNeeded}
              setUpdateNeeded={setUpdateNeeded}
            />
          </Col>
        </Row>
        <Row className="justify-content-center mt-5 fixed-bottom bg-dark">
          <Col className="col-8 text-center">
            <footer>
              <h4>Credits</h4>
              <div>
                Icons made by <a
                  href="https://www.freepik.com"
                  title="Freepik"
                >
                  Freepik
                </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
              </div>
            </footer>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
