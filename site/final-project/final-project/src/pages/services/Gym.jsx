import React from "react";
import { Link } from "react-router-dom";
import gymImg from "@/assets/servicesimg/salledesport.webp";
import '@/styles/services.css';

const Gym = () => {
  return (
    <div className="service-container">
            
           {/* Container for image and description side-by-side */}
           <div className="service-content">

                {/* Image Section */}
                <div className="service-image">
                    <img src={gymImg} alt="Salle de sport" />
                </div>

                {/* Description Section */}
                <div className="service-description">
                    <h1>La Salle de Sport</h1>
                    <p>
                    La <strong>salle de sport</strong> du chalet, exclusivement accessible aux clients, est un espace chaleureux et bien équipé, parfait <strong>pour maintenir votre routine sportive ou profiter d’une séance de détente active</strong>. La salle bénéficie de grandes baies vitrées offrant une <strong>vue imprenable sur les montagnes</strong>, créant une ambiance apaisante et inspirante. La salle est accessible seulement pour les clients du spa.               
                    </p>
                    <p>
                    La salle propose une <strong>large gamme d’équipements</strong> : haltères, tapis de course, vélos d’appartement, machines de musculation, et un espace de stretching. La salle est ouverte <strong>tous les jours</strong>, de <strong>6h à 22h</strong>. De plus, chaque matin en semaine, un <strong>coach est présent pour guider et conseiller</strong> les clients, qu’ils souhaitent un <strong>entraînement personnalisé</strong> ou des conseils pour un programme adapté.                     
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

export default Gym;
