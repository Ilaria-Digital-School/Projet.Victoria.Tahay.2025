<?php
require_once __DIR__ . '/../utils/session-init.php';
require_once __DIR__ . '/../utils/config-clean.php';

header("Access-Control-Allow-Origin: https://victoria-tahay.com");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");


// Vérifie que la requête est bien un POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "error" => "Méthode non autorisée."]);
    exit;
}

// Vérifie la connexion PDO
if (!isset($pdo) || !$pdo instanceof PDO) {
    echo json_encode(["success" => false, "error" => "Erreur de connexion à la base de données."]);
    exit;
}

// Vérifie que l'ID a été envoyé
if (!isset($_POST["id"]) || empty($_POST["id"])) {
    echo json_encode(["success" => false, "error" => "ID de réservation manquant ou invalide."]);
    exit;
}

$id = intval($_POST["id"]);

try {
    // Vérifie si la réservation existe
    $stmt_check = $pdo->prepare("SELECT * FROM reservations WHERE id = :id");
    $stmt_check->bindValue(':id', $id, PDO::PARAM_INT);
    $stmt_check->execute();
    $reservation = $stmt_check->fetch(PDO::FETCH_ASSOC);

    if (!$reservation) {
        echo json_encode(["success" => false, "error" => "Réservation introuvable."]);
        exit;
    }

    // Supprime la réservation
    $stmt = $pdo->prepare("DELETE FROM reservations WHERE id = :id");
    $stmt->bindValue(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    echo json_encode(["success" => true, "message" => "Réservation supprimée avec succès."]);

} catch (PDOException $e) {
    error_log("❌ Erreur PDO : " . $e->getMessage());
    echo json_encode(["success" => false, "error" => "Erreur serveur lors de la suppression."]);
}
