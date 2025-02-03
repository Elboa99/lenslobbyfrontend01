import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Card, Modal, Button } from 'react-bootstrap';
import NavigationBar from './NavigationBar';
import './ProfilePage.css';

const FotografoProfile = ({ isAuthenticated }) => {
  const { id } = useParams();
  const [fotografo, setFotografo] = useState({});
  const [immagini, setImmagini] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchFotografoData = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3001/fotografi/public/${id}`);
      if (response.ok) {
        const data = await response.json();
        setFotografo(data);
        setImmagini(data.immagini || []);
      } else {
        throw new Error('Errore nel recuperare i dati del fotografo');
      }
    } catch (error) {
      console.error('Errore nel recuperare i dati del fotografo:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchFotografoData();
  }, [fetchFotografoData, id]);

  const handleImageClick = (immagine) => {
    setSelectedImage(immagine);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  if (loading) {
    return <div>Caricamento in corso...</div>;
  }

  if (error) {
    return <div>Errore: {error}</div>;
  }

  return (
    <>
      
      <NavigationBar isAuthenticated={isAuthenticated} checkAuth={() => {}} />
      <Container className="mt-5 profile-page">
        <Row className="justify-content-md-center mb-4 position-relative">
          <Col>
            <div className="cover-image-container">
              <Image src={fotografo.copertina} fluid className="cover-image" />
            </div>
            <div className="profile-pic-wrapper">
              <Image src={fotografo.immagineProfilo} roundedCircle fluid className="profile-pic" />
            </div>
          </Col>
        </Row>

        <Row className="justify-content-md-center mb-4">
          <Col md={8} className="text-center">
            <h2>{fotografo.nome}</h2>
          </Col>
        </Row>

        <h3>Le immagini del fotografo</h3>
        <Row>
          {immagini.length > 0 ? (
            immagini.map((immagine, index) => (
              <Col md={4} className="mb-4" key={index}>
                <Card style={{ cursor: 'pointer' }}>
                  <Card.Img 
                    variant="top" 
                    src={immagine.url} 
                    className="card-img-top" 
                    onClick={() => handleImageClick(immagine)} 
                  />
                  <Card.Body>
                    <Card.Text>{immagine.descrizione}</Card.Text>
                    <p><strong>Categoria:</strong> {immagine.categoria}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>Non ci sono immagini da visualizzare.</p>
          )}
        </Row>

        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Dettagli Immagine</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedImage && (
              <>
                <Image src={selectedImage.url} fluid className="mb-3" />
                <p><strong>Descrizione:</strong> {selectedImage.descrizione}</p>
                <p><strong>Categoria:</strong> {selectedImage.categoria}</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Chiudi
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default FotografoProfile;
