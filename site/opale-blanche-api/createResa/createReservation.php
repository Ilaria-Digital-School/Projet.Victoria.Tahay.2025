<?php
require_once __DIR__ . '/../utils/session-init.php';
require_once __DIR__ . '/../utils/config-clean.php'; 

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: https://victoria-tahay.com");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");


// Capture raw input for debugging
$input = file_get_contents("php://input");
file_put_contents("debug_raw_request.txt", $input);

if (!$input) {
    echo json_encode(["error" => "PHP ne reçoit aucune donnée"]);
    exit;
}

// Decode JSON input
$data = json_decode($input, true);
file_put_contents("debug_json_decode.txt", print_r($data, true));

if (!$data) {
    echo json_encode(["error" => "Impossible de décoder JSON", "raw" => $input]);
    exit;
}

// Check required fields
$champs_requis = ['user_id', 'service_id', 'category', 'date_resa', 'time_slot', 'people'];
$champs_manquants = [];

foreach ($champs_requis as $champ) {
    if (!isset($data[$champ]) || empty($data[$champ])) {
        $champs_manquants[] = $champ;
    }
}

if (!empty($champs_manquants)) {
    echo json_encode(["error" => "Données manquantes", "champs" => $champs_manquants]);
    exit;
}


try {
    // Establish PDO connection with error handling
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    file_put_contents("debug_sql_values.txt", print_r($data, true));

    // Check if user exists
    $stmtCheckUser = $pdo->prepare("SELECT id FROM users WHERE id = :user_id");
    $stmtCheckUser->execute(['user_id' => $data['user_id']]);
    if ($stmtCheckUser->rowCount() == 0) {
        echo json_encode(["error" => "Utilisateur non trouvé"]);
        exit;
    }

    // Check if service exists
    $stmtCheckService = $pdo->prepare("SELECT service_id FROM services WHERE service_id = :service_id");
    $stmtCheckService->execute(['service_id' => $data['service_id']]);
    if ($stmtCheckService->rowCount() == 0) {
        echo json_encode(["error" => "Service non trouvé"]);
        exit;
    }

    // Define maximum capacities per category
    $max_capacity = [
        'Soins et massages' => 2,
        'Spa' => 10,
        'Restaurant' => 16
    ];

    // Validate category
    if (!isset($max_capacity[$data['category']])) {
        echo json_encode(["error" => "Catégorie non valide"]);
        exit;
    }

    $capacity_limit = $max_capacity[$data['category']];

    // Check remaining capacity for the selected slot
    $stmtCheckCapacity = $pdo->prepare("SELECT SUM(people) as total_people FROM reservations WHERE date_resa = :date_resa AND time_slot = :time_slot AND category = :category");
    $stmtCheckCapacity->execute([
        'date_resa' => $data['date_resa'],
        'time_slot' => $data['time_slot'],
        'category' => $data['category']
    ]);
    $row = $stmtCheckCapacity->fetch(PDO::FETCH_ASSOC);
    $current_reservations = $row['total_people'] ?? 0;

    if ($current_reservations + $data['people'] > $capacity_limit) {
        echo json_encode(["error" => "Ce créneau est complet. Veuillez choisir un autre horaire."]);
        exit;
    }

    // Insert reservation
    $stmt = $pdo->prepare("INSERT INTO reservations (user_id, service_id, category, date_resa, time_slot, people) VALUES (:user_id, :service_id, :category, :date_resa, :time_slot, :people)");
    
    $stmt->execute([
        'user_id' => $data['user_id'],
        'service_id' => $data['service_id'],
        'category' => $data['category'],
        'date_resa' => $data['date_resa'],
        'time_slot' => $data['time_slot'],
        'people' => $data['people']
    ]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(["success" => true, "message" => "Réservation confirmée !"]);
    } else {
        echo json_encode(["error" => "L'insertion SQL a échoué"]);
    }
} catch (PDOException $e) {
    file_put_contents("debug_sql_error.txt", "Erreur SQL : " . $e->getMessage());
    echo json_encode(["error" => "Erreur SQL : " . $e->getMessage()]);
}
