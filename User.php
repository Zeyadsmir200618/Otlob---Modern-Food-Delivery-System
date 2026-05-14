<?php
// backend/models/User.php

class User {
    private $db;

    public function __construct($dbConnection) {
        $this->db = $dbConnection;
    }

    // Notice this is now called "create" so it matches what register.php is looking for!
    public function create($name, $email, $phone, $address, $password) {
        try {
            $sql = "INSERT INTO users (name, email, phone, address, password) VALUES (?, ?, ?, ?, ?)";
            $stmt = $this->db->prepare($sql);
            return $stmt->execute([$name, $email, $phone, $address, $password]);
        } catch (PDOException $e) {
            return false;
        }
    }
    // READ (Login)
    public function login($email, $password) {
        $stmt = $this->db->prepare("SELECT * FROM users WHERE email = :email LIMIT 1");
        $stmt->bindParam(":email", $email);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Plain password check (matches your current login logic)
        if ($user && $user['password'] === $password) {
            return $user;
        }
        return false;
    }

    // READ (Get all users for Admin)
    public function getAll() {
        $stmt = $this->db->query("SELECT id, name, email, role FROM users");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // DELETE (Delete user for Admin)
    public function delete($id) {
        $stmt = $this->db->prepare("DELETE FROM users WHERE id = ?");
        return $stmt->execute([$id]);
    }
    public function update($id, $name, $phone, $address) {
    try {
        $sql = "UPDATE users SET name = ?, phone = ?, address = ? WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$name, $phone, $address, $id]);
    } catch (PDOException $e) {
        return false;
    }
}
}
?>