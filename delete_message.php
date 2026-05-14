<?php
require_once "config/database.php"; // Singleton DB & CORS
require_once "models/Message.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["id"])) {
    echo json_encode(["success" => false, "message" => "ID is required"]);
    exit;
}

$messageModel = new Message($conn);
$success = $messageModel->delete($data["id"]);

if ($success) {
    echo json_encode(["success" => true, "message" => "Message deleted"]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to delete message"]);
}
?>