import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Card, Modal, Button } from 'react-bootstrap';
import NavigationBar from './NavigationBar'; // Assicurati di importare NavigationBar qui
import './ProfilePage.css';

const ProfilePage = () => {
  const [fotografo, setFotografo] = useState({});
  const [immagini, setImmagini] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchFotografoData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token mancante. Accedi nuovamente.');
        return;
      }

      const response = await fetch('http://localhost:3001/fotografi/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFotografo(data);
        setImmagini(data.immagini || []);
        setLoading(false);
      } else {
        console.error('Errore nel recuperare i dati del fotografo:', response.statusText);
      }
    } catch (error) {
      console.error('Errore nel recuperare i dati del fotografo:', error);
    }
  };

  useEffect(() => {
    fetchFotografoData();
  }, []);

  const aggiornaDatiProfilo = () => {
    fetchFotografoData(); // Richiama la funzione per aggiornare i dati del fotografo e le immagini
  };

  const handleImageClick = (immagine) => {
    setSelectedImage(immagine);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  const handleDeleteImage = async (imageId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Devi essere autenticato per eliminare un'immagine");
      return;
    }

    const confirmDelete = window.confirm("Sei sicuro di voler eliminare questa immagine?");
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/immagini/${imageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Immagine eliminata con successo.");
        // Rimuovi l'immagine dall'array delle immagini nello stato
        setImmagini((prevImmagini) => prevImmagini.filter((immagine) => immagine.id !== imageId));
        handleCloseModal(); // Chiudi il modal dopo l'eliminazione
      } else {
        console.error("Errore durante l'eliminazione dell'immagine:", response.statusText);
        alert("Errore durante l'eliminazione dell'immagine.");
      }
    } catch (error) {
      console.error('Errore durante l\'eliminazione dell\'immagine:', error);
    }
  };

  if (loading) {
    return <div>Caricamento in corso...</div>;
  }

  return (
    <>
      <NavigationBar
        isAuthenticated={true} // Passa true se l'utente è autenticato
        setIsAuthenticated={() => {}}
        aggiornaDatiProfilo={aggiornaDatiProfilo} // Passa la funzione di aggiornamento
      />
      <Container className="mt-5 profile-page">
        {/* Immagine di copertina */}
        <Row className="justify-content-md-center mb-4 position-relative">
          <Col>
            <Image src={fotografo.copertina} fluid className="cover-image" />
            <div className="profile-pic-wrapper">
              <Image src={fotografo.immagineProfilo} roundedCircle fluid className="profile-pic" />
            </div>
          </Col>
        </Row>

        {/* Dettagli del fotografo */}
        <Row className="justify-content-md-center mb-4">
          <Col md={8} className="text-center">
            <h2>{fotografo.nome}</h2>
            <p>Email: {fotografo.email}</p>
          </Col>
        </Row>

        {/* Galleria delle immagini */}
        <h3>Le mie immagini</h3>
        <Row>
          {immagini.length > 0 ? (
            immagini.map((immagine) => (
              <Col md={4} className="mb-4" key={immagine.id}>
                <Card style={{ cursor: 'pointer' }}>
                  <Card.Img variant="top" src={immagine.url} className="card-img-top" onClick={() => handleImageClick(immagine)} />
                  <Card.Body>
                    <Card.Text>{immagine.descrizione}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>Non hai ancora caricato immagini.</p>
          )}
        </Row>

        {/* Modale per l'immagine ingrandita */}
        <Modal show={showModal} onHide={handleCloseModal} centered size="lg" className="custom-modal">
  <Modal.Header closeButton style={{ backgroundColor: "#f8f9fa", borderBottom: "1px solid #ddd" }}>
    <Modal.Title>Dettagli Immagine</Modal.Title>
  </Modal.Header>
  <Modal.Body className="d-flex flex-column align-items-center">
    {selectedImage && (
      <>
        <Image src={selectedImage.url} fluid className="mb-3 rounded shadow" style={{ maxHeight: '70vh', width: 'auto' }} />
        <div className="mt-3 text-center" style={{ width: "100%" }}>
          <p className="text-muted mb-1"><strong>Descrizione:</strong></p>
          <p className="text-secondary">{selectedImage.descrizione}</p>
          <p className="text-muted mb-1"><strong>Categoria:</strong></p>
          <p className="text-secondary">{selectedImage.categoria}</p>
        </div>
      </>
    )}
  </Modal.Body>
  <Modal.Footer style={{ backgroundColor: "#f8f9fa", borderTop: "1px solid #ddd" }}>
    <Button variant="outline-secondary" onClick={handleCloseModal} className="me-2">
      Chiudi
    </Button>
    {selectedImage && (
      <Button variant="outline-danger" onClick={() => handleDeleteImage(selectedImage.id)}>
        Elimina Immagine
      </Button>
    )}
  </Modal.Footer>
</Modal>

      </Container>
    </>
  );
};

export default ProfilePage;
