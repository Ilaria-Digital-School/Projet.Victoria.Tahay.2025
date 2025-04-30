import React from "react";
import { Link } from "react-router-dom";
import barImg from "@/assets/servicesimg/bibliotheque.webp";
import '@/styles/services.css';

const Bar = () => {
  return (
    <div className="service-container">
            
           {/* Container for image and description side-by-side */}
           <div className="service-content">

                {/* Image Section */}
                <div className="service-image">
                    <img src={barImg} alt="Bar à jeux" />
                </div>

                {/* Description Section */}
                <div className="service-description">
                    <h1>Le Bar à Jeux</h1>
                    <p>
                    Le <strong>bar à jeux</strong> du chalet est un lieu <strong>convivial et chaleureux</strong>, idéal pour se détendre et passer un bon moment <strong>entre amis ou en famille</strong>. Conçu avec des matériaux naturels, ce bar offre un décor rustique et un éclairage tamisé qui crée une <strong>atmosphère accueillante</strong>.</p>
                    <p>
                    Le bar dispose d’une <strong>vaste sélection de jeux</strong> : des classiques jeux de société aux cartes et jeux de plateau, ainsi qu’un espace dédié aux fléchettes et aux échecs. Les clients peuvent s’installer autour de tables confortables, siroter une boisson chaude ou un verre de vin, tout en profitant des plaisirs simples des jeux. Nos barmen vous accueillent <strong>toute la semaine</strong>, de <strong>14h à 02h</strong>. 
                    </p>
                    {/* Navigation buttons */}
                    <div className="service-buttons">
                        <Link to="/#our-services" className="btn-retour">Retour</Link>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default Bar;
