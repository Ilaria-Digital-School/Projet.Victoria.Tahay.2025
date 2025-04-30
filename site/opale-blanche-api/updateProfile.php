<?php
session_start();
// Headers to manage CORS and JSON
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle CORS pre-check requests
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

// Connection to the database
include "config.php";


$data = json_decode(file_get_contents("php://input"), true);

// Data verification
if (!isset($data['email'], $data['newEmail'], $data['phone'], $data['adress'], $data['zipcode'], $data['city'])) {
    echo json_encode(["success" => false, "message" => "Données manquantes"]);
    exit;
}

// error_log("Données reçues : " . print_r($data, true));

// Update user
$stmt = $pdo->prepare("UPDATE users SET email = ?, phone = ?, adress = ?, zipcode = ?, city = ? WHERE email = ?");
if ($stmt->execute([
    $data['newEmail'],
    $data['phone'],
    $data['adress'],
    $data['zipcode'],
    $data['city'],
    $data['email']
])) {
    echo json_encode(["success" => true, "message" => "Profil mis à jour"]);
} else {
    $errorInfo = $stmt->errorInfo();
    echo json_encode([
        "success" => false,
        "message" => "Erreur lors de la mise à jour"
    ]);
}

?>
