<?php
require_once __DIR__ . '/../utils/session-init.php';
require_once __DIR__ . '/../utils/config-clean.php';

header("Access-Control-Allow-Origin: https://victoria-tahay.com");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

// Démarre la session
ob_end_clean();

// Vérifie que l'utilisateur est connecté
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "error" => "Utilisateur non authentifié."]);
    exit;
}

$user_id = $_SESSION['user_id'];
$date = isset($_GET['date']) ? trim($_GET['date']) : null;
$service = isset($_GET['service']) ? trim($_GET['service']) : null;

// Vérifie les paramètres requis
if (empty($date) || empty($service)) {
    error_log("❌ Paramètres invalides : date=$date, service=$service");
    echo json_encode(["success" => false, "error" => "Date ou service manquant."]);
    exit;
}

// 🔍 Récupère le rôle de l'utilisateur
$sql_role = "SELECT role FROM users WHERE id = :id";
$stmt_role = $pdo->prepare($sql_role);
$stmt_role->bindValue(':id', $user_id, PDO::PARAM_INT);
$stmt_role->execute();
$user_data = $stmt_role->fetch(PDO::FETCH_ASSOC);
$user_role = $user_data['role'] ?? 'user';

error_log("🔍 API après validation : date=$date, service=$service, role=$user_role");

// Sélectionne la requête en fonction du rôle
if ($user_role === 'provider_restaurant') {
    $sql = "SELECT r.id, r.time_slot, u.nameuser AS client_name, r.people, s.name AS service_name
            FROM reservations r
            JOIN services s ON r.service_id = s.service_id
            JOIN users u ON r.user_id = u.id
            WHERE s.category = 'Restaurant' AND s.name = :service AND r.date_resa = :date
            ORDER BY r.time_slot ASC";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':service', $service, PDO::PARAM_STR);
    $stmt->bindValue(':date', $date, PDO::PARAM_STR);
} elseif ($user_role === 'provider_spa') {
    if ($service === "Accès spa") {
        $sql = "SELECT r.id, r.time_slot, u.nameuser AS client_name, r.people, s.name AS service_name
                FROM reservations r
                JOIN services s ON r.service_id = s.service_id
                JOIN users u ON r.user_id = u.id
                WHERE s.category = 'Spa' AND r.date_resa = :date
                ORDER BY r.time_slot ASC";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':date', $date, PDO::PARAM_STR);
    } elseif ($service === "Soins et massages") {
        $sql = "SELECT r.id, r.time_slot, u.nameuser AS client_name, r.people, s.name AS service_name
                FROM reservations r
                JOIN services s ON r.service_id = s.service_id
                JOIN users u ON r.user_id = u.id
                WHERE s.category = 'Soins et massages' AND r.date_resa = :date
                ORDER BY r.time_slot ASC";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':date', $date, PDO::PARAM_STR);
    } else {
        echo json_encode(["success" => false, "error" => "Service inconnu."]);
        exit;
    }
} else {
    echo json_encode(["success" => false, "error" => "Accès refusé."]);
    exit;
}

// 🔄 Exécute la requête et récupère les données
$stmt->execute();
$reservations = $stmt->fetchAll(PDO::FETCH_ASSOC);

error_log("📋 Nombre de réservations trouvées : " . count($reservations));

echo json_encode(["success" => true, "reservations" => $reservations]);

// Libère les ressources (optionnel en PDO)
$stmt = null;
$pdo = null;
