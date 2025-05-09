<?php
require_once __DIR__ . '/../utils/session-init.php';
require_once __DIR__ . '/../utils/config-clean.php';

header('Content-Type: application/json');

$date = $_GET['date'] ?? null;
$category = $_GET['category'] ?? null;

if (!$date || !$category) {
    echo json_encode(["success" => false, "error" => "Date ou catégorie manquante."]);
    exit;
}

try {
    if ($category === "Spa") {
        $sql = "SELECT 
                    r.id AS reservation_id,
                    r.time_slot,
                    r.people,
                    u.nameuser AS client_name,
                    u.firstname,
                    s.name AS servicename
                FROM reservations r
                JOIN users u ON r.user_id = u.id
                JOIN services s ON r.service_id = s.service_id
                WHERE r.date_resa = :date
                AND s.category IN ('Spa', 'Soins et massages')
                ORDER BY r.time_slot ASC";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':date', $date, PDO::PARAM_STR);
    } else {
        $sql = "SELECT 
                    r.id AS reservation_id,
                    r.time_slot,
                    r.people,
                    u.nameuser AS client_name,
                    u.firstname,
                    s.name AS servicename
                FROM reservations r
                JOIN users u ON r.user_id = u.id
                JOIN services s ON r.service_id = s.service_id
                WHERE r.date_resa = :date
                AND s.category = :category
                ORDER BY r.time_slot ASC";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':date', $date, PDO::PARAM_STR);
        $stmt->bindValue(':category', $category, PDO::PARAM_STR);
    }

    $stmt->execute();
    $reservations = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["success" => true, "reservations" => $reservations]);

} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => "Erreur SQL : " . $e->getMessage()]);
}
