import React, { useState } from "react";
import "../styles/contact.css";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  
    // State to store form data inputs
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      telephone: "",
      subject: "",
      message: "",
    });
  
    // State to store success confirmation message
    const [confirmation, setConfirmation] = useState("");
  
    // State to store error message
    const [error, setError] = useState("");
  
    // Handle input changes and update form data state
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Post form data to backend API using Axios
      axios.post("https://victoria-tahay.com/opale-blanche-api/contact.php", formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        setConfirmation(response.data.message);
        setFormData({ name: "", email: "", telephone: "", subject: "", message: "" });
        setError("");
      })
      .catch((err) => {
        setError("Erreur d'envoi, vérifiez les informations saisies.");
        setConfirmation("");
      });      
    };
  
  
    return (
      <>
      <Helmet>
        <title>Contact - L'Opale Blanche</title>
        <meta
        name="description"
        content="Contacter le chalet L'Opale Blanche : un espace convivial, rustique, et chaleureux."
        />
        <meta name="keywords" content="contact, L'Opale Blanche" />
      </Helmet>

      <div className="contact-page">
        <div className="informations-contact">
          
          {/* Contact information and heading */}
          <aside>
            <h1>Contactez-nous</h1>
            <p>
            N'hésitez pas à nous contacter via le formulaire ci-dessous. Nous nous engageons à vous répondre sous 48 heures. Pour une assistance plus immédiate, vous pouvez également nous joindre directement par téléphone au 06 06 06 06 06, <span>disponible 7j/7</span> de <span>8h30 à 18h30</span>. 
            </p>
          </aside>
  
          {/* Contact form */}
          <form className="formulaire-contact" onSubmit={handleSubmit}>

  
            {/* Input fields for form data */}
            <label htmlFor="name">Nom complet *</label><br></br>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
  
            <br></br><label htmlFor="email">Email *</label><br></br>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
  
            <br></br><label htmlFor="telephone">Téléphone</label><br></br>
            <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} />
  
            <br></br><label htmlFor="subject">Sujet *</label><br></br>
            <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />
  
            <br></br><label htmlFor="message">Votre message *</label><br></br>
            <textarea name="message" rows="6" value={formData.message} onChange={handleChange} required />
  
            <br></br><small>* champs requis</small>
  
            {/* Submit button */}
            <input type="submit" value="Envoyer" id="send-message"/>
          
            {/* Display confirmation or error messages */}
            {confirmation && <p className="confirmation-message">{confirmation}</p>}
            {error && <p className="error-message">{error}</p>}
          
          </form>
        </div>
      </div>
      </>
    );
};
  
export default Contact;