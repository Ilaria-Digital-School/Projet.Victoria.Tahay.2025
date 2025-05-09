<?php
require_once __DIR__ . '/../utils/session-init.php';
require_once __DIR__ . '/../utils/config-clean.php';

// Set JSON response format and CORS policy
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Origin: https://victoria-tahay.com");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");


// Capture and log incoming JSON request for debugging
$data = json_decode(file_get_contents("php://input"), true);
file_put_contents("debug.txt", file_get_contents("php://input"));

$email = $data['email'] ?? '';

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["message" => "Adresse email invalide."]);
    exit;
}

// Check if the user exists in the database
$stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user) {
    echo json_encode(["message" => "Aucun utilisateur trouvé avec cet email."]);
    exit;
}

// Generate a secure token and expiration time
$token = bin2hex(random_bytes(32));
$expires = date('Y-m-d H:i:s', strtotime('+1 hour'));

// Store the reset token in the database
$stmt = $pdo->prepare("INSERT INTO password_resets (email, token, expires_at) VALUES (?, ?, ?)");
$stmt->execute([$email, $token, $expires]);

// Generate the reset password link
$resetLink = "http://localhost:5173/ResetPassword?token=$token";

// Send reset link via email (disabled for testing, uncomment to enable)
$message = "Cliquez sur ce lien pour réinitialiser votre mot de passe : $resetLink";
// mail($email, "Réinitialisation de mot de passe", $message, "From: no-reply@opaleblanche.com");
echo json_encode([
    "message" => "Voici le lien de réinitialisation",
    "resetLink" => $resetLink
]);
exit;
  