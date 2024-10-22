import React from 'react';


const Homepage = () => {
  return (
    <div className="homepage-container">
      <h2>Benvenuto su LensLobby</h2>
      <p>Esplora le foto caricate dai nostri fotografi freelance.</p>
      
      {/* Qui andrà la sezione per visualizzare le immagini */}
      <div className="image-gallery">
        {/* Placeholder per le immagini */}
        <p>Immagini degli utenti saranno visibili qui...</p>
      </div>
    </div>
  );
};

export default Homepage;
