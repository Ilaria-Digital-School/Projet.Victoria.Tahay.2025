<?php

// Set headers to handle CORS and specify JSON response format
header("Access-Control-Allow-Origin: *"); 
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle CORS pre-check requests
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

// Database connection
require 'config.php'; 

// Set response type to JSON
header('Content-Type: application/json'); 

// Check if a category is specified in the GET request
$category = isset($_GET['category']) ? $_GET['category'] : null;

try {
    if ($category) {
        // Query to fetch only services belonging to the specified category
        $sql = "SELECT service_id, name, category, price, max_capacity FROM services WHERE category = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $category);
    } else {
        // Query to fetch all services if no category is specified
        $sql = "SELECT service_id, name, category, price, max_capacity FROM services";
        $stmt = $conn->prepare($sql);
    }

    // Execute the query
    $stmt->execute();
    $result = $stmt->get_result();

    // Store fetched services in an array
    $services = [];
    while ($row = $result->fetch_assoc()) {
        $services[] = $row;
    }

    // Return the services in JSON format
    echo json_encode(["success" => true, "services" => $services]);

} catch (Exception $e) {
    // Return an error message if any issue occurs
    echo json_encode(["success" => false, "message" => "Error retrieving services: " . $e->getMessage()]);
}

