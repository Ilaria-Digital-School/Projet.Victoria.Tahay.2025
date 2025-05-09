import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import { Helmet } from "react-helmet-async";

const Signup = () => {
  // State for handling form input data
  const [formData, setFormData] = useState({
    nameuser: '', firstname: '', birthday: '', phone: '', adress: '',
    zipcode: '', city: '', email: '', password: '', confirmPassword: '',
    cgu: false, newsletter: false
  });

  // State for CGU pop-up visibility
  const [showCGUPopup, setShowCGUPopup] = useState(false); 
  // Hook for redirection
  const navigate = useNavigate(); 

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

     // Password confirmation validation
     if (formData.password !== formData.confirmPassword) {
      alert("❌ Les mots de passe ne correspondent pas !");
      return; 
    }

    console.log("📤 Données envoyées :", formData); 

    // Sends registration data to the backend
    axios.post('https://victoria-tahay.com/opale-blanche-api/auth/signup.php', formData)
    .then(res => {
      if (res.data.success) {
        alert('Inscription réussie !');
        localStorage.setItem('email', formData.email); 
        // Redirects user to profile page
        navigate('/Profile');
      } else {
        alert(res.data.message || 'Erreur lors de l’inscription.');
      }
    })
    .catch(() => alert('Erreur serveur. Veuillez réessayer.'));
  };

  return (
    <>
    <Helmet>
        <title>Inscription - L'Opale Blanche</title>
        <meta
        name="description"
        content="Inscription à L'Opale Blanche : un espace convivial, rustique, et chaleureux."
        />
        <meta name="keywords" content="Inscription, L'Opale Blanche" />
    </Helmet>

    <div className="auth-container">
      {/* Signup title */}
      <h1>S'inscrire</h1>

      {/* Signup form */}
      <form onSubmit={handleSubmit}>
        <input type="text" name="nameuser" placeholder="Nom" required onChange={handleChange} />
        <input type="text" name="firstname" placeholder="Prénom" required onChange={handleChange} />
        <input type="date" name="birthday" required onChange={handleChange} />
        <input type="tel" name="phone" placeholder="Téléphone" onChange={handleChange} />
        <input type="text" name="adress" placeholder="Addresse" required onChange={handleChange} />
        <input type="text" name="zipcode" placeholder="Code Postal" required onChange={handleChange} />
        <input type="text" name="city" placeholder="Ville" required onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Mot de Passe" required onChange={handleChange} />
        <input type="password" name="confirmPassword" placeholder="Confirmer le Mot de Passe" required onChange={handleChange} />
            
        {/* CGU agreement checkbox */}
        <label className="checkbox-label">
          <input type="checkbox" name="cgu" required onChange={handleChange} />
          <span>
            Accepter les <span className="cgu-link" onClick={() => setShowCGUPopup(true)}>termes et conditions</span>
          </span>
        </label>

        {/* Newsletter subscription checkbox */}
        <label className="checkbox-label">
          <input type="checkbox" name="newsletter" onChange={handleChange} />
          <span>S'abonner à la newsletter</span>
        </label>

        {/* Submit button */}
        <button type="submit">S'inscrire</button>

        {/* Additional links for users */}
        <div className="auth-links">
          <p>
            Déjà inscrit ? <Link to="/Login">Se connecter</Link>
          </p>
        </div>
      </form>

      {/* CGU pop-up */}
      {showCGUPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>📜 Termes et Conditions</h2>
            <p>Bienvenue sur notre site. Avant d'utiliser nos services, veuillez lire attentivement ces conditions :</p>
            <ul>
              <li>🛡️ Vous acceptez de fournir des informations exactes et complètes.</li>
              <li>🔐 Vos données personnelles seront protégées selon notre politique de confidentialité.</li>
              <li>🚫 Toute tentative de fraude ou de violation des règles entraînera des sanctions.</li>
              <li>📅 Les réservations non honorées vous seront facturées, sauf cas exceptionnels.</li>
            </ul>
            <button onClick={() => setShowCGUPopup(false)} className="close-button">Fermer</button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Signup;

