import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, Form, FormControl, InputGroup, ListGroup, Modal, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/Black_and_White_Photography_Camera_Photo_Studio_Logo_1.png';
import './NavigationBar.css'; 
import BASE_URL from '../config';

const NavigationBar = ({ isAuthenticated, checkAuth, aggiornaDatiProfilo }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageDescription, setImageDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState(['RITRATTO', 'PAESAGGIO', 'NATURA', 'MOTORI', 'ABSTRACT']);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    checkAuth();
    navigate('/');
  };

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      setShowDropdown(false);
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/fotografi/search?nome=${value}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
        setShowDropdown(data.length > 0);
      } else {
        console.error("Errore nella ricerca:", response.statusText);
      }
    } catch (error) {
      console.error("Errore nella ricerca:", error);
    }
  };

  const handleSelectPhotographer = (id) => {
    setSearchTerm('');
    setShowDropdown(false);
    navigate(`/fotografo/${id}`);
  };

  const handleSubmitImage = async () => {
    if (imageFile && selectedCategory) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('fileImmagine', imageFile);
      formData.append('descrizione', imageDescription);
      formData.append('categoria', selectedCategory);
  
      const token = localStorage.getItem('token');
      if (!token) {
        alert("Devi essere autenticato per caricare un'immagine");
        setIsLoading(false);
        return;
      }
  
      try {
        const response = await fetch(`${BASE_URL}/immagini/createWithFile`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData,
        });
  
        if (response.ok) {
          alert("Immagine caricata con successo.");
          setShowModal(false);
          aggiornaDatiProfilo();
          setImageFile(null);
          setImageDescription('');
          setSelectedCategory('');
        } else {
          console.error("Errore durante il caricamento:", response.statusText);
          alert("Errore durante il caricamento dell'immagine.");
        }
      } catch (error) {
        console.error("Errore nel caricamento:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Compila tutti i campi richiesti.");
    }
  };
  

  return (
    <>
      <Navbar bg="light" expand="lg" className="shadow-sm" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src={logo} alt="LensLobby" style={{ width: '100px' }} />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Form className="d-flex mx-auto position-relative" style={{ maxWidth: '500px' }}>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-search"></i>
                </InputGroup.Text>
                <FormControl
                  type="search"
                  placeholder="Cerca Fotografo"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={() => setShowDropdown(searchResults.length > 0)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                />
              </InputGroup>

              {showDropdown && (
                <ListGroup className="search-dropdown">
                  {searchResults.map((fotografo) => (
                    <ListGroup.Item key={fotografo.id} action onMouseDown={() => handleSelectPhotographer(fotografo.id)}>
                      <img src={fotografo.immagineProfilo} alt="Profile" className="dropdown-search-img" />
                      {fotografo.nome}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Form>

            <Nav className="ml-auto">
              {isAuthenticated ? (
                <>
                  <Nav.Link as={Link} to="/profilo">Profilo</Nav.Link>
                  <Button variant="outline-dark" onClick={handleLogout} className="nav-Button">Logout</Button>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/register">Registrati</Nav.Link>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                </>
              )}
              <Button onClick={() => setShowModal(true)} variant="outline-dark" className="nav-button">Submit an image</Button>
              <Nav.Link as={Link} to="/aboutus">About Us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Carica un'Immagine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formImageFile" className="mb-3">
              <Form.Label>Seleziona un'immagine</Form.Label>
              <Form.Control type="file" onChange={(e) => setImageFile(e.target.files[0])} />
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
          <Button variant="secondary" onClick={() => setShowModal(false)}>Chiudi</Button>
          <Button variant="primary" onClick={handleSubmitImage} disabled={isLoading}>
            {isLoading ? <Spinner as="span" animation="border" size="sm" /> : "Carica Immagine"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavigationBar;
