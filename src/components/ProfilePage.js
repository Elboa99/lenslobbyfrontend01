import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import './ProfilePage.css';

const ProfilePage = () => {
  const [fotografo, setFotografo] = useState({});
  const [immagini, setImmagini] = useState([]);

// fecth fittizia e di prova
  useEffect(() => {
    const fetchFotografoData = async () => {
      const fotografoData = {
        username: 'FotografoEsempio',
        email: 'fotografo@example.com',
        immagineProfilo: 'https://via.placeholder.com/150',
        copertina: 'https://via.placeholder.com/800x200',
      };

      const immaginiData = [
        { id: 1, url: 'https://via.placeholder.com/300', descrizione: 'Foto 1' },
        { id: 2, url: 'https://via.placeholder.com/300', descrizione: 'Foto 2' },
        { id: 3, url: 'https://via.placeholder.com/300', descrizione: 'Foto 3' },
      ];

      setFotografo(fotografoData);
      setImmagini(immaginiData);
    };

    fetchFotografoData();
  }, []);

  return (
    <Container className="mt-5 profile-page">
      {/* Immagine di copertina */}
      <Row className="justify-content-md-center mb-4 position-relative">
        <Col>
          <Image src={fotografo.copertina} fluid />
          <div className="profile-pic-wrapper">
            <Image src={fotografo.immagineProfilo} roundedCircle fluid className="profile-pic" />
          </div>
        </Col>
      </Row>

      {/* Dettagli del fotografo */}
      <Row className="justify-content-md-center mb-4">
        <Col md={8} className="text-center">
          <h2>{fotografo.username}</h2>
          <p>Email: {fotografo.email}</p>
        </Col>
      </Row>

      {/* Galleria delle immagini */}
      <h3>Le mie immagini</h3>
      <Row>
        {immagini.map((immagine) => (
          <Col md={4} className="mb-4" key={immagine.id}>
            <Card>
              <Card.Img variant="top" src={immagine.url} />
              <Card.Body>
                <Card.Text>{immagine.descrizione}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProfilePage;
