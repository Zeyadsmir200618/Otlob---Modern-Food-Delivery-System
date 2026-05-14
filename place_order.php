<?php
// backend/place_order.php
require_once 'config/database.php';
require_once 'models/Order.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "No data received"]);
    exit;
}

try {
    $orderModel = new Order($conn);
    $success = $orderModel->create(
        $data['user_id'],
        $data['total_price'],
        $data['order_type'],
        $data['payment_method'],
        $data['location'],
        $data['items']
    );

    echo json_encode(["success" => true, "message" => "Order Saved!"]);
} catch (Exception $e) {
    // 🔥 This will now tell you EXACTLY which column is causing the error
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}