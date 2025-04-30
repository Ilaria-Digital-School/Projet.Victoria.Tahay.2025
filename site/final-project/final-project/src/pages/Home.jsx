import { useEffect } from "react";
import { Link } from "react-router-dom"; 
import { useLocation } from "react-router-dom";
import "../styles/home.css"; 

// Importing service images
import restaurant from "../assets/img/restaurant.webp";
import spa from "../assets/img/spa.webp";
import massage from "../assets/img/massage.webp";
import salleDeSport from "../assets/img/salle-de-sport.webp";
import barJeux from "../assets/img/bar-jeux.webp";
import bibliotheque from "../assets/img/bibliotheque.webp";

// List of services with their images, text, and links
const services = [
    { src: restaurant, alt: "Restaurant", text: "Restaurant", link: "/services/Restaurant" },
    { src: spa, alt: "Spa", text: "Spa", link: "/services/Spa" },
    { src: massage, alt: "Massage", text: "Soins & Massages", link: "/services/Care" },
    { src: salleDeSport, alt: "Salle de Sport", text: "Salle de Sport", link: "/services/Gym" },
    { src: barJeux, alt: "Bar à Jeux", text: "Bar à Jeux", link: "/services/Bar" },
    { src: bibliotheque, alt: "Bibliothèque", text: "Bibliothèque", link: "/services/Library" }
];

const Home = () => {

    const location = useLocation();

    useEffect(() => {
        // Automatically scroll to a specific section if a hash (#) is in the URL
        if (location.hash) {
            const target = document.querySelector(location.hash);
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location]);

    // Function to smoothly scroll to the presentation section
    const scrollToPresentation = () => {
        const presentationSection = document.querySelector(".presentation");
        const targetPosition = presentationSection.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = performance.now();
        const duration = 600; 

        function animationScroll(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));

            if (timeElapsed < duration) {
                requestAnimationFrame(animationScroll);
            }
        }

        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        requestAnimationFrame(animationScroll);
    };

    // Function to smoothly scroll to the services section
    const scrollToServices = () => {
        const servicesSection = document.querySelector(".our-services");
        const targetPosition = servicesSection.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = performance.now();
        const duration = 600; 

        function animationScroll(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));

            if (timeElapsed < duration) {
                requestAnimationFrame(animationScroll);
            }
        }

        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        requestAnimationFrame(animationScroll);
    };


    return (
        <div className="home">
            {/* Chalet image with button */}
            <div className="home-hero">
                <div className="hero-image">
                </div>
                <button 
                    className="discover-button" 
                    onClick={scrollToPresentation}> 
                    Découvrir l'Opale Blanche
                </button>
            </div>

            {/* Presentation Section */}
            <section className="presentation">
                <h2>BIENVENUE À</h2>
                <h1>L'Opale Blanche</h1>
                <h3><em>Le chalet sérénité</em></h3>
                <p>
                Plongez dans une <strong>atmosphère apaisante</strong> où le <strong>luxe</strong> et la <strong>sérénité</strong> se rencontrent pour vous offrir une <strong>expérience inoubliable</strong>.<br /><br />
                🌿 <strong>Spa & espace détente</strong> – Sauna, hammam et jacuzzi pour une relaxation absolue.
                <br />💆 <strong>Soins & massages</strong> – Des prestations réalisées par des experts en bien-être.
                <br />🍽️ <strong>Restaurant</strong> – Une cuisine raffinée mettant en valeur les saveurs du terroir.
                <br /> ✨ <strong>Services exclusifs</strong> – Une expérience sur-mesure pour une journée inoubliable.<br />
                <br />L'Opale Blanche est une invitation à la détente et au ressourcement, <strong>un refuge où chaque détail est pensé pour votre confort et votre plaisir</strong>.
                </p>
                {/* Button to scroll to Services section */}
                <button className="services-button" onClick={scrollToServices}>
                    Nos Services
                </button>
            </section>

            {/* Services Section */}
            <section className="our-services" id="our-services">
                <h1>Nos Services</h1>
                <div className="services-gallery">
                    {services.map((service, index) => (
                            <Link key={index} to={service.link} className="item-site"> 
                            <img src={service.src} alt={service.alt} />
                            <div className="overlay">
                                <p>{service.text}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
