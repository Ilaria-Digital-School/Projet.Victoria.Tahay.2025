<?php
require_once __DIR__ . '/../utils/session-init.php';
require_once __DIR__ . '/../utils/config-clean.php';

// Set headers to handle CORS and specify JSON response format
header("Access-Control-Allow-Origin: https://victoria-tahay.com");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle CORS pre-check requests
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

// Récupère la catégorie depuis la requête GET
$category = isset($_GET['category']) ? $_GET['category'] : null;

try {
    if ($category) {
        // Requête avec filtre
        $sql = "SELECT service_id, name, category, price, max_capacity FROM services WHERE category = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$category]);
    } else {
        // Requête sans filtre
        $sql = "SELECT service_id, name, category, price, max_capacity FROM services";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
    }

    $services = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Réponse JSON
    echo json_encode(["success" => true, "services" => $services]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error retrieving services: " . $e->getMessage()]);
}
