import React from 'react';
import { Navbar, Nav, Container, Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        {/* Logo */}
        <Navbar.Brand href="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Unsplash_logo.svg/2560px-Unsplash_logo.svg.png"
            alt="LensLobby"
            style={{ height: '24px' }}
          />
        </Navbar.Brand>

        {/* Bottone per mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Link e barra di ricerca */}
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Barra di ricerca */}
          <Form className="d-flex mx-auto" style={{ maxWidth: '500px' }}>
            <InputGroup>
              <InputGroup.Text>
                <i className="bi bi-search"></i>
              </InputGroup.Text>
              <FormControl
                type="search"
                placeholder="Cerca Fotografo"
              />
            </InputGroup>
          </Form>

          {/* Link di navigazione a destra */}
          <Nav className="ml-auto">
          <Nav.Link as={Link} to="/profilo">Profilo</Nav.Link>
            <Nav.Link as={Link} to="/register">Registrati</Nav.Link> 
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Button as={Link} to="/upload" variant="outline-dark">Submit an image</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
