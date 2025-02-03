import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const RegisterPage = () => {
  const [nome, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('email', email);
    formData.append('password', password);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }
    if (coverImage) {
      formData.append('coverImage', coverImage);
    }

    try {
      const response = await fetch('http://localhost:3001/authorization/register', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage('Registrazione avvenuta con successo! Verrai reindirizzato al login.');
        setUsername('');
        setEmail('');
        setPassword('');
        setProfileImage(null);
        setCoverImage(null);
        
        // Attendi qualche secondo per mostrare il messaggio e poi reindirizza
        setTimeout(() => {
          setLoading(false);
          navigate('/login');
        }, 2000); // Ritardo di 2 secondi
      } else {
        console.error('Errore nella registrazione:', response.statusText);
        alert('Errore durante la registrazione. Riprova.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Errore nella registrazione:', error);
      alert('Si è verificato un errore. Riprova.');
      setLoading(false);
    }
  };

  return (
    <Container className="register-container" style={{ paddingTop: '150px' }}>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Registrati</h2>
          {successMessage && (
            <Alert variant="success">
              {successMessage}
            </Alert>
          )}
          <Form onSubmit={handleRegister}>
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il tuo username"
                value={nome}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Inserisci la tua email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Inserisci la tua password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formProfileImage" className="mb-3">
              <Form.Label>Immagine del Profilo</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setProfileImage(e.target.files[0])}
              />
            </Form.Group>

            <Form.Group controlId="formCoverImage" className="mb-3">
              <Form.Label>Immagine di Copertina</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setCoverImage(e.target.files[0])}
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />{' '}
                  Registrazione in corso...
                </>
              ) : (
                'Registrati'
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
