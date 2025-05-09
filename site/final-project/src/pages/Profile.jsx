import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/profile.css';
import { Helmet } from "react-helmet-async";

const Profile = () => {
    // State variables for user information and role
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null); 
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ email: '', phone: '', adress: '', zipcode: '', city: '' });
    const navigate = useNavigate();

    // Fetches user details and role when component mounts
    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');

        // Redirects to login page if no email is stored
        if (!userEmail) {
            navigate('/login');
            return;
        }

        // Fetch user details
        axios.post('https://victoria-tahay.com/opale-blanche-api/auth/getUser.php', { email: userEmail })
        .then(res => {
            console.log("Réponse de l'API getUser.php :", res.data);
            if (res.data.success) {
                setUser(res.data.user);
                setFormData({ 
                    email: res.data.user.email, 
                    phone: res.data.user.phone, 
                    adress: res.data.user.adress,
                    zipcode: res.data.user.zipcode,
                    city: res.data.user.city
                });
            } else {
                alert('Erreur lors du chargement du profil.');
                navigate('/login');
            }
        });

        // Fetch user role from `getUserRole.php`
        axios.get('https://victoria-tahay.com/opale-blanche-api/auth/getUserRole.php', { withCredentials: true })
        .then(res => {
            console.log("Réponse de l'API getUserRole.php :", res.data);
            if (res.data.success) {
                setUserRole(res.data.role);
            }
        })
        .catch(error => console.error("❌ Erreur connexion getUserRole.php :", error));

    }, [navigate]);

    // Handles user logout
    const handleLogout = () => {
        axios.get('https://victoria-tahay.com/opale-blanche-api/auth/logout.php', { withCredentials: true })
        .then(() => {
            localStorage.removeItem('userEmail'); 
            localStorage.removeItem('userRole'); 
            window.dispatchEvent(new Event("storage"));
            navigate('/login'); 
        })
        .catch(error => console.error("Erreur lors de la déconnexion :", error));
    };

    // Updates form state on input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handles profile update request
    const handleUpdate = () => {
        axios.post('https://victoria-tahay.com/opale-blanche-api/users/updateProfile.php', { 
            email: user.email, 
            newEmail: formData.email, 
            phone: formData.phone, 
            adress: formData.adress,
            zipcode: formData.zipcode,
            city: formData.city 
        })
        .then(res => {
            if (res.data.success) {
                alert("Profil mis à jour !");
                // Refreshes user data after update
                axios.post('https://victoria-tahay.com/opale-blanche-api/auth/getUser.php', { email: formData.email })
                .then(response => {
                    if (response.data.success) {
                        setUser(response.data.user);
                        localStorage.setItem('userEmail', formData.email);
                    }
                })
                .catch(error => console.error("Erreur de rechargement du profil :", error));
                setIsEditing(false);
            } else {
                alert(res.data.message || "Erreur lors de la mise à jour.");
            }
        })
        .catch(error => {
            console.error("Erreur de mise à jour :", error);
            alert("Erreur serveur. Veuillez réessayer.");
        });
    };

    // Displays loading state if user data is not yet available
    if (!user) return <p>Chargement...</p>;

    return (
        <>
        <Helmet>
            <title>Profil - L'Opale Blanche</title>
            <meta
            name="description"
            content="Profil utilisateur de L'Opale Blanche : un espace convivial, rustique, et chaleureux."
            />
            <meta name="keywords" content="profil, L'Opale Blanche" />
        </Helmet>

        <div className="profile-container">
            {/* Admin & Service Provider Buttons */}
            {(userRole === "provider_spa" || userRole === "provider_restaurant" || userRole === "admin") && (
                <Link 
                    className="admin-provider-button" 
                    to={userRole === "admin" ? "/AdminReservations" : "/ProviderReservations"}
                >
                    Gérer les réservations
                </Link>
            )}

            <h1>Mon Profil</h1>
            
            {isEditing ? (
                // Profile editing form
                <div className="profile-edit">
                    <label>Email : <input type="email" name="email" value={formData.email} onChange={handleChange} /></label>
                    <label>Téléphone : <input type="tel" name="phone" value={formData.phone} onChange={handleChange} /></label>
                    <label>Adresse : <input type="text" name="adress" value={formData.adress} onChange={handleChange} /></label>
                    <label>Code Postal : <input type="text" name="zipcode" value={formData.zipcode} onChange={handleChange} /></label>
                    <label>Ville : <input type="text" name="city" value={formData.city} onChange={handleChange} /></label>
                    <button onClick={handleUpdate} className="save-button">Enregistrer</button>
                    <button onClick={() => setIsEditing(false)} className="cancel-button">Annuler</button>
                </div>
            ) : (
                // Profile details view
                <div className="profile-details">
                    <p><strong>Nom :</strong> {user.nameuser}</p>
                    <p><strong>Prénom :</strong> {user.firstname}</p>
                    <p><strong>Date de naissance :</strong> {user.birthday}</p>
                    <p><strong>Email :</strong> {user.email}</p>
                    <p><strong>Téléphone :</strong> {user.phone}</p>
                    <p><strong>Adresse :</strong> {user.adress}, {user.zipcode} {user.city}</p>
                    <button onClick={() => setIsEditing(true)} className="edit-button">Modifier mes informations</button>
                </div>
            )}

            {/* Link to user reservations */}
            <Link className="reservation-link" to="/MyReservations">Mes réservations</Link>

            {/* Logout Button */}
            <button onClick={handleLogout} className="logout-button">
                Déconnexion
            </button>
        
        </div>
        </>
    );
};

export default Profile;
