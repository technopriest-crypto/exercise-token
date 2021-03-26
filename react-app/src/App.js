import './styles/App.css';
import Web3 from 'web3'
import React, { Component } from 'react';
import { Button, Modal, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LineChart } from 'react-chartkick'
import 'chart.js'

import DarkMode from "./components/DarkMode"
// import { NavigationBar } from './components/NavigationBar';
// Step data that is displayed on graph
var steps = {
  "2021-03-16": 2230, "2021-03-17": 12234, "2021-03-18": 5432, "2021-03-19": 6578,
  "2021-03-20": 7898, "2021-03-21": 4200, "2021-03-22": 6942
};

// Defining the web3 parameters
let web3 = new Web3(Web3.givenProvider);
let contract_address = "0xdEF57D6D6bc7501Af00B4311602d9c7A83E3388F";
let abi = [{'inputs': [{'internalType': 'address', 'name': '_oracle', 'type': 'address'}, {'internalType': 'string', 'name': '_jobId', 'type': 'string'}, {'internalType': 'uint256', 'name': '_fee', 'type': 'uint256'}, {'internalType': 'address', 'name': '_link', 'type': 'address'}, {'internalType': 'contract ExerciseToken', 'name': '_token', 'type': 'address'}], 'stateMutability': 'nonpayable', 'type': 'constructor', 'name': 'constructor'}, {'anonymous': false, 'inputs': [{'indexed': true, 'internalType': 'bytes32', 'name': 'id', 'type': 'bytes32'}], 'name': 'ChainlinkCancelled', 'type': 'event'}, {'anonymous': false, 'inputs': [{'indexed': true, 'internalType': 'bytes32', 'name': 'id', 'type': 'bytes32'}], 'name': 'ChainlinkFulfilled', 'type': 'event'}, {'anonymous': false, 'inputs': [{'indexed': true, 'internalType': 'bytes32', 'name': 'id', 'type': 'bytes32'}], 'name': 'ChainlinkRequested', 'type': 'event'}, {'inputs': [], 'name': 'claimTokens', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'}, {'inputs': [{'internalType': 'bytes32', 'name': '_requestId', 'type': 'bytes32'}, {'internalType': 'uint256', 'name': '_steps', 'type': 'uint256'}], 'name': 'fulfillSteps', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'}, {'inputs': [{'internalType': 'string', 'name': 'source', 'type': 'string'}], 'name': 'stringToBytes32', 'outputs': [{'internalType': 'bytes32', 'name': 'result', 'type': 'bytes32'}], 'stateMutability': 'pure', 'type': 'function'}, {'inputs': [], 'name': 'volume', 'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}], 'stateMutability': 'view', 'type': 'function'}];

// The App itself
class App extends Component {

  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const accounts = await web3.eth.getAccounts()
    window.ethereum.enable();
    this.setState({ account: accounts[0] })
  }

  async claimTokens() {
    web3.eth.getAccounts().then(function (accounts) {
      let contract = new web3.eth.Contract(abi, contract_address);
      contract.methods.claimTokens()
          .send({from: accounts[0], gasPrice: web3.utils.toWei('4.1', 'Gwei')})
          .then(console.log)
          .catch(console.log);
    });
  }

  handleClose() {
		this.setState({ show: false });
	}

	handleShow() {
		this.setState({ show: true });
	}

  constructor(props) {
    super(props)
    this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
    this.state = { account: '', show: false };
  }

  render() {
    return (
      <div className="App">

      {/* The NavigationBar */}
      <Navbar bg="white" expand="lg">
        <Navbar.Brand href="#home">Exercise Token</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">About</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
            <DarkMode />
          </Nav>
          <Navbar.Text>
            Signed in as: {this.state.account}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>

      <header className="App-header">

        {/*<h1>Exercise Token</h1>*/}

        <p>
          <Button variant="warning" onClick={this.handleShow}>
              Open Demo Modal
          </Button>
          <Button variant="primary" onClick={this.claimTokens}>
              Claim Tokens!
          </Button>
          {/*
          <Button variant="link">
              <a href="https://github.com/login/oauth/authorize?client_id=489170c61ca8acc8d476">Sign in with GitHub</a>
          </Button>
          */}
        </p>

        {/* The Modal */}
          <Modal size="sml" show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>🎉</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Signed in with GitHub.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={this.handleClose}>
                Let's get started!
              </Button>
            </Modal.Footer>
          </Modal>

        {/* The Line chart */}
        <p>Daily Steps</p>
        <LineChart data={steps} colors={["#0074D9"]} width="70%" height="400px" thousands=","/>

      </header>
    </div>
    );
  }
}

export default App;
