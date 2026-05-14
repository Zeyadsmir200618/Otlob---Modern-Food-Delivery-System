<?php
require_once 'config/database.php'; // Singleton DB & CORS
require_once 'models/Message.php';

$messageModel = new Message($conn);
$messages = $messageModel->getAll();

echo json_encode($messages);
?>