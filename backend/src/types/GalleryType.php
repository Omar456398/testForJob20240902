 
<?php

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class GalleryType extends ObjectType {
    public function __construct()
    {
        $config = [
            'name' => 'Gallery',
            'fields' => [
                'id' => Type::int(),
                'product_id' => Type::string(),
                'url' => Type::string(),
            ],
        ];

        parent::__construct($config);
    }
}
