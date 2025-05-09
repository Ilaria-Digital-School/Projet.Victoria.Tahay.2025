<?php
require_once '../utils/session-init.php';
require_once '../utils/config-clean.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: https://victoria-tahay.com");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "error" => "Méthode non autorisée."]);
    exit;
}

// Lire les données JSON brutes
$data = json_decode(file_get_contents("php://input"), true);

// Vérifie la présence de l'ID
if (!isset($data['id']) || !is_numeric($data['id'])) {
    echo json_encode(["success" => false, "error" => "ID de réservation manquant ou invalide."]);
    exit;
}

$id = intval($data['id']);

try {
    $stmt = $pdo->prepare("DELETE FROM reservations WHERE id = ?");
    $stmt->execute([$id]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => "Aucune réservation trouvée avec cet ID."]);
    }
} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => "Erreur lors de la suppression : " . $e->getMessage()]);
}
