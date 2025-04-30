import React from "react";
import { Link } from "react-router-dom";
import libraryImg from "@/assets/servicesimg/bibliotheque.webp";
import '@/styles/services.css';


const Library = () => {
  return (
    <div className="service-container">
            
           {/* Container for image and description side-by-side */}
           <div className="service-content">

                {/* Image Section */}
                <div className="service-image">
                    <img src={libraryImg} alt="Bibliothèque avec des livres" />
                </div>

                {/* Description Section */}
                <div className="service-description">
                    <h1>La Bibliothèque</h1>
                    <p>
                        La <strong>bibliothèque</strong> du chalet, véritable havre de <strong>tranquilité</strong>, est un lieu pensé pour <strong>les amoureux des livres et les esprits curieux</strong>. Vous y trouverez une vaste collection de livres en tout genre : romans, guides de voyage, essais, biographies, et bien plus encore, soigneusement sélectionnés pour satisfaire toutes les envies littéraires.
                    </p>
                    <p>
                    La bibliothèque est également aménagée pour ceux qui souhaitent y <strong>travailler</strong>, avec un accès <strong>Wi-Fi gratuit</strong> et de nombreuses <strong>prises électriques</strong>, créant un espace paisible et connecté pour répondre aux besoins professionnels. <strong>L’accès est libre et sans réservation</strong>, ouvert tous les jours de <strong>6h à 22h</strong>, réservé exclusivement aux clients du chalet.                     </p>

                    {/* Navigation buttons */}
                    <div className="service-buttons">
                        <Link to="/#our-services" className="btn-retour">Retour</Link>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default Library;
