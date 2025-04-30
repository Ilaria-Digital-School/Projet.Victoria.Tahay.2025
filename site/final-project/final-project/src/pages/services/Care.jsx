import React from "react";
import { Link } from "react-router-dom";
import careImg from "@/assets/servicesimg/soins.webp";
import '@/styles/services.css';


// Restaurant service page component
const Care = () => {
    return (
        <div className="service-container">
            
           {/* Container for image and description side-by-side */}
           <div className="service-content">

                {/* Image Section */}
                <div className="service-image">
                    <img src={careImg} alt="Femme qui fait un soin du visage" />
                </div>

                {/* Description Section */}
                <div className="service-description">
                    <h1>Les Soins et Massages</h1>
                    <p>
                        L'<strong>espace soins et massages</strong> du chalet est un havre de détente où chaque soin est conçu pour procurer un <strong>profond bien-être</strong> et une <strong>relaxation complète</strong>. Accessible uniquement <strong>sur réservation</strong>, cet espace offre aux clients une expérience de soin personnalisée, dans une atmosphère paisible et raffinée, où chaque détail est pensé pour offrir un <strong>moment de sérénité absolue</strong>. 
                    </p>
                    <p>
                    Nos soins sont disponibles <strong>7 jours sur 7</strong>, de <strong>9h à 20h</strong>, permettant à chacun de trouver un moment parfait pour s’offrir une pause détente et revitalisante, seul ou en duo. Le choix de soins se divise en deux catégories : les <strong>soins du corps et du visage</strong> ainsi que les <strong>massages</strong>. 
                    </p>

                    {/* Navigation buttons */}
                    <div className="service-buttons">
                        <Link to="/reservation#care" className="btn-reservation">Réserver</Link>
                        <Link to="/#our-services" className="btn-retour">Retour</Link>
                    </div>
                </div>
            </div>

            {/* Menu Section */}
            <section className="service-menu">
                <h1>Nos prestations</h1>

                {/* Starters */}
                <div className="menu-category">
                    <h2>Soins du Corps et du Visage <span>(80€ - 60 min)</span></h2>
                    <p><span>Soin hydratant visage</span>Réhydrate et ravive l'éclat de la peau pour un teint lumineux et frais.</p>
                    <p><span>Soin purifiant visage</span>Élimine les impuretés et purifie en profondeur pour une peau nette et lisse.</p>
                    <p><span>Soin anti-âge visage</span>Raffermit et redonne de la vitalité à la peau pour un effet jeunesse.</p>
                    <p><span>Soin revitalisant corps</span>Régénère et nourrit la peau en profondeur pour un corps revigoré.</p>
                    <p><span>Gommage corps</span>Exfolie la peau en douceur pour un effet lisse et éclatant.</p>
                    <p><span>Enveloppement détoxifiant</span>Purifie et détend le corps en utilisant des ingrédients naturels.</p>
                </div>

                {/* Starters */}
                <div className="menu-category">
                    <h2>Massages  <span>(80€ - 60 min)</span> </h2>
                    <p><span>Massage relaxant</span>Soulage le stress et favorise une relaxation profonde.</p>
                    <p><span>Massage aux pierres chaudes</span>Apaisant grâce à la chaleur des pierres volcaniques, il détend les muscles.</p>
                    <p><span>Massage suédois</span>Dénoue les tensions musculaires avec un travail en profondeur.</p>
                    <p><span>Massage sportif</span>Idéal après une activité physique pour relâcher les muscles.</p>
                    <p><span>Massage aromathérapie</span>Utilise des huiles essentielles pour une relaxation sensorielle.</p>
                    <p><span>Massage aux pochons d’herbes</span>Enveloppe de plantes aromatiques pour un moment de détente unique.</p>
                </div>
            </section>
        </div>
    );
};

export default Care;