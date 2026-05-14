<?php
require_once "config/database.php";

$users = $conn->query("SELECT id, password FROM users")->fetchAll(PDO::FETCH_ASSOC);

foreach ($users as $u) {
    if (!str_starts_with($u['password'], '$2y$')) {
        $hashed = password_hash($u['password'], PASSWORD_BCRYPT);

        $stmt = $conn->prepare("UPDATE users SET password = :p WHERE id = :id");
        $stmt->execute([
            ":p" => $hashed,
            ":id" => $u['id']
        ]);
    }
}

echo "Passwords fixed!";