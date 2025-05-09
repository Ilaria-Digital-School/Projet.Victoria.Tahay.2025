import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/profile.css"; 
import { Helmet } from "react-helmet-async";

const EditReservation = () => {
  // Get the reservation ID from the URL parameters
  const { id } = useParams();
  const navigate = useNavigate();

  // State for storing the reservation details
  const [reservation, setReservation] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [people, setPeople] = useState(1);
  const [confirmation, setConfirmation] = useState("");

  // Fetch reservation details when the component loads
  useEffect(() => {
    axios.get(`https://victoria-tahay.com/opale-blanche-api/getReservation.php?id=${id}`)
      .then(res => {
        setReservation(res.data);
        setDate(res.data.date);
        setTime(res.data.time);
        setPeople(res.data.people);
      })
      .catch(err => console.error("Error fetching reservation:", err));
  }, [id]);

  // Handle reservation update
  const handleUpdate = (e) => {
    e.preventDefault();
    axios.post(`https://victoria-tahay.com/opale-blanche-api/users/updateReservation.php`, {
      id,
      date,
      time,
      people
    })
    .then(res => {
      setConfirmation(res.data.message);
      setTimeout(() => navigate("/mes-reservations"), 2000);
    })
    .catch(err => console.error("Error updating reservation:", err));
  };

  // If reservation data is not yet loaded, show a loading message
  if (!reservation) return <p>Loading reservation details...</p>;

  return (
    <>
    <Helmet>
      <title>Modifier une réservation - L'Opale Blanche</title>
      <meta
      name="description"
      content="Modifier une réservation du chalet L'Opale Blanche : un espace convivial, rustique, et chaleureux."
      />
      <meta name="keywords" content="reservation, L'Opale Blanche" />
    </Helmet>

    <div className="edit-reservation-container">
      <h1>Modifier ma réservation</h1>

      {/* Reservation edit form */}
      <form onSubmit={handleUpdate}>
        <label>Date :</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

        <label>Heure :</label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />

        <label>Nombre de personnes :</label>
        <input type="number" min="1" max="15" value={people} onChange={(e) => setPeople(e.target.value)} required />

        {/* Update and cancel buttons */}
        <button type="submit">Mettre à jour</button>
        <button type="button" className="cancel-btn" onClick={() => navigate("/mes-reservations")}>Annuler</button>
      </form>

      {/* Displays confirmation message */}
      {confirmation && <p className="confirmation">{confirmation}</p>}
    </div>
    </>
  );
};

export default EditReservation;
