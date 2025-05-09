<?php
require_once __DIR__ . '/../utils/session-init.php';
require_once __DIR__ . '/../utils/config-clean.php'; 

// Destroy all session data
session_unset(); 
session_destroy(); 

// Remove session cookie (if exists)
if (isset($_COOKIE[session_name()])) {
    setcookie(session_name(), '', time() - 3600, '/');
}

// Return a JSON response
echo json_encode(["success" => true, "message" => "Déconnexion réussie"]);
exit;
