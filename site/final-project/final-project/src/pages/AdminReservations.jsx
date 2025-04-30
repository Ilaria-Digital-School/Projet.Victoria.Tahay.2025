import { useEffect, useState, useCallback } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 
import "../styles/adminReservations.css";

const AdminReservations = () => {
    
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date()); 
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    // Fetch reservations based on the selected date and category
    const fetchReservations = useCallback(() => {
        if (!selectedCategory) return;

        // Formats date to YYYY-MM-DD
        const formattedDate = selectedDate.toISOString().split('T')[0];

        console.log("🔍 Envoi de la requête avec : date =", formattedDate, ", catégorie =", selectedCategory);

        axios.get("https://victoria-tahay.com/opale-blanche-api/getAllReservations.php", {
            params: {
                date: formattedDate,
                category: selectedCategory
            },
            withCredentials: true
        })
        .then(res => {
            console.log("📥 Réponse API getAllReservations :", res.data);
            if (res.data.success) {
                setReservations(res.data.reservations);
            } else {
                console.error("❌ Erreur API :", res.data.error);
                setError(res.data.error || "Une erreur est survenue.");
            }
            setLoading(false);
        })
        .catch(error => {
            console.error("❌ Erreur de connexion avec le serveur :", error);
            setError("Erreur de connexion avec le serveur.");
            setLoading(false);
        });
    }, [selectedDate, selectedCategory]);

    // Fetch reservations when category changes
    useEffect(() => {
        fetchReservations();
    }, [selectedCategory, fetchReservations]);

    // Handles delete confirmation popup
    const handleDelete = (id) => {
        setConfirmDelete(id);
    };

    // Handles reservation deletion after confirmation
    const confirmDeleteAction = () => {
        if (!confirmDelete) return;
    
        console.log("🗑 Envoi de la requête de suppression avec l'ID :", confirmDelete); // 🔍 Vérification avant l'envoi
    
        axios.post("https://victoria-tahay.com/opale-blanche-api/adminDeleteReservation.php", 
            { id: confirmDelete }, 
            { headers: { "Content-Type": "application/json" } }, // 🔥 Ajout des headers pour JSON
            { withCredentials: true }
        )
        .then(res => {
            console.log("📥 Réponse API Suppression :", res.data);
            if (res.data.success) {
                alert("Réservation supprimée !");
                fetchReservations();
            } else {
                alert(res.data.error || "Erreur lors de la suppression.");
            }
        })
        .catch(error => {
            console.error("❌ Erreur lors de la suppression :", error);
            alert("Erreur de connexion avec le serveur.");
        });
    
        setConfirmDelete(null);
    };
    
    // Displays loading or error messages if applicable
    if (loading) return <p>Chargement...</p>;
    if (error) return <p style={{ color: "red" }}>❌ Erreur : {error}</p>;

    return (
        <div className="admin-container">
            <h2>📅 Gestion des Réservations</h2>

            {/* Date Picker for selecting reservation date */}
            <div className="date-picker">
                <label><strong>Sélectionnez une date :</strong></label>
                <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
            </div>

            {/* Buttons for selecting reservation category */}
            <div className="category-buttons">
                <button onClick={() => setSelectedCategory("Restaurant")}>Restaurant</button>
                <button onClick={() => setSelectedCategory("Spa")}>Spa</button>
            </div>

            {/* Delete confirmation popup */}
            {confirmDelete && (
                <div className="delete-confirm">
                    <p>⚠️ Voulez-vous vraiment supprimer cette réservation ?</p>
                    <button onClick={confirmDeleteAction} className="confirm-btn">Oui</button>
                    <button onClick={() => setConfirmDelete(null)} className="cancel-btn">Non</button>
                </div>
            )}

            {/* Reservations table */}
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
                            <tr key={res.id}>
                                <td>{res.time_slot}</td>
                                <td>{res.client_name}</td>
                                <td>{res.servicename}</td>
                                <td>{res.people}</td>
                                <td>
                                    <button className="delete-btn" onClick={() => handleDelete(res.id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Aucune réservation trouvée.</p>
            )}
        </div>
    );
};

export default AdminReservations;
