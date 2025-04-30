<?php
header("Access-Control-Allow-Origin: http://localhost");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

session_start();

// Clean any previous output to avoid response corruption
ob_clean();

// Check if the user is authenticated
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "error" => "Utilisateur non authentifié."]);
    exit;
}

// Database connection
require 'config.php';

$user_id = $_SESSION['user_id'];

// Retrieve the user's role from the database
$sql = "SELECT role FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    // Successfully retrieved user role
    echo json_encode(["success" => true, "role" => $row["role"]]);
} else {
    // User not found in the database
    echo json_encode(["success" => false, "error" => "Utilisateur non trouvé."]);
}

// Close database connection to free resources
$stmt->close();
$conn->close();

