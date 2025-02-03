import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Homepage.css';
import BASE_URL from '../config';

const Homepage = () => {
  const [immagini, setImmagini] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImmagini = async () => {
      try {
        const response = await fetch(`${BASE_URL}/immagini/random?limit=50`
);
        if (response.ok) {
          const data = await response.json();
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

  const handleImageClick = (immagine) => {
    setSelectedImage(immagine);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  return (
    <Container fluid className="homepage-container mt-5 pt-2">
      {/* Sezione Titolo */}
      <div className="hero-section">
        <h1 className="hero-title">Benvenuto su LensLobby</h1>
        <p className="hero-subtitle">Esplora le foto dei migliori fotografi freelance.</p>
      </div>

      <Container className="images-section">
        <Row>
          {immagini.length > 0 ? (
            immagini.map((immagine) => (
              immagine && immagine.fotografo && (
                <Col md={4} className="mb-4" key={immagine.id}>
                  <div className="image-card position-relative">
                    <Image
                      src={immagine.url}
                      className="hover-image-effect"
                      onClick={() => handleImageClick(immagine)}
                    />
                    <div className="overlay">
                      <Link to={`/fotografo/${immagine.fotografo.id}`} className="text-white photographer-name">
                        {immagine.fotografo.nome}
                      </Link>
                    </div>
                  </div>
                </Col>
              )
            ))
          ) : (
            <p className="text-center">Caricamento in corso...</p>
          )}
        </Row>
      </Container>

      {/* Modal per Dettagli Immagine */}
      {selectedImage && (
        <Modal show={showModal} onHide={handleCloseModal} centered size="lg" className="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>Dettagli della Foto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Image src={selectedImage.url} fluid className="modal-image mb-3" />
            <div>
              <h5>
                Fotografo: 
                <Link to={`/fotografo/${selectedImage.fotografo.id}`} className="text-decoration-none">
                  {` ${selectedImage.fotografo.nome}`}
                </Link>
              </h5>
              <p><strong>Categoria:</strong> {selectedImage.categoria}</p>
              <p><strong>Descrizione:</strong> {selectedImage.descrizione}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Chiudi
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default Homepage;
