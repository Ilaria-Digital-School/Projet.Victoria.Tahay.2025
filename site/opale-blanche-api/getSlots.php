<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


require 'config.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

// Checking the parameters sent
if (!isset($data['service_id']) || !isset($data['category']) || !isset($data['date_resa']) || !isset($data['people'])) {
    echo json_encode(["success" => false, "message" => "Paramètres manquants."]);
    exit;
}

$service_id = $data['service_id'];
$category = $data['category'];
$date_resa = $data['date_resa'];
$people = intval($data['people']);

// Check if service exists and retrieve max_capacity
$sqlService = "SELECT service_id, max_capacity FROM services WHERE service_id = ?";
$stmtService = $conn->prepare($sqlService);
$stmtService->bind_param("i", $service_id);
$stmtService->execute();
$resultService = $stmtService->get_result();
$serviceData = $resultService->fetch_assoc();

if (!$serviceData) {
    echo json_encode(["success" => false, "message" => "❌ Erreur : Service introuvable."]);
    exit;
}

$max_capacity = isset($serviceData['max_capacity']) ? intval($serviceData['max_capacity']) : 0;

// Check that $max_capacity is correctly retrieved
if ($max_capacity === 0) {
    echo json_encode(["success" => false, "message" => "❌ Erreur : max_capacity introuvable pour ce service."]);
    exit;
}

// Definition of the SQL query to retrieve the slots
if ($category === "Soins et Massages") {
    $sql = "SELECT id, time_slot FROM slots WHERE service_id IN (SELECT id FROM services WHERE category = ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $category);
} else {
    $sql = "SELECT id, time_slot FROM slots WHERE service_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $service_id);
}

// Check if `$sql` has been defined before executing the query
if (!isset($sql) || !$stmt) {
    echo json_encode(["success" => false, "message" => "❌ Erreur interne : Requête SQL non définie."]);
    exit;
}

// Execute the query
$stmt->execute();
$result = $stmt->get_result();

$availableSlots = [];
while ($row = $result->fetch_assoc()) {
    $availableSlots[] = $row;
}

// Return available slots
echo json_encode(["success" => true, "slots" => $availableSlots]);
