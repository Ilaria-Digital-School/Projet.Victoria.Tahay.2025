<?php
require_once __DIR__ . '/../utils/session-init.php';
require_once __DIR__ . '/../utils/config-clean.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Origin: https://victoria-tahay.com");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Enable full error reporting for debugging (Remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Check if the user is authenticated
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "error" => "Utilisateur non connecté"]);
    exit;
}

$user_id = $_SESSION['user_id'];



// Fetch all user reservations with service price from the `services` table
$stmt = $pdo->prepare("
    SELECT r.id, r.service_id, r.category, r.date_resa, r.time_slot, r.people, s.name AS servicename, s.price AS service_price
    FROM reservations r
    JOIN services s ON r.service_id = s.service_id
    WHERE r.user_id = ?
    ORDER BY r.date_resa DESC
");
$stmt->execute([$user_id]);
$reservations = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Calculate the total price based on the service price multiplied by the number of people
foreach ($reservations as &$reservation) {
    $service_price = isset($reservation['service_price']) ? (float)$reservation['service_price'] : 0;
    $people = isset($reservation['people']) ? (int)$reservation['people'] : 1;
    $reservation['total_price'] = $service_price * $people;
}

// Check if any reservations exist and return them
if ($reservations) {
    echo json_encode(["success" => true, "reservations" => $reservations]);
} else {
    echo json_encode(["success" => false, "message" => "Aucune réservation trouvée"]);
}
?>