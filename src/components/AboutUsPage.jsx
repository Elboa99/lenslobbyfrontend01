import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './AboutUsPage.css'; 
import pfp from "../assets/IMG_2828 PNG.jpg"

const AboutUsPage = () => {
  return (
    <Container className="about-us-page mt-5">
      {/* Sezione principale con immagine e titolo */}
      <Row className="align-items-center mb-5">
        <Col md={6}>
          <h1 className="display-4">FRASE AD EFFETTO</h1>
          <p className="signature">Kenny Boateng</p>
        </Col>
        <Col md={6}>
          <Image 
            src={pfp}
            rounded 
            fluid 
            className="profile-image"
            alt="Profile of Kenny"
          />
        </Col>
      </Row>

      {/* Sezione descrittiva */}
      <Row className="justify-content-md-center mb-4">
        <Col md={8}>
          <p className="lead">
            Sono Kenny, un fotografo freelance appassionato di immortalare i momenti migliori e renderli indimenticabili. Lavoro principalmente con fotografi emergenti e aiuto a far crescere la loro visibilità online.
          </p>
          <p className="lead">
            Con uno stile semplice e autentico, sono sempre pronto a raccontare storie attraverso le immagini. Se vuoi collaborare o semplicemente fare una chiacchierata, sentiti libero di contattarmi!
          </p>
        </Col>
      </Row>

      {/* Quote e testimonianza */}
      <Row className="testimonials">
        <Col md={6}>
          <blockquote className="blockquote">
            <p>
              "Belive you can and you half way there"
            </p>
            <footer className="blockquote-footer">
              Kenny Luigi Boateng
            </footer>
          </blockquote>
        </Col>
      </Row>

      {/* Link ai social media */}
      <Row className="social-links mt-5">
        <Col md={4}>
          <h5>Follow Us</h5>
          <ul className="list-unstyled">
            <li><a href="https://www.instagram.com/kennyboa_/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUsPage;
