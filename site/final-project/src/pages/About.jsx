import React from "react";
import { useEffect } from "react";
import accueilImg from "../assets/img/accueil.webp";
import servicesImg from "../assets/img/services.webp";
import "@/styles/about.css" 
import { Helmet } from "react-helmet-async";

const About = () => {
    // useEffect(() => {
    //     console.log("Nouveau titre :", document.title);
    // }, []);
      
    return (
        <>
        <Helmet>
            <title>A propos - L'Opale Blanche</title>
            <meta
            name="description"
            content="L'histoire du chalet L'Opale Blanche : un espace convivial, rustique, et chaleureux."
            />
            <meta name="keywords" content="A propos, histoire, L'Opale Blanche"/>
        </Helmet>

        <div className="about-page">
             {/* --------------- History Section --------------- */}
            <div className="about">
                <div className="about-section1">
                    {/* Image representing the history of L'Opale Blanche */}
                    <img src={accueilImg} alt="Notre histoire" className="about-img" />
                    
                    {/* Text content about the history */}
                    <div className="about-content">
                        <h1>Notre Histoire</h1>
                        <p>L'Opale Blanche a vu le jour en 2024, née de la passion de deux amis, <strong>Jack Nelssen</strong> et <strong>Calvin Rhyle</strong>, pour les montagnes et le bien-être. Inspirés par la <strong>beauté naturelle des Alpes</strong> et désireux de créer un lieu où <strong>luxe</strong> et <strong>confort</strong> se mêlent à la sérénité alpine, les fondateurs ont imaginé un chalet unique, offrant une expérience <strong>haut de gamme</strong>.<br></br><br></br> Aujourd'hui, L'Opale Blanche est un véritable refuge pour les amateurs de sérénité et de plaisir, offrant un <strong>cadre idyllique</strong> pour se ressourcer.</p>
                    </div>
                </div>

                {/* --------------- Services Information Section --------------- */}
                <div className="about-section2">
                    {/* Text content about available services */}
                    <div className="about-content">
                    <h1>Nos Prestations</h1>
                    <p>Nous vous proposons une gamme complète de services pour agrémenter votre séjour. Sur réservation, profitez de notre <strong>spa privé</strong>, de <strong>soins personnalisés et de massages relaxants</strong>, ainsi que d'une expérience gastronomique raffinée dans notre <strong>restaurant</strong>.<br></br><br></br> Vous pourrez également profiter, en libre accès, de la <strong>salle de sport</strong> (Pour les clients du spa seulement),  de la <strong>bibliothèque</strong> ou encore du <strong>bar à jeux</strong>.</p>
                    </div>
                    {/* Image representing the services offered */}
                    <img src={servicesImg} alt="Nos prestations" className="about-img" />
                </div>
            </div>

            {/* --------------- Contact Information Section --------------- */}
            <div className="contact-section">
                <h1 className="contact-title">Nous joindre</h1>
                <div className="contact-details">
                    {/* Address details */}
                    <div className="address">
                        <h2>L'Opale Blanche</h2>
                        <p>123 Route des Sommets</p>
                        <p>74120 Megève</p>
                    </div>

                    {/* Contact information */}
                    <div className="contact-info">
                        <h2>Contact</h2>
                        <p>Téléphone : 06.06.06.06.06</p>
                        <p>Disponibilité : 7j/7</p>
                        <p>Horaires : 8h30 à 18h30</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default About;