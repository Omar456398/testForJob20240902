<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // 200 OK response
    http_response_code(200);
    exit();
}

require __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/src/schema.php';
use GraphQL\GraphQL;
use GraphQL\Type\Schema;

header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

$query = isset($input['query']) ? $input['query'] : '';
$variableValues = isset($input['variables']) ? $input['variables'] : null;

try {
    $schema = require __DIR__ . '/src/schema.php';
    $result = GraphQL::executeQuery($schema, $query, null, null, $variableValues);
    $output = $result->toArray();
} catch (\Exception $e) {
    $output = [
        'errors' => [
            [
                'message' => $e->getMessage()
            ]
        ]
    ];
}

echo json_encode($output);

