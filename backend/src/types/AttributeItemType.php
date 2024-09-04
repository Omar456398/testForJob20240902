 
<?php

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class AttributeItemType extends ObjectType {
    public function __construct()
    {
        $config = [
            'name' => 'AttributeItem',
            'fields' => [
                'id' => Type::int(),
                'display_value' => Type::string(),
                'attribute_id' => Type::int(),
                'value' => Type::string(),
            ],
        ];

        parent::__construct($config);
    }
}
