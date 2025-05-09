import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 
import "../styles/adminReservations.css";
import { Helmet } from "react-helmet-async";

const AdminReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    const fetchUserRole = useCallback(async () => {
        try {
            const response = await axios.get("https://victoria-tahay.com/opale-blanche-api/auth/getUserRole.php", {
                withCredentials: true
            });

            if (response.data.success) {
                const role = response.data.role;
                setUserRole(role);

                if (role !== "admin") {
                    navigate("/profile");
                }
            } else {
                setError("Accès non autorisé.");
                navigate("/login");
            }
        } catch (error) {
            console.error("Erreur lors de la récupération du rôle :", error);
            setError("Erreur de connexion.");
            navigate("/login");
        }        
    }, [navigate]);

    const fetchReservations = useCallback(() => {
        if (!selectedCategory) return;

        const formattedDate = selectedDate.toISOString().split("T")[0];
        setLoading(true);

        axios.get("https://victoria-tahay.com/opale-blanche-api/admin/getAllReservations.php", {
            params: {
                date: formattedDate,
                category: selectedCategory
            },
            withCredentials: true
        })
        .then(res => {
            if (res.data.success) {
                setReservations(res.data.reservations);
            } else {
                setError(res.data.error || "Une erreur est survenue.");
            }
            setLoading(false);
        })
        .catch(() => {
            setError("Erreur de connexion avec le serveur.");
            setLoading(false);
        });
    }, [selectedDate, selectedCategory]);

    useEffect(() => {
        fetchUserRole();
    }, [fetchUserRole]);

    useEffect(() => {
        fetchReservations();
    }, [selectedCategory, fetchReservations]);

    const handleDelete = (id) => {
        console.log("🧨 Bouton 'Annuler' cliqué pour ID :", id);
        setConfirmDelete(id);
    };

    const confirmDeleteAction = () => {
        if (!confirmDelete) return;

        axios.post("https://victoria-tahay.com/opale-blanche-api/admin/adminDeleteReservation.php",
            { id: confirmDelete },
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            }
        )
        .then(res => {
            if (res.data.success) {
                alert("Réservation supprimée !");
                fetchReservations();
            } else {
                alert(res.data.error || "Erreur lors de la suppression.");
            }
        })
        .catch(() => {
            alert("Erreur de connexion avec le serveur.");
        });

        setConfirmDelete(null);
    };

    if (loading) return <p>Chargement...</p>;
    if (error) return <p style={{ color: "red" }}>❌ Erreur : {error}</p>;
    if (userRole && userRole !== "admin") return null;

    return (
        <>
        <Helmet>
            <title>Administrateur, gestion des réservations - L'Opale Blanche</title>
            <meta name="description" content="Les réservations du chalet L'Opale Blanche : un espace convivial, rustique, et chaleureux." />
            <meta name="keywords" content="reservations, administrateur, L'Opale Blanche" />
        </Helmet>

        <div className="admin-container">
            <h2>📅 Gestion des Réservations</h2>

            <div className="date-picker">
                <label><strong>Sélectionnez une date :</strong></label>
                <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} dateFormat="dd-MM-yyyy" />
            </div>

            <div className="category-buttons">
                <button onClick={() => setSelectedCategory("Restaurant")}>Restaurant</button>
                <button onClick={() => setSelectedCategory("Spa")}>Spa</button>
            </div>

            {confirmDelete && (
                <div className="popup-overlay">
                    <div className="popup">
                        <h2>⚠️ Annuler cette réservation ?</h2>
                        <p>Cette action est irréversible.</p>
                        <div className="popup-actions">
                            <button className="confirm-button" onClick={confirmDeleteAction}>Oui</button>
                            <button className="cancel-button" onClick={() => setConfirmDelete(null)}>Non</button>
                        </div>
                    </div>
                </div>
            )}

            {reservations.length > 0 ? (
                <table className="reservations-table">
                    <thead>
                        <tr>
                            <th>Heure</th>
                            <th>Client</th>
                            <th>Service</th>
                            <th>Personnes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map(res => (
                            <tr key={res.reservation_id}>
                                <td>{res.time_slot}</td>
                                <td>{res.client_name}</td>
                                <td>{res.servicename}</td>
                                <td>{res.people}</td>
                                <td>
                                    <button className="delete-btn" onClick={() => handleDelete(res.reservation_id)}>Annuler</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Aucune réservation trouvée.</p>
            )}
        </div>
        </>
    );
};

export default AdminReservations;
