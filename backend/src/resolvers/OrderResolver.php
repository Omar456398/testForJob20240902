 
<?php

require_once __DIR__ . '/BaseResolver.php';

class OrderResolver extends BaseResolver {
    public function getOrderById($rootValue, $args)
    {
        $stmt = $this->conn->prepare("SELECT * FROM orders WHERE id = :id");
        $stmt->bindParam(":id", $args['id']);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getOrders()
    {
        $stmt = $this->conn->prepare("SELECT * FROM orders");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createOrder($rootValue, $args)
    {
        $stmt = $this->conn->prepare("INSERT INTO orders (order_json) VALUES (:order_json)");
        $stmt->bindParam(":order_json", $args['order_json']);
        $stmt->execute();

        $userId = $this->conn->lastInsertId();
        return $this->getOrderById(null, ['id' => $userId]);
    }
}

