 
<?php

require_once __DIR__ . '/../database.php';

class BaseResolver {
    protected $conn;
    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }
}