 
<?php

require_once __DIR__ . '/BaseResolver.php';

class AttributeResolver extends BaseResolver {
    public function getAttributeById($rootValue, $args)
    {
        $stmt = $this->conn->prepare("SELECT * FROM attributes WHERE id = :id");
        $stmt->bindParam(":id", $args['id']);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getAttributesByProductId($id)
    {
        $stmt = $this->conn->prepare("SELECT * FROM attributes WHERE product_id = :id");
        $stmt->bindParam(":id", $id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getAttributes()
    {
        $stmt = $this->conn->prepare("SELECT * FROM attributes");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

