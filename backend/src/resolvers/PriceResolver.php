 
<?php

require_once __DIR__ . '/BaseResolver.php';

class PriceResolver extends BaseResolver {
    public function getPriceById($rootValue, $args)
    {
        $stmt = $this->conn->prepare("SELECT * FROM prices WHERE id = :id");
        $stmt->bindParam(":id", $args['id']);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getPricesByProductId($id)
    {
        $stmt = $this->conn->prepare("SELECT * FROM prices WHERE product_id = :id");
        $stmt->bindParam(":id", $id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getPrices()
    {
        $stmt = $this->conn->prepare("SELECT * FROM prices");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

