import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ServiceList from "../components/ServiceList";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "../styles/reservation.css";

const Reservation = () => {
  // State variables
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [date_resa, setDate] = useState(new Date());
  const [time_slot, setTimeSlot] = useState("");
  const [people, setPeople] = useState(1);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [confirmation, setConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const reservationFormRef = useRef(null);

  // Fetches user authentication status
  useEffect(() => {
    axios.get('https://victoria-tahay.com/opale-blanche-api/checkAuth.php', { withCredentials: true })
      .then(res => {
        if (res.data.authenticated) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      })
      .catch(err => console.error("Erreur d'authentification :", err));
  }, []);

  // Scrolls to reservation form when a service is selected
  useEffect(() => {
    if (selectedService && reservationFormRef.current) {
      reservationFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedService]);

  // Fetches available time slots based on selected service, date, and category
  useEffect(() => {
    if (selectedService && date_resa && selectedCategory) {
      const requestData = {
        service_id: selectedService.service_id,
        category: selectedCategory,
        date_resa: date_resa.toISOString().split('T')[0],
        people: people,
      };
  
      axios.post('https://victoria-tahay.com/opale-blanche-api/getSlots.php', requestData)
        .then(res => {
          // Updates slots directly from API response
          if (res.data.success && Array.isArray(res.data.slots)) {
            setAvailableSlots(res.data.slots); 
            setErrorMessage("");
          } else {
            setAvailableSlots([]);
            setErrorMessage(res.data.message || "Aucun créneau disponible.");
          }
        })
        .catch(err => {
          console.error("Erreur API getSlots.php :", err);
          setAvailableSlots([]);
          setErrorMessage("Erreur de connexion avec le serveur.");
        });
    }
  }, [selectedService, date_resa, selectedCategory, people]);
  
  // Handles reservation confirmation
  const handleReservation = () => {
    if (!selectedService || !selectedService.name) {
      setConfirmation("Veuillez sélectionner un service valide.");
      return;
    }

    if (!time_slot) {
      setConfirmation("Veuillez sélectionner un créneau horaire disponible.");
      return;
    }

    const localDate = new Date(date_resa.getTime() - date_resa.getTimezoneOffset() * 60000);
    const formattedDate = localDate.toISOString().split('T')[0];

    const requestData = {
      user_id: user?.id,
      service_id: selectedService?.service_id || null,
      category: selectedCategory,
      date_resa: formattedDate,
      time_slot,
      people,
    };

    axios.post('https://victoria-tahay.com/opale-blanche-api/createReservation.php', requestData, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
      if (res.data.success) {
        setConfirmation("✅ Réservation confirmée !");
        // Removes the selected time slot from the available list
        setAvailableSlots(prevSlots => prevSlots.filter(slot => slot.time_slot !== time_slot));
      } else {
        setConfirmation(" Erreur : " + (res.data.error || "La réservation n'a pas pu être effectuée."));
      }
    })
    .catch(err => {
      setConfirmation("Erreur de connexion avec le serveur.");
    });
  };

  return (
    <div className="reservation-page">
      <h1>Réservez votre service</h1>
      {!user ? (
        <p>Connectez-vous pour accéder aux services.</p>
      ) : (
        <>
          {/* Category selection buttons */}
          <div className="categories">
            <button onClick={() => setSelectedCategory('Restaurant')}>Restaurant</button>
            <button onClick={() => setSelectedCategory('Spa')}>Espace Spa Détente</button>
            <button onClick={() => setSelectedCategory('Soins et massages')}>Soins et Massages</button>
          </div>

          {/* Displays available services for the selected category */}
          {selectedCategory && <ServiceList category={selectedCategory} onSelectService={setSelectedService} />}

          {/* Reservation form */}
          {selectedService && (
            <div className="reservation-details" ref={reservationFormRef}>
              <h2>{selectedService.name}</h2>

              {/* Date selection */}
              <p>📅 Date</p>
              <div className="calendar-container">
                <Calendar onChange={setDate} value={date_resa} minDate={new Date()}/>
              </div>

              {/* Displays error message if no slots are available */}
              {errorMessage && <p className="error-message">{errorMessage}</p>}

              {/* Time slot selection */}
              <p>🕐 Horaires disponibles</p>
              <select value={time_slot} onChange={(e) => setTimeSlot(e.target.value)} required>
                <option value="">Sélectionner</option>
                {availableSlots.length > 0 ? (
                  availableSlots.map(slot => (
                    <option key={slot.time_slot} value={slot.time_slot}>{slot.time_slot}</option>
                  ))
                ) : (
                  <option disabled>Aucun créneau disponible</option>
                )}
              </select>

              {/* Number of people selection */}
              <p>👤 Nombre de personnes</p>
              <input
                type="number"
                min="1"
                max={selectedCategory === 'Restaurant' ? 16 : selectedCategory === 'Spa' ? 10 : 2}
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                required
              />

              {/* Displays total price if applicable */}
              {selectedService && selectedCategory !== "Restaurant" && selectedService.price && (
                <p>Prix total : {selectedService.price * people}€</p>
              )}
              <br /><br />
              {/* Confirm reservation button */}
              <button onClick={handleReservation}>Confirmer la réservation</button>
              {confirmation && <p className="confirmation">{confirmation}</p>}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Reservation;
