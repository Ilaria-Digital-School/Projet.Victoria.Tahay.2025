import React, { useState } from "react";
import { Link } from "react-router-dom";
import "@/styles/services.css";
import { Helmet } from "react-helmet-async";

// Import images manually
import jacuzziImg from "../../assets/servicesimg/spa/jacuzzi.webp";
import hammamImg from "../../assets/servicesimg/spa/hammam.webp";
import saunaImg from "../../assets/servicesimg/spa/sauna.webp";
import piscineImg from "../../assets/servicesimg/spa/piscine.webp";
import doucheImg from "../../assets/servicesimg/spa/douche.webp";

const Spa = () => {
  // Image list for the slideshow
  const images = [jacuzziImg, hammamImg, saunaImg, piscineImg, doucheImg];
  const [currentImage, setCurrentImage] = useState(0);

  // Function to move to the next image
  const nextImage = () => {
    setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to move to the previous image
  const prevImage = () => {
    setCurrentImage((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <>
      <Helmet>
          <title>Le spa - L'Opale Blanche</title>
          <meta
          name="description"
          content="Découvrez notre spa au cœur du chalet L'Opale Blanche : un espace convivial, rustique, et chaleureux."
          />
          <meta name="keywords" content="Spa, L'Opale Blanche" />
      </Helmet>

    <div className="service-container">
      {/* Container for slideshow and description */}
      <div className="service-content">
        {/* Slideshow Image Section */}
        <div className="service-image-spa">
          <button className="prev-btn" onClick={prevImage}>❮</button>
          <img src={images[currentImage]} alt="Spa Facility" />
          <button className="next-btn" onClick={nextImage}>❯</button>
        </div>

        {/* Description Section */}
        <div className="service-description">
          <h1>Le Spa</h1>
          <p>
            Le <span>spa</span> du chalet, accessible uniquement <span>sur réservation</span>,
            vous propose un moment de <span>détente absolue</span> dans un cadre luxueux et chaleureux.
          </p>
          <p>
            Horaires d’ouverture : <span>Tous les jours</span>, de <span>9h à 20h</span>.
          </p>
          <p>Tarif : <span>45€/personne</span> pour un accès d'une heure.</p>

          <div className="service-buttons">
            <Link to="/reservation#spa" className="btn-reservation">Réserver</Link>
            <Link to="/#our-services" className="btn-retour">Retour</Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Spa;
