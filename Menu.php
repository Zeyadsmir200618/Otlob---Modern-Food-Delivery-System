<?php
// backend/models/Menu.php
class Menu {
    private $db;

    public function __construct($dbConnection) {
        $this->db = $dbConnection;
    }

    public function getAll() {
        // We use PDO here to stay consistent with your Singleton
        $stmt = $this->db->query("SELECT * FROM menu_items");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}