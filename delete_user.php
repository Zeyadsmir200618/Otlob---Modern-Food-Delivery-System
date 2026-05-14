<?php
require_once "config/database.php"; // Singleton DB & CORS
require_once "models/User.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["id"])) {
    echo json_encode(["success" => false]);
    exit;
}

$userModel = new User($conn);
$success = $userModel->delete(intval($data["id"]));

echo json_encode(["success" => $success]);
?>