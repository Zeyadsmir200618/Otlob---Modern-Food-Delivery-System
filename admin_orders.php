<?php
// backend/admin_orders.php
require_once 'config/database.php';
require_once 'models/Order.php';

// Allow React to access this API
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

$orderModel = new Order($conn);

$method = $_SERVER['REQUEST_METHOD'];


// CASE 1: Admin wants to SEE all orders (GET Request)
if ($method === 'GET') {
    $orders = $orderModel->getAll();
    echo json_encode(["success" => true, "orders" => $orders]);
}

// CASE 2: Admin wants to UPDATE or DELETE (POST Request)
if ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (isset($data['action'])) {
        if ($data['action'] === 'update_status') {
            $success = $orderModel->updateStatus($data['id'], $data['status']);
            echo json_encode(["success" => $success]);
        } 
        elseif ($data['action'] === 'delete') {
            $success = $orderModel->delete($data['id']);
            echo json_encode(["success" => $success]);
        }
    }
}
?>