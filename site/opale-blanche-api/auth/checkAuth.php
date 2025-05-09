<?php
require_once __DIR__ . '/../utils/config-clean.php';
require_once __DIR__ . '/../utils/session-init.php';


header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000"); // Met à jour selon ton frontend
header("Access-Control-Allow-Origin: https://victoria-tahay.com");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");





// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Check if the user session exists with required data
if (!isset($_SESSION['user_id'], $_SESSION['user_name'], $_SESSION['user_email'], $_SESSION['user_role'])) {
    echo json_encode([
        "authenticated" => false, 
        "error" => "Utilisateur non connecté", 
        "session" => $_SESSION,
        "session_id" => session_id() 
    ]);
    exit;
}

// Return user information if authenticated
echo json_encode([
    "authenticated" => true,
    "user" => [
        "id" => $_SESSION['user_id'],
        "nameuser" => $_SESSION['user_name'],
        "email" => $_SESSION['user_email'],
        "role" => $_SESSION['user_role']
    ]
]);
