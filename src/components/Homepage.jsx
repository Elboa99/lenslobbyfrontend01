import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Homepage.css';

const Homepage = () => {
  const [immagini, setImmagini] = useState([]);

  useEffect(() => {
    const fetchImmagini = async () => {
      try {
        const response = await fetch('http://localhost:3001/immagini/random?limit=10');
        if (response.ok) {
          const data = await response.json();
          // Filtra solo le immagini che hanno un fotografo e un id valido
          const validData = data.filter(immagine => immagine && immagine.id && immagine.fotografo);
          setImmagini(validData);
        } else {
          console.error('Errore nel recuperare le immagini:', response.statusText);
        }
      } catch (error) {
        console.error('Errore nel recuperare le immagini:', error);
      }
    };

    fetchImmagini();
  }, []);

  return (
    <Container fluid className="homepage-container mt-5 pt-2">
      <div className="hero-section text-center">
        <h1 className="hero-title">Benvenuto su LensLobby</h1>
        <p className="hero-subtitle">Esplora le foto dei migliori fotografi freelance.</p>
      </div>

      {/* Sezione delle Immagini */}
      <Container className="images-section mt-5">
        <Row>
          {immagini.length > 0 ? (
            immagini.map((immagine) => (
              immagine && immagine.fotografo && (
                <Col md={4} className="mb-4" key={immagine.id}>
                  <div className="image-card">
                    {/* Link che porta alla pagina del fotografo */}
                    <Link to={`/fotografo/${immagine.fotografo.id}`}>
                      <Image src={immagine.url} fluid className="hover-image-effect" />
                    </Link>
                    <p className="mt-2">{immagine.fotografo.nome}</p>
                  </div>
                </Col>
              )
            ))
          ) : (
            <p className="text-center">Caricamento in corso...</p>
          )}
        </Row>
      </Container>
    </Container>
  );
};

export default Homepage;
