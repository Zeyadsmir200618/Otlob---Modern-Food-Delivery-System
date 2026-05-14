<?php
require_once "config/database.php";
require_once "models/User.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['id'])) {
    echo json_encode(["success" => false, "message" => "Invalid data"]);
    exit;
}

$userModel = new User($conn);
$success = $userModel->update($data['id'], $data['name'], $data['phone'], $data['address']);

if ($success) {
    echo json_encode(["success" => true, "message" => "Profile updated!"]);
} else {
    echo json_encode(["success" => false, "message" => "Update failed"]);
}
?>