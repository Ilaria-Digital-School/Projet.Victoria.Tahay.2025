<?php
$host = "localhost";
$dbname = "u648270456_opale_blanche";
$username = "u648270456_Tahay";  
$password = "o~6BC^LUYg=C";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(["success" => false, "error" => "Erreur de connexion PDO : " . $e->getMessage()]));
}

error_log("📦 FICHIER CONFIG-CLEAN chargé.");
