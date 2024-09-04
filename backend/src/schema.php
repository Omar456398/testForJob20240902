 
<?php

use GraphQL\Type\Schema;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\FieldDefinition;
use GraphQL\GraphQL;

require_once __DIR__ . '/types/CategoryType.php';
require_once __DIR__ . '/resolvers/CategoryResolver.php';

$categoryType = new CategoryType();

require_once __DIR__ . '/types/ProductType.php';
require_once __DIR__ . '/resolvers/ProductResolver.php';

$productType = new ProductType();

require_once __DIR__ . '/types/OrderType.php';
require_once __DIR__ . '/resolvers/OrderResolver.php';

$orderType = new OrderType();

$schema = new Schema([
    'query' => new ObjectType([
        'name' => 'Query',
        'fields' => [
            'category' => [
                'type' => $categoryType,
                'args' => [
                    'name' => Type::nonNull(Type::string())
                ],
                'resolve' => [new CategoryResolver(), 'getCategoryById']
            ],
            'categories' => [
                'type' => Type::listOf($categoryType),
                'resolve' => [new CategoryResolver(), 'getCategories']
            ],
            'product' => [
                'type' => $productType,
                'args' => [
                    'id' => Type::nonNull(Type::string())
                ],
                'resolve' => [new ProductResolver(), 'getProductById']
            ],
            'products' => [
                'type' => Type::listOf($productType),
                'resolve' => [new ProductResolver(), 'getProducts']
            ],
            'order' => [
                'type' => $orderType,
                'args' => [
                    'id' => Type::nonNull(Type::string())
                ],
                'resolve' => [new OrderResolver(), 'getOrderById']
            ],
            'orders' => [
                'type' => Type::listOf($orderType),
                'resolve' => [new OrderResolver(), 'getOrders']
            ]
        ]
    ]),
    'mutation' => new ObjectType([
        'name' => 'Mutation',
        'fields' => [
            'createOrder' => [
                'type' => $orderType,
                'args' => [
                    'order_json' => Type::nonNull(Type::string()),
                ],
                'resolve' => [new OrderResolver(), 'createOrder']
            ]
        ]
    ])
]);

return $schema;
