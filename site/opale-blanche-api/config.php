<?php
$host = "localhost";
$dbname = "u648270456_opale_blanche";
$username = "u648270456_Tahay";  
$password = "o~6BC^LUYg=C";

try {
    // Establishing a PDO connection with error handling and UTF-8 support
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(["success" => false, "error" => "Erreur de connexion PDO : " . $e->getMessage()]));
}

// Establishing a MySQLi connection (optional, if needed for the project)
$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "Erreur de connexion MySQLi : " . $conn->connect_error]));
}

