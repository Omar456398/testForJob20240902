 
<?php

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class OrderType extends ObjectType {
    public function __construct()
    {
        $config = [
            'name' => 'Order',
            'fields' => [
                'id' => Type::int(),
                'order_json' => Type::string(),
            ],
        ];

        parent::__construct($config);
    }
}
