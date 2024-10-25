import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button, Form, FormControl, InputGroup, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const NavigationBar = ({ isAuthenticated, setIsAuthenticated, aggiornaDatiProfilo }) => {
  const [showModal, setShowModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageDescription, setImageDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  // Fetch delle categorie disponibili dal backend (simulazione qui)
  useEffect(() => {
    setCategories(['RITRATTO', 'PAESAGGIO', 'NATURA']); // Questo dovrebbe essere aggiornato dinamicamente
  }, []);

  // Funzione per il logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  // Funzione per gestire il click sul pulsante "Submit an Image"
  const handleSubmitImageClick = () => {
    if (!isAuthenticated) {
      alert("Devi prima registrarti");
    } else {
      // Mostra il modale per il caricamento dell'immagine
      setShowModal(true);
    }
  };

  // Funzione per gestire il cambiamento dell'immagine
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmitImage = async () => {
    if (imageFile && selectedCategory) {
      const formData = new FormData();
      formData.append('fileImmagine', imageFile);
      formData.append('descrizione', imageDescription);
      formData.append('categoria', selectedCategory);
    
      const token = localStorage.getItem('token');
      if (!token) {
        alert("Devi essere autenticato per caricare un'immagine");
        return;
      }
  
      try {
        const response = await fetch('http://localhost:3001/immagini/createWithFile', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData
        });
  
        if (response.ok) {
          alert("Immagine caricata con successo.");
          setShowModal(false);
          
          // Chiama il callback per aggiornare i dati del profilo
          aggiornaDatiProfilo();

          // Resetta il form
          setImageFile(null);
          setImageDescription('');
          setSelectedCategory('');
        } else {
          console.error("Errore durante il caricamento dell'immagine:", response.statusText);
          alert("Errore durante il caricamento dell'immagine.");
        }
      } catch (error) {
        console.error('Errore nel caricamento dell\'immagine:', error);
      }
    } else {
      alert("Per favore, compila tutti i campi richiesti.");
    }
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="shadow-sm" fixed="top">
        <Container>
          {/* Logo */}
          <Navbar.Brand as={Link} to="/">
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
                <FormControl type="search" placeholder="Cerca Fotografo" />
              </InputGroup>
            </Form>

            {/* Link di navigazione a destra */}
            <Nav className="ml-auto">
              {isAuthenticated ? (
                <>
                  <Nav.Link as={Link} to="/profilo">Profilo</Nav.Link>
                  <Button variant="outline-dark" onClick={handleLogout} className="nav-Button">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/register">Registrati</Nav.Link>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                </>
              )}
              <Button onClick={handleSubmitImageClick} variant="outline-dark" className="nav-button">Submit an image</Button>
              <Nav.Link as={Link} to="/aboutus">About Us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modale per caricare l'immagine */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Carica un'Immagine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formImageFile" className="mb-3">
              <Form.Label>Seleziona un'immagine</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>
            <Form.Group controlId="formImageDescription" className="mb-3">
              <Form.Label>Descrizione</Form.Label>
              <Form.Control type="text" placeholder="Inserisci una descrizione" value={imageDescription} onChange={(e) => setImageDescription(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formImageCategory" className="mb-3">
              <Form.Label>Categoria</Form.Label>
              <Form.Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="" disabled>Seleziona una categoria</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={handleSubmitImage}>
            Carica Immagine
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavigationBar;
