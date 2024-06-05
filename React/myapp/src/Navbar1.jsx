import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-scroll';
import { LinkContainer } from 'react-router-bootstrap';

function Navbar1() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary fixed-top">
      <Container>
        <Navbar.Brand href="#home">IT-Company</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="home" smooth duration={500}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="about" smooth duration={500}>
              About
            </Nav.Link>
            <Nav.Link as={Link} to="contact" smooth duration={500}>
              Contact
            </Nav.Link>
            <Nav.Link as={Link} to="clients" smooth duration={500}>
              Clients
            </Nav.Link>
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            <NavDropdown title="Register" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">TL Registration</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Developer Registration</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar1;
