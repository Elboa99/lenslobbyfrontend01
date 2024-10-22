import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Homepage.css';

const Homepage = () => {
  const [immagini, setImmagini] = useState([]);

  useEffect(() => {
    // Dati di esempio
    const immaginiData = [
      { id: 1, url: 'https://via.placeholder.com/300', autore: 'Fotografo 1', fotografoId: 1 },
      { id: 2, url: 'https://via.placeholder.com/300', autore: 'Fotografo 2', fotografoId: 2 },
      { id: 3, url: 'https://via.placeholder.com/300', autore: 'Fotografo 3', fotografoId: 3 },
    ];
    setImmagini(immaginiData);
  }, []);

  return (
    <Container fluid className="homepage-container mt-5">
      <div className="hero-section text-center">
        <h1 className="hero-title">Benvenuto su LensLobby</h1>
        <p className="hero-subtitle">Esplora le foto dei migliori fotografi freelance.</p>
      </div>

      {/* Sezione delle Immagini */}
      <Container className="images-section mt-5">
        <Row>
          {immagini.map((immagine) => (
            <Col md={4} className="mb-4" key={immagine.id}>
              <div className="image-card">
                {/* Link che porta alla pagina del fotografo */}
                <Link to={`/fotografo/${immagine.fotografoId}`}>
                  <Image src={immagine.url} fluid className="hover-image-effect" />
                </Link>
                <p className="mt-2">{immagine.autore}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default Homepage;
