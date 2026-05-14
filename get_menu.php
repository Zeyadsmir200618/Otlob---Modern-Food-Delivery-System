<?php
// 1. Singleton Connection (Handles CORS and Database)
require_once 'config/database.php'; 
// 2. The Model
require_once 'models/Menu.php';

// 3. The Controller Logic
$menuModel = new Menu($conn);
$items = $menuModel->getAll();

// 4. Send Clean JSON back to React
echo json_encode($items);