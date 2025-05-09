<?php
require_once __DIR__ . '/../utils/session-init.php';
require_once __DIR__ . '/../utils/config-clean.php';

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: https://victoria-tahay.com");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Ensure the request is a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "message" => "❌ Méthode non autorisée"]);
    exit;
}

// Retrieve raw JSON data
$data = json_decode(file_get_contents("php://input"), true);

// Validate if data is received
if (!$data) {
    echo json_encode(["success" => false, "message" => "❌ Aucune donnée reçue."]);
    exit;
}

// Define required fields
$requiredFields = ['nameuser', 'firstname', 'birthday', 'phone', 'adress', 'zipcode', 'city', 'email', 'password', 'confirmPassword'];

// Check if all required fields are present
foreach ($requiredFields as $field) {
    if (!isset($data[$field]) || empty(trim($data[$field]))) {
        echo json_encode(["success" => false, "message" => "❌ Champ manquant : " . $field]);
        exit;
    }
}

// Secure and retrieve input values
$nameuser = trim($data['nameuser']);
$firstname = trim($data['firstname']);
$birthday = trim($data['birthday']);
$phone = trim($data['phone']);
$adress = trim($data['adress']);
$zipcode = trim($data['zipcode']);
$city = trim($data['city']);
$email = trim($data['email']);
$password = trim($data['password']);
$confirmPassword = trim($data['confirmPassword']);
$role = "user"; // Rôle par défaut

// Check if passwords match
if ($password !== $confirmPassword) {
    echo json_encode(["success" => false, "message" => "❌ Les mots de passe ne correspondent pas."]);
    exit;
}

// Check if the email is already registered
$stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
$stmt->execute([$email]);

if ($stmt->fetch()) {
    echo json_encode(["success" => false, "message" => "⚠️ Cet email est déjà utilisé."]);
    exit;
}

// Hash the password before storingn
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// Debugging log before insertion
error_log("Insertion : nameuser=$nameuser, firstname=$firstname, birthday=$birthday, phone=$phone, adress=$adress, zipcode=$zipcode, city=$city, email=$email, role=$role");

// Insert user into the database
$stmt = $pdo->prepare("
    INSERT INTO users (nameuser, firstname, birthday, phone, adress, zipcode, city, email, password, role) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
");

$success = $stmt->execute([$nameuser, $firstname, $birthday, $phone, $adress, $zipcode, $city, $email, $hashedPassword, $role]);

// Return success or failure response
if ($success) {
    echo json_encode(["success" => true, "message" => "✅ Inscription réussie !"]);
} else {
    // Capture SQL error for debugging
    error_log("❌ Erreur SQL : " . implode(" - ", $stmt->errorInfo()));
    echo json_encode(["success" => false, "message" => "❌ Erreur SQL : " . implode(" - ", $stmt->errorInfo())]);
}
?>
