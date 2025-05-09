<?php
require_once __DIR__ . '/utils/session-init.php';
require_once __DIR__ . '/utils/config-clean.php';

header("Access-Control-Allow-Origin: https://victoria-tahay.com");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
// Handle preflight requests (OPTIONS method)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Retrieve and decode JSON input from the request body
$data = json_decode(file_get_contents("php://input"));

// Validate required fields from the input
if (
    !empty($data->name) &&
    !empty($data->email) &&
    !empty($data->subject) &&
    !empty($data->message)
) {
    try {
              
        // Prepare SQL query for inserting contact data securely
        $stmt = $pdo->prepare("INSERT INTO contact (name, email, telephone, subject, message) VALUES (?, ?, ?, ?, ?)");

        // Execute the query with sanitized input values
        $stmt->execute([
            htmlspecialchars($data->name),
            htmlspecialchars($data->email),
            htmlspecialchars($data->telephone),
            htmlspecialchars($data->subject),
            htmlspecialchars($data->message)
        ]);

        // Respond with a success message
        echo json_encode(["message" => "Message envoyé. Nous vous répondrons sous 48h."]);

    } catch (PDOException $e) {
        // Respond with an error message in case of database failure
        http_response_code(500);
        echo json_encode(["message" => "Database error: " . $e->getMessage()]);
    }
    
} else {
    // Respond with an error if required fields are missing
    http_response_code(400);
    echo json_encode(["message" => "Veuillez remplir tous les champs obligatoires."]);
}
