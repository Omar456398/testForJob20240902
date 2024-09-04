 
<?php

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

require_once __DIR__ . '/AttributeType.php';
require_once __DIR__ . '/../resolvers/AttributeResolver.php';
require_once __DIR__ . '/GalleryType.php';
require_once __DIR__ . '/../resolvers/GalleryResolver.php';
require_once __DIR__ . '/PriceType.php';
require_once __DIR__ . '/../resolvers/PriceResolver.php';

class ProductType extends ObjectType {
    public function __construct()
    {
        $config = [
            'name' => 'Product',
            'fields' => [
                'id' => Type::string(),
                'name' => Type::string(),
                'type' => Type::string(),
                'inStock' => Type::int(),
                'description' => Type::string(),
                'category' => Type::string(),
                'brand' => Type::string(),
                'attributes' => [
                    'type' => Type::listOf(new AttributeType()),
                    'resolve' => function ($product) {
                        $resolver = new AttributeResolver();
                        return $resolver->getAttributesByProductId($product['id']);
                    }
                ],
                'gallery' => [
                    'type' => Type::listOf(new GalleryType()),
                    'resolve' => function ($product) {
                        $resolver = new GalleryResolver();
                        return $resolver->getGalleriesByProductId($product['id']);
                    }
                ],
                'prices' => [
                    'type' => Type::listOf(new PriceType()),
                    'resolve' => function ($product) {
                        $resolver = new PriceResolver();
                        return $resolver->getPricesByProductId($product['id']);
                    }
                ]
            ],
        ];

        parent::__construct($config);
    }
}
