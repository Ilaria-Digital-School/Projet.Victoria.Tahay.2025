import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css';


const Login = () => {
  // States for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Submit handler for login form
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Sends login request to the API
    axios.post(
      'https://victoria-tahay.com/opale-blanche-api/login.php',
      { email, password }, 
      // Sends a JavaScript object, no need for JSON.stringify
      {
        headers: { "Content-Type": "application/json" },
        // Ensures session cookies are sent
        withCredentials: true
      }
    )
    .then(res => {
      console.log("Réponse API :", res.data);
      if (res.data.success) {
        // Retrieves user role from response
        const userRole = res.data.user.role; 

        // Stores user role and email in local storage
        localStorage.setItem('userRole', userRole);
        localStorage.setItem('userEmail', email);

        // Dispatches a storage event to update user state globally
        window.dispatchEvent(new Event("storage"));

        // Redirects user based on role
        if (userRole === "provider_restaurant" || userRole === "provider_spa") {
          navigate('/ProviderReservations');
        } else {
          navigate('/Profile'); 
        }
      } else {
        alert('Mail ou mot de passe invalide.');
      }
    })
    .catch(() => alert('Mail ou mot de passe invalide.'));
  };

  return (
    <div className="auth-container">
      {/* Login title */}
      <h1>Connexion</h1>

      {/* Login form */}
      <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Mot de passe" required onChange={(e) => setPassword(e.target.value)} />
          
          {/* Submit button */}
          <button type="submit">Se Connecter</button>

          {/* Additional Links for users */}
          <div className="auth-links">
            <Link to="/ForgotPassword">Mot de passe oublié ?</Link>
              <p>
                Pas encore inscrit ? <Link to="/Signup">Créer un compte</Link>
              </p>
          </div>
      </form>
    </div>
  );
};

export default Login;
