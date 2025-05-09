<?php
require_once __DIR__ . '/../utils/session-init.php';
require_once __DIR__ . '/../utils/config-clean.php';

header("Access-Control-Allow-Origin: https://victoria-tahay.com");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header('Content-Type: application/json');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


$data = json_decode(file_get_contents('php://input'), true);

// Vérifie les paramètres reçus
if (!isset($data['service_id'], $data['category'], $data['date_resa'], $data['people'])) {
    echo json_encode(["success" => false, "message" => "Paramètres manquants."]);
    exit;
}

$service_id = $data['service_id'];
$category = $data['category'];
$date_resa = $data['date_resa'];
$people = intval($data['people']);

// Vérifie si le service existe et récupère sa capacité
$sqlService = "SELECT service_id, max_capacity FROM services WHERE service_id = :id";
$stmtService = $pdo->prepare($sqlService);
$stmtService->bindValue(':id', $service_id, PDO::PARAM_INT);
$stmtService->execute();
$serviceData = $stmtService->fetch(PDO::FETCH_ASSOC);

if (!$serviceData) {
    echo json_encode(["success" => false, "message" => "❌ Erreur : Service introuvable."]);
    exit;
}

$max_capacity = isset($serviceData['max_capacity']) ? intval($serviceData['max_capacity']) : 0;

if ($max_capacity === 0) {
    echo json_encode(["success" => false, "message" => "❌ Erreur : max_capacity introuvable pour ce service."]);
    exit;
}

// Récupération des créneaux disponibles selon la catégorie
if ($category === "Soins et Massages") {
    $sql = "SELECT id, time_slot FROM slots WHERE service_id IN (SELECT service_id FROM services WHERE category = :category)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':category', $category, PDO::PARAM_STR);
} else {
    $sql = "SELECT id, time_slot FROM slots WHERE service_id = :service_id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':service_id', $service_id, PDO::PARAM_INT);
}

// Sécurité : vérifie que $stmt est bien initialisé
if (!isset($stmt)) {
    echo json_encode(["success" => false, "message" => "❌ Erreur interne : préparation SQL impossible."]);
    exit;
}

$stmt->execute();
$availableSlots = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Retourne les créneaux disponibles
echo json_encode(["success" => true, "slots" => $availableSlots]);
