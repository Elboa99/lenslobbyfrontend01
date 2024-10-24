import React from 'react';
import { Container, Row, Col, Image, Carousel,Card } from 'react-bootstrap';

const AboutUsPage = () => {
  return (
    <Container className="mt-5">
      {/* Titolo e Introduzione */}
      <Row className="justify-content-md-center mb-4">
        <Col md={8} className="text-center">
          <h2>Su di me</h2>
          <p>Sono Kenny, un fotografo freelance appassionato di immortalare i momenti migliori e renderli indimenticabili. Lavoro principalmente con fotografi emergenti e aiuto a far crescere la loro visibilità online.</p>
        </Col>
      </Row>

      {/* Dettagli personali */}
      <Row className="justify-content-md-center mb-4">
        <Col md={8} className="text-center">
          <p>Con uno stile semplice e autentico, sono sempre pronto a raccontare storie attraverso le immagini. Se vuoi collaborare o semplicemente fare una chiacchierata, sentiti libero di contattarmi!</p>
        </Col>
      </Row>

        
    </Container>
  );
};

export default AboutUsPage;
