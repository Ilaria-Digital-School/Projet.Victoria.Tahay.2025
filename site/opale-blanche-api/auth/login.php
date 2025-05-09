<?php
require_once __DIR__ . '/../utils/session-init.php';
require_once __DIR__ . '/../utils/config-clean.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: https://victoria-tahay.com");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Vérifie que la méthode est POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "message" => "❌ Méthode non autorisée"]);
    exit;
}

// Récupère les données JSON
$data = json_decode(file_get_contents("php://input"), true);

// Vérifie les champs requis
if (!isset($data['email'], $data['password']) || empty(trim($data['email'])) || empty(trim($data['password']))) {
    echo json_encode(["success" => false, "message" => "❌ Email et mot de passe requis."]);
    exit;
}

$email = trim($data['email']);
$password = trim($data['password']);

// Recherche l'utilisateur
$stmt = $pdo->prepare("SELECT id, nameuser, email, password, role FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user || !password_verify($password, $user['password'])) {
    echo json_encode(["success" => false, "message" => "❌ Identifiants incorrects."]);
    exit;
}

// Authentification réussie → créer la session
$_SESSION['user_id'] = $user['id'];
$_SESSION['user_name'] = $user['nameuser'];
$_SESSION['user_email'] = $user['email'];
$_SESSION['user_role'] = $user['role'];

// Réponse au frontend
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

// Logs serveur pour vérification
error_log("🟢 Session ID : " . session_id());
error_log("🟢 SESSION après login : " . print_r($_SESSION, true));
