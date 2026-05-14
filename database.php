<?php
// backend/config/database.php

// 1. CORS Headers (Centralized here so we don't repeat them everywhere)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 2. The Singleton Class
class Database {
    // This static property holds the single instance of the class
    private static $instance = null;
    private $conn;

    // The Constructor is PRIVATE so no one can write 'new Database()' anywhere else
    private function __construct() {
        $host = "localhost";
        $db_name = "food_delivery_system"; 
        $username = "root";
        $password = "";

        try {
            $this->conn = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $username, $password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo json_encode([
                "success" => false,
                "message" => "Database connection failed: " . $e->getMessage()
            ]);
            exit;
        }
    }

    // This is the only way to get the connection. It checks if one exists first!
    public static function getInstance() {
        if (self::$instance == null) {
            self::$instance = new Database();
        }
        return self::$instance->conn;
    }
}

// 3. The "Drop-in" Variable
// We create $conn here so your other files (login.php, register.php) 
// don't break. They will use the Singleton without needing any code changes!
$conn = Database::getInstance();
?>