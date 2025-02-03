import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import NavigationBar from './NavigationBar';
import './ProfilePage.css';
import BASE_URL from '../config';

const ProfilePage = () => {
  const [fotografo, setFotografo] = useState({});
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId'); 
  const isCurrentUser = userId && fotografo.id === parseInt(userId); 

  useEffect(() => {
    const fetchFotografoData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token mancante. Accedi nuovamente.');
          return;
        }

        const response = await fetch(`${BASE_URL}/fotografi/me`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setFotografo(data);
        } else {
          console.error('Errore nel recuperare i dati del fotografo:', response.statusText);
        }
      } catch (error) {
        console.error('Errore nel recuperare i dati del fotografo:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFotografoData();
  }, []);

  const handleImageUpload = async (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append(type === "profile" ? "profileImage" : "coverImage", file);

    const token = localStorage.getItem('token');
    if (!token) {
      alert("⚠️ Devi essere loggato per modificare l'immagine.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/fotografi/me/${type === "profile" ? "avatar" : "cover"}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (response.ok) {
        const updatedFotografo = await response.json();
        setFotografo(updatedFotografo);
      } else {
        throw new Error("Errore nell'upload dell'immagine.");
      }
    } catch (error) {
      console.error(`❌ Errore nell'upload ${type}:`, error);
      alert("Errore nel caricamento dell'immagine.");
    }
  };

  if (loading) return <div>Caricamento in corso...</div>;

  return (
    <>
      <NavigationBar isAuthenticated={true} />
      <Container className="mt-5 profile-page">
        {/* Copertina con modifica */}
        <Row className="justify-content-md-center mb-4 position-relative">
          <Col>
            <div className="cover-image-container">
              <Image src={fotografo.copertina} fluid className="cover-image" />
              
              {isCurrentUser && (
                <div className="image-overlay">
                  <input
                    type="file"
                    id="coverInput"
                    style={{ display: 'none' }}
                    onChange={(e) => handleImageUpload(e, "cover")}
                  />
                  <Button variant="light" className="edit-btn" onClick={() => document.getElementById('coverInput').click()}>
                    Cambia Copertina
                  </Button>
                </div>
              )}
            </div>

            {/* Foto profilo con modifica */}
            <div className="profile-pic-wrapper">
              <Image src={fotografo.immagineProfilo} roundedCircle fluid className="profile-pic" />
              
              {isCurrentUser && (
                <div className="image-overlay">
                  <input
                    type="file"
                    id="profileInput"
                    style={{ display: 'none' }}
                    onChange={(e) => handleImageUpload(e, "profile")}
                  />
                  <Button variant="light" className="edit-btn" onClick={() => document.getElementById('profileInput').click()}>
                    Cambia Foto
                  </Button>
                </div>
              )}
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
      </Container>
    </>
  );
};

export default ProfilePage;
