import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const NavigationBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">LensLobby</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Registrati</Nav.Link>
            <Nav.Link href="/fotografo">Il Mio Profilo</Nav.Link>
            <Button href="/upload" variant="outline-primary" className="ml-2">Carica Immagine</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
