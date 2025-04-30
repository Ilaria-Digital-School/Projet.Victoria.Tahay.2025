<?php
session_start();
require 'config.php';

// Get the request parameters (date & category)
$date = $_GET['date'] ?? null;
$category = $_GET['category'] ?? null;

//  Validate that both parameters are provided
if (!$date || !$category) {
    echo json_encode(["success" => false, "error" => "Date ou catégorie manquante."]);
    exit;
}

// Fetch reservations based on date and category
$sql = "SELECT r.id, r.time_slot, u.nameuser AS client_name, s.name AS servicename, r.people
        FROM reservations r
        JOIN services s ON r.service_id = s.service_id
        JOIN users u ON r.user_id = u.id
        WHERE r.date_resa = ? AND s.category = ?
        ORDER BY r.time_slot ASC";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $date, $category);
$stmt->execute();
$result = $stmt->get_result();
$reservations = $result->fetch_all(MYSQLI_ASSOC);

// Return the reservations in JSON format
echo json_encode(["success" => true, "reservations" => $reservations]);
