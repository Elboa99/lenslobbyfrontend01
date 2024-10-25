import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css';  // Crea un file CSS per lo stile del footer

const Footer = () => {
  return (
    <Navbar bg="dark" variant="dark" className="footer fixed-bottom shadow-sm">
      <Container className="justify-content-between">
        {/* Brand o logo */}
        <Navbar.Brand as={Link} to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Unsplash_logo.svg/2560px-Unsplash_logo.svg.png"
            alt="LensLobby"
            style={{ height: '24px' }}
          />
        </Navbar.Brand>

        {/* Link del footer */}
        <Nav>
          <Nav.Link href="https://www.instagram.com/kennyboa_/" target="_blank">
            <i className="bi bi-instagram"></i> Instagram
          </Nav.Link>
          <Nav.Link href="https://www.youtube.com/" target="_blank">
            <i className="bi bi-youtube"></i> YouTube
          </Nav.Link>
          <Nav.Link href="/aboutus">
            About Us
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Footer;
