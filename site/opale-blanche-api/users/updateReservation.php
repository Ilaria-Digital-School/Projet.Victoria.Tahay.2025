<?php
require_once __DIR__ . '/../utils/session-init.php';
require_once __DIR__ . '/../utils/config-clean.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Origin: https://victoria-tahay.com");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "error" => "Utilisateur non connecté"]);
    exit;
}

$user_id = $_SESSION['user_id'];


// Process POST request
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $reservation_id = $_POST['reservation_id'] ?? null;
    $new_service_id = $_POST['new_service_id'] ?? null;

    // Validate that all required fields are present
    if (!$reservation_id || !$new_service_id) {
        echo json_encode(["success" => false, "error" => "Données manquantes"]);
        exit;
    }

    // Start a database transaction
    $pdo->beginTransaction();

    try {
        // Update the service_id in the reservations table        $stmt = $pdo->prepare("UPDATE reservations SET service_id = ? WHERE id = ?");
        $stmt = $pdo->prepare("UPDATE reservations SET service_id = ? WHERE id = ?");
        $stmt->execute([$new_service_id, $reservation_id]);
        $stmt = $pdo->prepare("SELECT name FROM services WHERE service_id = ?");
        $stmt->execute([$new_service_id]);
        $updated_service = $stmt->fetch(PDO::FETCH_ASSOC);

        // Commit the transaction if everything is successful
        $pdo->commit();

        // Return success response with updated service name
        echo json_encode([
            "success" => true,
            "updated_servicename" => $updated_service ? $updated_service['name'] : null
        ]);
    } catch (Exception $e) {
        // Rollback the transaction if an error occurs
        $pdo->rollBack();
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
}
