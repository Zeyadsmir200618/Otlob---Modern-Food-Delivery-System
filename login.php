<?php
require_once "config/database.php"; // Singleton DB & CORS
require_once "models/User.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || empty($data['email']) || empty($data['password'])) {
    echo json_encode(["success" => false, "message" => "Email or password missing"]);
    exit;
}

$userModel = new User($conn);
$user = $userModel->login($data['email'], $data['password']);

if ($user) {
    echo json_encode([
        "success" => true,
        "user" => [
            "id" => $user["id"],
            "name" => $user["name"],
            "role" => $user["role"],
            "address" => $user["address"]
            
        ]
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Invalid email or password"]);
}
?>