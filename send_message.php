<?php
// backend/send_message.php
require_once "config/database.php"; // Singleton
require_once "models/Message.php";  // Model

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || empty($data['name']) || empty($data['email']) || empty($data['message'])) {
    echo json_encode(["success" => false, "message" => "Missing fields"]);
    exit;
}

$messageModel = new Message($conn);

// We assume your Message model has a create() function!
$success = $messageModel->create($data['name'], $data['email'], $data['message']);

if ($success) {
    echo json_encode(["success" => true, "message" => "Message saved"]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to save message"]);
}
?>