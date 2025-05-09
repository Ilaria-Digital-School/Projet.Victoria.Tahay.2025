<?php
require_once __DIR__ . '/../utils/session-init.php';
require_once __DIR__ . '/../utils/config-clean.php';

header("Access-Control-Allow-Origin: https://victoria-tahay.com");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Nettoie toute sortie précédente
ob_clean();

// Vérifie que l'utilisateur est authentifié
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "error" => "Utilisateur non authentifié."]);
    exit;
}

$user_id = $_SESSION['user_id'];

// Récupère le rôle de l'utilisateur
$sql = "SELECT role FROM users WHERE id = :id";
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':id', $user_id, PDO::PARAM_INT);
$stmt->execute();
$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result && isset($result['role'])) {
    echo json_encode(["success" => true, "role" => $result['role']]);
} else {
    echo json_encode(["success" => false, "error" => "Utilisateur non trouvé."]);
}

// Libère les ressources
$stmt = null;
$pdo = null;
