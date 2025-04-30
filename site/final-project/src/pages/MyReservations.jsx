import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/myReservations.css";

const MyReservations = () => {
    // State variables for reservations, services, and popups
    const [reservations, setReservations] = useState([]);
    const [services, setServices] = useState([]); 
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const navigate = useNavigate();

    // Fetch reservations when the component mounts
    useEffect(() => {
        fetchReservations();
    }, []);

    // Retrieves reservations for the logged-in user
    const fetchReservations = () => {
        axios.get("https://victoria-tahay.com/opale-blanche-api/getReservations.php", { withCredentials: true })
            .then(res => {
                if (res.data.success) {
                    setReservations(res.data.reservations);
                }
            })
            .catch(() => {
                console.error("Erreur de connexion avec le serveur.");
            });
    };

    // Opens delete confirmation popup
    const confirmDelete = (reservation) => {
        setSelectedReservation(reservation);
        setShowPopup(true);
    };

    // Handles reservation deletion
    const handleDelete = async () => {
        if (!selectedReservation) return;
    
        try {
            const formData = new FormData();
            formData.append("id", selectedReservation.id);
    
            const response = await axios.post(
                "https://victoria-tahay.com/opale-blanche-api/deleteReservation.php",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
    
            if (response.data.success) {
                setReservations(prevReservations =>
                    prevReservations.filter(res => res.id !== selectedReservation.id)
                );
                setShowPopup(false);
                setSelectedReservation(null);
            } else {
                alert("Erreur : " + response.data.error);
            }
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
            alert("Erreur de connexion avec le serveur.");
        }
    };

    // Opens edit reservation popup
    const openEditPopup = async (reservation) => {
        setSelectedReservation(reservation);
        setShowEditPopup(true);

        try {
            const response = await axios.get("https://victoria-tahay.com/opale-blanche-api/getServices.php");
            if (response.data.success) {
                const filteredServices = response.data.services.filter(service => service.category === reservation.category);
                setServices(filteredServices);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des services :", error);
        }
    };

    // Updates the selected reservation with a new service
    const updateReservation = async (newServiceId, newServiceName) => {
        if (!selectedReservation) return;
    
        try {
            const formData = new FormData();
            formData.append("reservation_id", selectedReservation.id);
            formData.append("new_service_id", newServiceId);
    
            const response = await axios.post(
                "https://victoria-tahay.com/opale-blanche-api/updateReservation.php",
                formData,
                { withCredentials: true }
            );
    
            console.log("📥 Réponse API :", response.data);
    
            if (response.data.success) {
                // Updates user interface immediately
                setReservations(prev =>
                    prev.map(res =>
                        res.id === selectedReservation.id
                            ? { 
                                ...res, 
                                service_id: newServiceId, 
                                servicename: response.data.updated_servicename || newServiceName
                            }
                            : res
                    )
                );
    
                console.log("✅ Mise à jour réussie !");
                setShowEditPopup(false);
                setSelectedReservation(null);
    
                // Refresh reservations to ensure database update
                fetchReservations();
            } else {
                alert("Erreur API : " + response.data.error);
            }
        } catch (error) {
            console.error("❌ Erreur lors de la mise à jour :", error);
        }
    };
    
    //  If no reservations are found, display a message
    if (!reservations.length) return <p>Aucune réservation trouvée...</p>;

    return (
        <div className="container">
            <h2>📅 Mes Réservations</h2>
            <div className="reservation-container">
                {reservations.map((res) => (
                    <div 
                        key={res.id} 
                        className="reservation-card"
                    >
                        {/* Text content for the reservation */}
                        <div className="reservation-content">
                            <h4>{res.servicename} ({res.category})</h4>
                            <p><strong>Date :</strong> {res.date_resa}</p>
                            <p><strong>Heure :</strong> {res.time_slot}</p>
                            <p><strong>Personnes :</strong> {res.people}</p>

                            {res.category !== "Restaurant" && (
                                <p><strong>Prix à payer :</strong> {res.total_price ? `${res.total_price.toFixed(2)}€` : "N/A"}</p>
                            )}
                        </div>

                        {/* Buttons for modifying or deleting reservation */}
                        <div className="reservation-actions">
                            {res.category === "Soins et massages" && (
                                <button onClick={() => openEditPopup(res)} className="edit-button">
                                    Modifier le soin
                                </button>
                            )}
                            <button onClick={() => confirmDelete(res)} className="delete-button">
                                Supprimer
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Back button to profile */}
            <div className="back-button-container">
                <button onClick={() => navigate("/Profile")} className="back-button">
                    ⬅  Retour au profil
                </button>
            </div>

            {/* Delete Confirmation Popup */}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <h2>⚠️ Confirmation</h2>
                        <p>Voulez-vous vraiment supprimer cette réservation ?</p>
                        <div className="popup-actions">
                            <button onClick={handleDelete} className="confirm-button">Oui, supprimer</button>
                            <button onClick={() => setShowPopup(false)} className="cancel-button">Annuler</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Reservation Popup */}
            {showEditPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <h2>Sélectionnez un nouveau soin</h2>
                        <ul>
                            {services.map(service => (
                                <li key={service.service_id}>
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        console.log("🟢 Clic sur :", service.name);
                                        updateReservation(service.service_id, service.name);
                                    }}>
                                        {service.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyReservations;
