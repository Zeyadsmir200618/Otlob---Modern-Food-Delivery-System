<?php
require_once "config/database.php"; // Singleton DB & CORS
require_once "models/User.php";

$userModel = new User($conn);
$users = $userModel->getAll();

echo json_encode($users);
?>