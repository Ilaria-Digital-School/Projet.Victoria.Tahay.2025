import { useEffect, useState } from "react";
import PropTypes from 'prop-types'; // Import de PropTypes
import axios from "axios";

// ServiceList component: displays a list of services dynamically based on category
const ServiceList = ({ category, onSelectService }) => {

  const [services, setServices] = useState([]);

  // Fetch services from API whenever the 'category' prop changes
  useEffect(() => {
    // Sends a request to fetch services based on the selected category
    axios.get(`https://victoria-tahay.com/opale-blanche-api/getServices.php?category=${category}`)
      .then(res => {
        console.log("Données reçues de l'API :", res.data); 
        // Checks if the response is successful and contains an array of services
        if (res.data.success && Array.isArray(res.data.services)) {
          setServices(res.data.services);
        } else {
          console.error("Erreur : La réponse API est invalide", res.data);
          // Resets services state in case of an invalid response
          setServices([]);
        }
      })
      .catch(err => {
        console.error("Erreur lors de la récupération des services :", err);
        // Handles errors by resetting the services state
        setServices([]);
      });
  }, [category]);
  

  
  return (
    <div className="service-list">
      {/* Display the selected category name */}
      <h2>{category}</h2>
      {/* Display additional text only for "Espace Spa Détente" */}
      {category && category.toLowerCase() === "spa" && (
        <p className="spa-info">
          Accès d'une heure au spa, limité à dix personnes.
        </p>
      )}
      
      {/* Display additional text only for "Soins et Massages" */}
      {category && category.toLowerCase() === "soins et massages" && (
        <p className="massage-info">
          Prestations d'une heure pour une à deux personnes, à 80€ par personne.
        </p>
      )}
      <ul>
        {/* Dynamically render each service item */}
        {services.map(service => (
          <li key={service.service_id} onClick={() => onSelectService(service)}>
            {service.name}
            {service.hasPrice && service.price ? ` - ${service.price}€` : ''} 
            {service.duration ? ` (${service.duration})` : ''} 
            {service.description ? ` - ${service.description}` : ''}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Validation of props with PropTypes
ServiceList.propTypes = {
  category: PropTypes.string.isRequired,
  onSelectService: PropTypes.func.isRequired
};

export default ServiceList;

