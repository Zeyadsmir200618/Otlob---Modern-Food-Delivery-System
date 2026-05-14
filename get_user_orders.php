<?php
// backend/get_user_orders.php
require_once 'config/database.php';
require_once 'models/Order.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$userId = $_GET['user_id'] ?? null;

if (!$userId) {
    echo json_encode(["success" => false, "message" => "User ID missing"]);
    exit;
}

$orderModel = new Order($conn);
$orders = $orderModel->getUserOrders($userId);

echo json_encode(["success" => true, "orders" => $orders]);