import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [nome, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

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
        setUsername('');
        setEmail('');
        setPassword('');
        setProfileImage(null);
        setCoverImage(null);
        navigate('/login');
      } else {
        console.error('Errore nella registrazione:', response.statusText);
        alert('Errore durante la registrazione. Riprova.');
      }
    } catch (error) {
      console.error('Errore nella registrazione:', error);
      alert('Si è verificato un errore. Riprova.');
    }
  };

  return (
    <Container className="mt-5 pt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Registrati</h2>
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

            <Button variant="primary" type="submit">
              Registrati
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
