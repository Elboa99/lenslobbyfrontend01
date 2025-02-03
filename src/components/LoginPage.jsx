import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ checkAuth }) => { // ✅ Accettiamo checkAuth come prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:3001/authorization/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setErrorMessage(`⚠️ Errore nel login: ${errorText}`);
        setLoading(false);
        return;
      }

      const data = await response.json();
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('userId', data.userId);

      checkAuth(); // ✅ Aggiorna immediatamente lo stato di autenticazione
      navigate('/profilo'); // ✅ Vai subito al profilo
    } catch (error) {
      console.error('Errore nel login:', error);
      setErrorMessage('⚠️ Errore di connessione al server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="login-container" style={{ paddingTop: '150px' }}>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="auth-title">Login</h2>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={handleLogin}>
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

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />{' '}
                  Login in corso...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
