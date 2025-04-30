import React from "react";
import { Link } from "react-router-dom";
import restaurantImg from "@/assets/servicesimg/restaurant.webp";
import '@/styles/services.css';


// Restaurant service page component
const Restaurant = () => {
    return (
        <div className="service-container">
            
           {/* Container for image and description side-by-side */}
           <div className="service-content">

                {/* Image Section */}
                <div className="service-image">
                    <img src={restaurantImg} alt="Restaurant Chalet" />
                </div>

                {/* Description Section */}
                <div className="service-description">
                    <h1>Le Restaurant</h1>
                    <p>
                        Le <strong>restaurant</strong> du chalet vous accueille dans un cadre élégant et chaleureux, mêlant bois et pierre pour une atmosphère montagnarde raffinée. Avec des <strong>spécialités savoyardes</strong> revisitées et des plats <strong>semi-gastronomiques</strong> à base de <strong>produits locaux</strong>, chaque repas est une véritable immersion dans les <strong>saveurs de la montagne</strong>.
                    </p>
                    <p>
                        Ouvert <strong>tous les jours</strong> de <strong>7h à 10h</strong> pour le petit-déjeuner et de <strong>12h à 15h</strong> puis de <strong>18h30 à 22h30</strong> pour les repas. <strong>Réservation recommandée</strong> pour garantir votre table et profiter pleinement de cette expérience culinaire unique.
                    </p>

                    {/* Navigation buttons */}
                    <div className="service-buttons">
                        <Link to="/reservation#restaurant" className="btn-reservation">Réserver</Link>
                        <Link to="/#our-services" className="btn-retour">Retour</Link>
                    </div>
                </div>
            </div>

            {/* Menu Section */}
            <section className="service-menu">
                <h1>Carte du Restaurant</h1>

                {/* Starters */}
                <div className="menu-category">
                    <h2>Entrées</h2>
                    <p>Velouté de potimarron aux éclats de châtaignes <span>12 €</span></p>
                    <p>Salade de chèvre chaud, miel de montagne et noix <span>14 €</span></p>
                    <p>Tartare de truite des Alpes <span>15 €</span></p>
                </div>

                {/* Main Courses */}
                <div className="menu-category">
                    <h2>Plats</h2>
                    <p>Tartiflette au reblochon fermier et au lard fumé <span>22 €</span></p>
                    <p>Filet de bœuf sauce aux morilles et gratin dauphinois <span>28 €</span></p>
                    <p>Truite de lac, beurre blanc et légumes de saison <span>24 €</span></p>
                    <p>Fondue savoyarde (seul ou à partager) <span>24 € / pers</span></p>
                </div>

                {/* Desserts */}
                <div className="menu-category">
                    <h2>Desserts</h2>
                    <p>Tarte aux myrtilles de montagne <span>9 €</span></p>
                    <p>Crème brûlée au génépi <span>8 €</span></p>
                    <p>Fondant au chocolat et glace à la vanille <span>10 €</span></p>
                </div>

                {/* Menus */}
                <div className="menu-category">
                    <h2>Menus</h2>
                    <p>Menu Découverte (Entrée + Plat + Dessert) <span>42 €</span></p>
                    <p>Menu Enfant (Nuggets maison avec pâtes ou frites maison, ou mini tartiflette + glace ou mousse au chocolat) <span>12 €</span></p>
                </div>


                {/* Drinks */}
                <h1>Carte des Boissons</h1>
                <div className="menu-category">
                    <h2>Champagne et Vins</h2>
                    <p>Champagne Laurent-Perrier Brut <span>Bouteille 120 €</span></p>
                    <p>Vin Rouge - Merlot (Pays d'Oc IGP) <span>Verre 7 € / Bouteille 26€</span></p>
                    <p>Vin Rouge - Côtes-du-Rhône <span>Verre 9 € / Bouteille 30€</span></p>
                    <p>Vin Rouge - Cahors <span>Verre 9 € / Bouteille 30€</span></p>
                    <p>Vin Rouge - Pinot Noir (Alsace) <span>Verre 11 € / Bouteille 32€</span></p>
                    <p>Vin Rouge - Château Margaux (Bordeaux) <span>Verre 25 € / Bouteille 180€</span></p>
                    <p>Vin Blanc - Sauvignon Blanc (Touraine) <span>Verre 7 € / Bouteille 25€</span></p>
                    <p>Vin Blanc - Chardonnay (Bourgogne) <span>Verre 11 € / Bouteille 30€</span></p>
                    <p>Vin Blanc - Puligny-Montrachet (Bourgogne) <span>Verre 20 € / Bouteille 140€</span></p>
                </div>

                <div className="menu-category">
                    <h2>Alcools</h2>
                    <p>Whisky Single Malt Glenfiddich 18 ans <span>15 €</span></p>
                    <p>Gin Hendrick's  <span>12 €</span></p>
                    <p>Liqueur de Génépi artisanale  <span>8 €</span></p>
                    <p>Ricard  <span>8 €</span></p>
                    <p>Whisky Jameson (Irlande)  <span>9 €</span></p>
                    <p>Gin Bombay Sapphire <span>8 €</span></p>
                    <p>Rhum Diplomatico Reserva <span>12 €</span></p>
                    <p>Cognac VSOP Hennessy <span>15 €</span></p>
                </div>

                <div className="menu-category">
                    <h2>Soda et Jus</h2>
                    <p>La Mortuacienne – Limonade Artisanale <span>4 €</span></p>
                    <p>Elixia – Cola Bio <span>5 €</span></p>
                    <p>Fleur de Sureau Artisanale <span>5 €</span></p>
                    <p>Thé glacé maison à la framboise <span>5 €</span></p>
                    <p>Jus de Pomme des Alpes <span>6 €</span></p>
                    <p>Nectar d’Abricot de Provence <span>6 €</span></p>
                    <p>Jus d'orange maison <span>7 €</span></p>
                </div>

                <div className="menu-category">
                    <h2>Boissons Chaudes</h2>
                    <p>Café expresso ou allongé <span>4 €</span></p>
                    <p>Thé et infusions <span>6 €</span></p>
                    <p>Cappuccino <span>6 €</span></p>
                    <p>Chocolat chaud maison <span>7 €</span></p>
                </div>
            </section>
        </div>
    );
};

export default Restaurant;