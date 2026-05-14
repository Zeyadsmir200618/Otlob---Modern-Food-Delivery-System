<?php
// backend/place_order.php
require_once 'config/database.php';
require_once 'models/Order.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['user_id'])) {
    echo json_encode(["success" => false, "message" => "Invalid order data"]);
    exit;
}

$orderModel = new Order($conn);

// PASS ALL 6 FIELDS TO THE MODEL
$success = $orderModel->create(
    $data['user_id'],
    $data['total_price'],
    $data['order_type'],
    $data['payment_method'],
    $data['location'],
    $data['items']
);

if ($success) {
    echo json_encode(["success" => true, "message" => "Order saved successfully!"]);
} else {
    echo json_encode(["success" => false, "message" => "Database error: Could not save order"]);
}
?>