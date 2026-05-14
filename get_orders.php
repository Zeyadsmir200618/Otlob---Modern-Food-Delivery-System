<?php
// backend/get_order.php
require_once 'config/database.php';
require_once 'models/Order.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$orderModel = new Order($conn);
$orders = $orderModel->getAll(); // Fetches all orders from the DB

echo json_encode($orders);