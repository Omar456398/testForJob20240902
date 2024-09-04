 
<?php

require_once __DIR__ . '/BaseResolver.php';

class AttributeItemResolver extends BaseResolver {
    public function getAttributeItemById($rootValue, $args)
    {
        $stmt = $this->conn->prepare("SELECT * FROM attribute_items WHERE id = :id");
        $stmt->bindParam(":id", $args['id']);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getItemsByAttributeId($id)
    {
        $stmt = $this->conn->prepare("SELECT * FROM attribute_items WHERE attribute_id = :id");
        $stmt->bindParam(":id", $id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getAttributeItems()
    {
        $stmt = $this->conn->prepare("SELECT * FROM attribute_items");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

