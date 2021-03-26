import './App.css';
import Web3 from 'web3'
import React, { Component } from 'react';
import { Button, Modal } from "react-bootstrap";
import { LineChart } from 'react-chartkick'
import 'chart.js'
import { NavigationBar } from './components/NavigationBar';

var steps = {
  "2021-03-16": 2230, "2021-03-17": 12234, "2021-03-18": 5432, "2021-03-19": 6578,
  "2021-03-20": 7898, "2021-03-21": 4200, "2021-03-22": 6942
};

class App extends Component {

handleClose = () => this.setState({show: true});
handleShow = () => this.setState({show: false});

async claimTokens() {
  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
  let abi = require('./abis/claimTokensAbi.js');
  var contract = new web3.eth.Contract(abi, '0xEBCee40Ce9CfAa4E6B0DdC007a8AB829D463d018');
  contract.methods.claimTokens().send({from: this.state.account})
}

componentWillMount() {
  this.loadBlockchainData()
}

async loadBlockchainData() {
  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
  const accounts = await web3.eth.getAccounts()
  this.setState({ account: accounts[0] })
}

constructor(props) {
  super(props)
  this.state = { account: '', show: false }
}

render() {
  return (
    <div className="App">

    <NavigationBar />

    <p>Your account: {this.state.account}</p>

    <p>
      <Button variant="warning" onClick={this.handleShow}>
          Open Demo Modal
      </Button>
      <Button variant="primary" onClick={this.claimTokens}>
          Claim Tokens!
      </Button>
      <Button variant="link">
        <a href="https://github.com/login/oauth/authorize?client_id=489170c61ca8acc8d476">Sign in with GitHub</a>
      </Button>
    </p>

      <header className="App-header">
        <h1>Exercise Token</h1>

          <Modal size="sml" show={this.show} onHide={this.handleClose}>
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

        <p>Daily Steps</p>
        <LineChart data={steps} colors={["#0074D9"]} width="70%" height="400px" thousands=","/>

      </header>
    </div>
  );
}
}

export default App;
