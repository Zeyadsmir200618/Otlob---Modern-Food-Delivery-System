<?php
// backend/models/Order.php
class Order {
    private $db;

    public function __construct($dbConnection) {
        $this->db = $dbConnection;
    }

    public function create($userId, $totalPrice, $orderType, $paymentMethod, $location, $items) {
        try {
            // We use exact backticks `` to ensure MySQL doesn't confuse column names
            $sql = "INSERT INTO `orders` 
                    (`user_id`, `total_price`, `order_type`, `payment_method`, `location`, `items`, `status`) 
                    VALUES (?, ?, ?, ?, ?, ?, 'Pending')";
            
            $stmt = $this->db->prepare($sql);
            
            $jsonData = json_encode($items);

            $result = $stmt->execute([
                $userId, 
                $totalPrice, 
                $orderType, 
                $paymentMethod, 
                $location, 
                $jsonData
            ]);

            return $result;
        } catch (PDOException $e) {
            // 🔥 THIS PART IS KEY: It will print the REAL error to your XAMPP logs
            error_log("DATABASE CRASH: " . $e->getMessage());
            // This lets the controller see the real error message
            throw new Exception($e->getMessage()); 
        }
    }
    public function getUserOrders($userId) {
        $stmt = $this->db->prepare("SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC");
        $stmt->execute([$userId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function updateStatus($id, $status) {
        $stmt = $this->db->prepare("UPDATE orders SET status = ? WHERE id = ?");
        return $stmt->execute([$status, $id]);
    }

    // Used by Admin to delete orders
public function delete($id) {
    try {
        $stmt = $this->db->prepare("DELETE FROM orders WHERE id = ?");
        return $stmt->execute([$id]);
    } catch (PDOException $e) {
        error_log("Delete Error: " . $e->getMessage());
        return false;
    }
}

public function getAll() {
        $sql = "SELECT orders.*, users.name as customer_name 
                FROM orders 
                LEFT JOIN users ON orders.user_id = users.id 
                ORDER BY orders.id DESC";
        $stmt = $this->db->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    }