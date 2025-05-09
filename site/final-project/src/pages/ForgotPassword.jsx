import { useState } from 'react';
import axios from 'axios';
import { Helmet } from "react-helmet-async";

const ForgotPassword = () => {
  // State variables for email input and response message
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Handles form submission to request a password reset
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Tentative d'envoi du formulaire..."); 
  
    axios.post('https://victoria-tahay.com/opale-blanche-api/auth/forgotPassword.php', { email })
      .then(res => {
        console.log(res.data);
        setMessage(res.data.message + (res.data.resetLink ? ` : ${res.data.resetLink}` : ""));
      })
      
      .catch(err => {
        console.error("Erreur Axios :", err); // <== Ajout
        setMessage("Une erreur est survenue.");
      });
  };
  

  return (
    <>
    <Helmet>
        <title>Mot de passe oublié - L'Opale Blanche</title>
        <meta
        name="description"
        content="Mot de passe oublié, chalet L'Opale Blanche : un espace convivial, rustique, et chaleureux."
        />
      <meta name="keywords" content="Mot de passe oublié, L'Opale Blanche" />
    </Helmet>

    <div className="auth-container">
      <h1>Réinitialiser le mot de passe</h1>

      {/* Password reset form */}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Entrez votre email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Envoyer le lien</button>
      </form>

      {/* Displays response message */}
      {message && <p>{message}</p>}
    </div>
    </>
  );
};

export default ForgotPassword;
