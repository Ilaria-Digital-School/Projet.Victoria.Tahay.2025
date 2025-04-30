<?php
header("Content-Type: application/json");
require_once "config.php"; 

// Check if the database connection exists
if (!isset($conn) || $conn->connect_error) {
    echo json_encode(["success" => false, "error" => "Erreur de connexion à la base de données : " . $conn->connect_error]);
    exit;
}

// Ensure the request is a POST request
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (!isset($_POST["id"]) || empty($_POST["id"])) {
        echo json_encode(["success" => false, "error" => "ID de réservation manquant ou invalide."]);
        exit;
    }

    // Convert ID to integer for safety
    $id = intval($_POST["id"]);

    // Check if the reservation exists before deleting
    $stmt_check = $conn->prepare("SELECT * FROM reservations WHERE id = ?");
    $stmt_check->bind_param("i", $id);
    $stmt_check->execute();
    $result = $stmt_check->get_result();

    if ($result->num_rows === 0) {
        echo json_encode(["success" => false, "error" => "Réservation introuvable."]);
        $stmt_check->close();
        exit;
    }

    // Delete the reservation
    $stmt = $conn->prepare("DELETE FROM reservations WHERE id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Réservation supprimée avec succès."]);
    } else {
        echo json_encode(["success" => false, "error" => "Erreur lors de la suppression."]);
    }

    // Close database connections
    $stmt->close();
    $stmt_check->close();
    $conn->close();
} else {
    echo json_encode(["success" => false, "error" => "Méthode non autorisée."]);
}
?>
