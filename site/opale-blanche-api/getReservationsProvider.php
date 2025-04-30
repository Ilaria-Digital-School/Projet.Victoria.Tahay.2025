<?php
header("Access-Control-Allow-Origin: http://localhost");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

session_start();
// Ensure no output buffering conflicts
ob_end_clean();

// Check if the user is authenticated
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "error" => "Utilisateur non authentifié."]);
    exit;
}

// Database connection
require 'config.php';

$user_id = $_SESSION['user_id'];
$date = isset($_GET['date']) ? trim($_GET['date']) : null;
$service = isset($_GET['service']) ? trim($_GET['service']) : null;

// Validate required parameters
if (empty($date) || empty($service)) {
    error_log("❌ Paramètres invalides : date=$date, service=$service");
    echo json_encode(["success" => false, "error" => "Date ou service manquant."]);
    exit;
}

// Retrieve the user's role
$sql_role = "SELECT role FROM users WHERE id = ?";
$stmt_role = $conn->prepare($sql_role);
$stmt_role->bind_param("i", $user_id);
$stmt_role->execute();
$result_role = $stmt_role->get_result();
$user_role = $result_role->fetch_assoc()["role"] ?? "user";
$stmt_role->close();

// Debugging log for received values
error_log("🔍 API après validation : date=$date, service=$service, role=$user_role");

// Restrict data access based on user role
if ($user_role === 'provider_restaurant') {
    // Restaurant provider: fetch reservations for the selected restaurant service
    $sql = "SELECT r.id, r.time_slot, u.nameuser AS client_name, r.people, s.name AS service_name
            FROM reservations r
            JOIN services s ON r.service_id = s.service_id
            JOIN users u ON r.user_id = u.id
            WHERE s.category = 'Restaurant' AND s.name = ? AND r.date_resa = ?
            ORDER BY r.time_slot ASC";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $service, $date);
} elseif ($user_role === 'provider_spa') {
    // Spa provider: fetch reservations for selected spa services
    if ($service === "Accès spa") {
        // Retrieve only "Spa access" reservations
        $sql = "SELECT r.id, r.time_slot, u.nameuser AS client_name, r.people, s.name AS service_name
                FROM reservations r
                JOIN services s ON r.service_id = s.service_id
                JOIN users u ON r.user_id = u.id
                WHERE s.category = 'Spa' AND r.date_resa = ?
                ORDER BY r.time_slot ASC";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $date);
    } elseif ($service === "Soins et massages") {
        // Retrieve only "Massages & Treatments" reservations
        $sql = "SELECT r.id, r.time_slot, u.nameuser AS client_name, r.people, s.name AS service_name
                FROM reservations r
                JOIN services s ON r.service_id = s.service_id
                JOIN users u ON r.user_id = u.id
                WHERE s.category = 'Soins et massages' AND r.date_resa = ?
                ORDER BY r.time_slot ASC";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $date);
    } else {
        echo json_encode(["success" => false, "error" => "Service inconnu."]);
        exit;
    }
} else {
    // Unauthorized access
    echo json_encode(["success" => false, "error" => "Accès refusé."]);
    exit;
}

// Execute the SQL query and fetch reservations
$stmt->execute();
$result = $stmt->get_result();

$reservations = [];
while ($row = $result->fetch_assoc()) {
    $reservations[] = $row;
}

// Log the number of reservations found
error_log("📋 Nombre de réservations trouvées : " . count($reservations));

// Return the reservations as a JSON response
echo json_encode(["success" => true, "reservations" => $reservations]);

// Clean up resources
$stmt->close();
$conn->close();