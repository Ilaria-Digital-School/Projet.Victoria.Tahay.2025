<?php
require_once __DIR__ . '/../utils/session-init.php';
require_once __DIR__ . '/../utils/config-clean.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Origin: https://victoria-tahay.com");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

// Retrieve request data
$data = json_decode(file_get_contents("php://input"), true);
$token = $data['token'] ?? '';
$password = $data['password'] ?? '';

$stmt = $pdo->prepare("SELECT email, expires_at FROM password_resets WHERE token = ?");
$stmt->execute([$token]);
$reset = $stmt->fetch();

// Validate token and password input
if (!$reset || strtotime($reset['expires_at']) < time()) {
    echo json_encode(["message" => "Lien expiré ou invalide."]);
    exit;
}

// Hash the new password before updating
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Check if the token exists and is still valid and Update user password in the database
$stmt = $pdo->prepare("UPDATE users SET password = ? WHERE email = ?");
$stmt->execute([$hashedPassword, $reset['email']]);
$stmt = $pdo->prepare("DELETE FROM password_resets WHERE token = ?");
$stmt->execute([$token]);

// Return success message
echo json_encode(["message" => "Mot de passe mis à jour avec succès."]);
