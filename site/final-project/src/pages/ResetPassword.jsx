import { useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from "react-helmet-async";

const ResetPassword = () => {
  // Extracts the token from URL parameters
  const [params] = useSearchParams();
  const token = params.get("token");

  // State variables for password input and feedback message
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Handles password reset form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Sends the new password along with the reset token to the API
    axios.post('https://victoria-tahay.com/opale-blanche-api/auth/resetPassword.php', { token, password })
      .then(res => setMessage(res.data.message))
      .catch(() => setMessage("Une erreur est survenue."));
  };

  return (
    <>
    <Helmet>
        <title>Réinitialisation du mot de passe - L'Opale Blanche</title>
        <meta
        name="description"
        content="L'Opale Blanche : un espace convivial, rustique, et chaleureux."
        />
        <meta name="keywords" content="Réinitialisation, mot de passe, L'Opale Blanche" />
    </Helmet>

    <div className="auth-container">
      {/* Title for the password reset page */}
      <h1>Nouveau mot de passe</h1>

      {/* Password Reset Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Réinitialiser</button>
      </form>

      {/* Displays success or error message */}
      {message && <p>{message}</p>}
    </div>
    </>
  );
};

export default ResetPassword;
