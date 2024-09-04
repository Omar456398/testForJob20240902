 
<?php

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

require_once __DIR__ . '/AttributeItemType.php';
require_once __DIR__ . '/../resolvers/AttributeItemResolver.php';

class AttributeType extends ObjectType {
    public function __construct()
    {
        $config = [
            'name' => 'Attribute',
            'fields' => [
                'id' => Type::int(),
                'name' => Type::string(),
                'product_id' => Type::string(),
                'type' => Type::string(),
                'items' => [
                    'type' => Type::listOf(new AttributeItemType()),
                    'resolve' => function ($attribute) {
                        $resolver = new AttributeItemResolver();
                        return $resolver->getItemsByAttributeId($attribute['id']);
                    }
                ]
            ],
        ];

        parent::__construct($config);
    }
}
