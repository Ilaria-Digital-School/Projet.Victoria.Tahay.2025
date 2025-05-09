import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 
import "../styles/providerReservations.css";
import { Helmet } from "react-helmet-async";

const ProviderReservations = () => {
    // State variables
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date()); 
    const [selectedService, setSelectedService] = useState(null); 
    const [rowStates, setRowStates] = useState({}); 
    const navigate = useNavigate();

    // Fetch user role on component mount
    useEffect(() => {
        fetchUserRole();
    }, []);

    // Fetches reservations based on selected date and service
    const fetchReservations = useCallback(() => {
        if (!selectedService) return;
    
        const formattedDate = selectedDate.toISOString().split('T')[0];
    
        console.log("🔍 Envoi de la requête avec : date =", formattedDate, ", service =", selectedService);
    
        axios.get(`https://victoria-tahay.com/opale-blanche-api/providers/getReservationsProvider.php`, {
            params: {
                date: formattedDate, 
                service: selectedService
            },
            withCredentials: true
        })
        .then(res => {
            console.log("📥 Réponse de getReservationsProvider :", res.data);
            if (res.data.success) {
                setReservations(res.data.reservations);
                loadRowStates(res.data.reservations, formattedDate, selectedService); // 🔄 Charger les couleurs après récupération
            } else {
                console.error("❌ Erreur API :", res.data.error);
                setError(res.data.error || "Une erreur est survenue.");
            }
            setLoading(false);
        })
        .catch(error => {
            console.error("❌ Erreur lors de la récupération des réservations :", error);
            setError("Erreur de connexion avec le serveur.");
            setLoading(false);
        });
    }, [selectedDate, selectedService]);

    // Runs when user role is fetched
    useEffect(() => {
        if (userRole) {
            if (userRole === "provider_restaurant" || userRole === "provider_spa") {
                fetchReservations();
            } else {
                navigate("/profile"); 
            }
            setLoading(false); 
        }
    }, [userRole, navigate, fetchReservations]);

    // Runs when the selected service changes
    useEffect(() => {
        if (selectedService) {
            fetchReservations();
        }
    }, [selectedService, fetchReservations]);

    // Fetches the user role
    const fetchUserRole = async () => {
        try {
            const response = await axios.get("https://victoria-tahay.com/opale-blanche-api/auth/getUserRole.php", { withCredentials: true });
            if (response.data.success) {
                setUserRole(response.data.role);
                setLoading(false);
            } else {
                console.error("❌ Erreur API :", response.data.error);
                setError(response.data.error || "Erreur de connexion.");
                setLoading(false);
            }
        } catch (error) {
            console.error("❌ Erreur de connexion :", error);
            setError("Erreur de connexion avec le serveur.");
            setLoading(false);
        }
    };

    // Loads row states (for color coding)
    const loadRowStates = (reservations, date, service) => {
        const key = `rowStates_${date}_${service}`;
        const savedStates = localStorage.getItem(key);
        if (savedStates) {
            setRowStates(JSON.parse(savedStates));
        } else {
            const initialStates = {};
            reservations.forEach(res => {
                initialStates[res.id] = 0;
            });
            setRowStates(initialStates);
        }
    };

    // Handles service selection
    const handleServiceSelection = (service) => {
        setSelectedService(service);
    };

    // Handles row click (for status change)
    const handleRowClick = (id) => {
        setRowStates((prev) => {
            const newState = { ...prev };
            newState[id] = (newState[id] || 0) + 1;
            if (newState[id] > 2) newState[id] = 0;

            const formattedDate = selectedDate.toISOString().split('T')[0];
            const key = `rowStates_${formattedDate}_${selectedService}`;
            localStorage.setItem(key, JSON.stringify(newState));

            return newState;
        });
    };

    // Displays loading or error messages
    if (loading) return <p>Chargement...</p>;
    if (error) return <p style={{ color: "red" }}> Erreur : {error}</p>;

    return (
        <>
        <Helmet>
            <title>Gestionnaire, gestion des réservations - L'Opale Blanche</title>
            <meta
            name="description"
            content="Réservations du chalet L'Opale Blanche : un espace convivial, rustique, et chaleureux."
            />
            <meta name="keywords" content="reservations, gestionnaire, L'Opale Blanche" />
        </Helmet>

        <div className="container">
            <h2>📅 Réservations ({userRole === "provider_restaurant" ? "Restaurant" : "Spa / Soins"})</h2>

            {/* Date picker */}
            <div className="date-picker">
                <label><strong>Sélectionnez une date :</strong></label>
                <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} dateFormat="dd-MM-yyyy"/>
            </div>

            {/* Service selection buttons */}
            <div className="service-buttons">
                {userRole === "provider_restaurant" ? (
                    <>
                        <button onClick={() => handleServiceSelection("Petit-déjeuner")}>Petit-déjeuner</button>
                        <button onClick={() => handleServiceSelection("Déjeuner")}>Déjeuner</button>
                        <button onClick={() => handleServiceSelection("Dîner")}>Dîner</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => handleServiceSelection("Accès spa")}>Accès spa</button>
                        <button onClick={() => handleServiceSelection("Soins et massages")}>Soins et massages</button>
                    </>
                )}
            </div>

            {/* Reservations table */}
            {reservations.length > 0 ? (
                <table className="reservations-table">
                    <thead>
                        <tr>
                            <th>Heure</th>
                            <th>Client</th>
                            <th>Nombre de personnes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((res) => {
                            const rowClass = rowStates[res.id] === 1 ? "green" : rowStates[res.id] === 2 ? "red" : "";

                            return (
                                <tr 
                                    key={res.id}
                                    onClick={() => handleRowClick(res.id)}
                                    className={rowClass}
                                >
                                    <td>{res.time_slot}</td>
                                    <td>{res.client_name}</td> 
                                    <td>{res.people}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <p>Aucune réservation trouvée.</p>
            )}
        </div>
        </>
    );
};

export default ProviderReservations;
