<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Database connection
include 'config.php'; 

// Ensure the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "message" => "❌ Méthode non autorisée"]);
    exit;
}

// Retrieve and decode the incoming JSON data
$data = json_decode(file_get_contents("php://input"), true);

// Validate required fields (email and password)
if (!isset($data['email']) || !isset($data['password']) || empty(trim($data['email'])) || empty(trim($data['password']))) {
    echo json_encode(["success" => false, "message" => "❌ Email et mot de passe requis."]);
    exit;
}

$email = trim($data['email']);
$password = trim($data['password']);

// Check if the user exists in the database
$stmt = $pdo->prepare("SELECT id, nameuser, email, password, role FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {
    echo json_encode(["success" => false, "message" => "❌ Identifiants incorrects."]);
    exit;
}

// Verify the password
if (!password_verify($password, $user['password'])) {
    echo json_encode(["success" => false, "message" => "❌ Identifiants incorrects."]);
    exit;
}

// Authentication successful: Create a user session
$_SESSION['user_id'] = $user['id'];
$_SESSION['user_name'] = $user['nameuser'];
$_SESSION['user_email'] = $user['email'];
$_SESSION['user_role'] = $user['role'];

// Return success response with user details
echo json_encode([
    "success" => true,
    "message" => "✅ Connexion réussie !",
    "user" => [
        "id" => $user['id'],
        "name" => $user['nameuser'],
        "email" => $user['email'],
        "role" => $user['role']
    ]
]);
