<?php
// backend/models/Message.php
class Message {
    private $db;

    public function __construct($dbConnection) {
        $this->db = $dbConnection;
    }

    // 1. CREATE (Fixes your fatal error)
    public function create($name, $email, $message) {
        try {
            $sql = "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)";
            $stmt = $this->db->prepare($sql);
            return $stmt->execute([$name, $email, $message]);
        } catch (PDOException $e) {
            return false;
        }
    }

    // 2. READ (For get_messages.php)
    public function getAll() {
        try {
            $stmt = $this->db->query("SELECT * FROM contact_messages ORDER BY created_at DESC");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return [];
        }
    }

    // 3. DELETE (For delete_message.php)
    public function delete($id) {
        try {
            $sql = "DELETE FROM contact_messages WHERE id = ?";
            $stmt = $this->db->prepare($sql);
            return $stmt->execute([$id]);
        } catch (PDOException $e) {
            return false;
        }
    }
}
?>