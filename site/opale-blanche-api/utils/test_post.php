<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Content-Type: application/json");

// Retrieve raw JSON input
$input = file_get_contents("php://input");

// Log raw request to a file (for debugging)
file_put_contents("debug_test_request.txt", $input);

if (!$input) {
    echo json_encode(["error" => "PHP ne reçoit rien"]);
    exit;
}


// Decode JSON data
$data = json_decode($input, true);

// Return success response with received data
echo json_encode(["success" => true, "message" => "Données reçues", "data" => $data]);
