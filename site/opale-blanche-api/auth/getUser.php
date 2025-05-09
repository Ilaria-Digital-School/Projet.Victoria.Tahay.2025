<?php
require_once __DIR__ . '/../utils/session-init.php';
require_once __DIR__ . '/../utils/config-clean.php';

// Headers to manage CORS and define the response in JSON
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: https://victoria-tahay.com");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle CORS pre-check requests
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

// Check if the email is sent correctly
if (!isset($data['email'])) {
    echo json_encode(["success" => false, "message" => "Email manquant"]);
    exit;
}

// Retrieve user information
$stmt = $pdo->prepare("SELECT nameuser, firstname, birthday, phone, adress, zipcode, city, email FROM users WHERE email = ?");
$stmt->execute([$data['email']]);
$user = $stmt->fetch();

// Check if the user exists in the database
if ($user) {
    echo json_encode(["success" => true, "user" => $user]);
} else {
    echo json_encode(["success" => false, "message" => "Utilisateur non trouvé"]);
}
?>
