 
<?php

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class PriceType extends ObjectType {
    public function __construct()
    {
        $config = [
            'name' => 'Price',
            'fields' => [
                'id' => Type::int(),
                'product_id' => Type::string(),
                'amount' => Type::float(),
                'currency_label' => Type::string(),
                'currency_symbol' => Type::string(),
            ],
        ];

        parent::__construct($config);
    }
}
