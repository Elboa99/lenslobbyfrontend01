import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import './ProfilePage.css';

const ProfilePage = () => {
  const [fotografo, setFotografo] = useState({});
  const [immagini, setImmagini] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFotografoData = async () => {
      try {
        const token = localStorage.getItem('token'); // Ottieni il token JWT dal localStorage
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

    fetchFotografoData();
  }, []);

  if (loading) {
    return <div>Caricamento in corso...</div>;
  }

  return (
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
              <Card>
                <Card.Img variant="top" src={immagine.url} className="card-img-top" />
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
    </Container>
  );
};

export default ProfilePage;
