import './App.css';
import React, {useState} from 'react';
import { Button, Modal } from "react-bootstrap";

import { LineChart } from 'react-chartkick'
import 'chart.js'

import { NavigationBar } from './components/NavigationBar';


var steps = {
  "2021-03-16": 2230, "2021-03-17": 12234, "2021-03-18": 5432, "2021-03-19": 6578,
  "2021-03-20": 7898, "2021-03-21": 4200, "2021-03-22": 1234
}

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="App">

    <NavigationBar />

    <p>
      <Button variant="warning" onClick={handleShow}>
          Open Demo Modal
      </Button>
      <Button variant="link">
        <a href="https://github.com/login/oauth/authorize?client_id=489170c61ca8acc8d476">Sign in with GitHub</a>
      </Button>
    </p>

      <header className="App-header">
        <h1>Exercise Token</h1>

          <Modal size="sml" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>🎉</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            Signed in with GitHub.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>
                Let's get started!
              </Button>
            </Modal.Footer>
          </Modal>

        <p>Daily Steps</p>
        <LineChart data={steps} colors={["#0074D9"]} width="70%" height="400px" thousands=","/>

      </header>
    </div>
  );
}

export default App;
