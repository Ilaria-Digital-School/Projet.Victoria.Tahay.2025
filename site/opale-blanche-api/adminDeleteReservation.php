<?php
session_start();
require 'config.php';

// Extract reservation ID from the request payload
$data = json_decode(file_get_contents("php://input"), true);
$reservation_id = $data['id'] ?? null;

error_log("🔍 Suppression demandée pour l'ID : " . ($reservation_id ?: 'Aucun ID reçu'));

if (!$reservation_id) {
    error_log("❌ Erreur : Aucun ID de réservation fourni.");
    echo json_encode(["success" => false, "error" => "ID de réservation manquant."]);
    exit;
}

// Check if the reservation exists before deletion
$sql_check = "SELECT id FROM reservations WHERE id = ?";
$stmt_check = $conn->prepare($sql_check);
$stmt_check->bind_param("i", $reservation_id);
$stmt_check->execute();
$result_check = $stmt_check->get_result();

if ($result_check->num_rows === 0) {
    error_log("Erreur : La réservation ID $reservation_id n'existe pas.");
    echo json_encode(["success" => false, "error" => "Réservation introuvable."]);
    exit;
}

// Delete the reservation
$sql_delete = "DELETE FROM reservations WHERE id = ?";
$stmt_delete = $conn->prepare($sql_delete);
$stmt_delete->bind_param("i", $reservation_id);
$success = $stmt_delete->execute();

if ($success) {
    error_log(" Réservation ID $reservation_id supprimée avec succès.");
} else {
    error_log(" Erreur SQL lors de la suppression : " . $conn->error);
}

// Return JSON response
echo json_encode(["success" => $success]);
?>
