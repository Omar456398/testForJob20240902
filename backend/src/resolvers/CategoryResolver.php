 
<?php

require_once __DIR__ . '/BaseResolver.php';

class CategoryResolver extends BaseResolver {
    public function getCategoryById($rootValue, $args)
    {
        $stmt = $this->conn->prepare("SELECT * FROM categories WHERE name = :name");
        $stmt->bindParam(":name", $args['name']);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getCategories()
    {
        $stmt = $this->conn->prepare("SELECT * FROM categories");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

