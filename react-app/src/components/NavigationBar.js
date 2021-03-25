import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from "react-bootstrap";


export class NavigationBar extends Component {

  render() {
    return(
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
          </Nav>
          <Navbar.Text>
            Signed in as: <a href="#login">Nikolai Nekrutenko</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    )
  }

}
