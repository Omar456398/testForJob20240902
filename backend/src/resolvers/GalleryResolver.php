 
<?php

require_once __DIR__ . '/BaseResolver.php';

class GalleryResolver extends BaseResolver {
    public function getGalleryById($rootValue, $args)
    {
        $stmt = $this->conn->prepare("SELECT * FROM galleries WHERE id = :id");
        $stmt->bindParam(":id", $args['id']);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getGalleriesByProductId($id)
    {
        $stmt = $this->conn->prepare("SELECT * FROM galleries WHERE product_id = :id");
        $stmt->bindParam(":id", $id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getGalleries()
    {
        $stmt = $this->conn->prepare("SELECT * FROM galleries");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

