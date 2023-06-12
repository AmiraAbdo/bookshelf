<?php

//die("HAMO");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once './vendor/autoload.php';
require_once './src/services/BaseService.class.php';
require_once './src/services/BookService.class.php';
require_once './src/services/BookshelfService.class.php';
require_once './src/services/UserService.class.php';
require_once './config.php';

// Flight::route('/', function () {
//     echo 'hello world!';
// });

// Flight::route('/rani', function () {
//     echo 'hello world Rani!';
// });

Flight::register('baseService', 'BaseService');
Flight::register('bookService', 'BookService');
Flight::register('bookshelfService', 'BookshelfService');
Flight::register('userService', 'userService');

// Flight::route('GET /bookshelf', function () {
//     $stmt = Flight::get("connection")->prepare("SELECT * FROM book;");
//     $stmt->execute();
//     Flight::json($stmt->fetchAll(PDO::FETCH_ASSOC));
// });

// Flight::route('GET /user', function () {
//     $stmt = Flight::get("connection")->prepare("SELECT * FROM book;");
//     $stmt->execute();
//     Flight::json($stmt->fetchAll(PDO::FETCH_ASSOC));
// });

Flight::route('/*', function () {

    Flight::map('query', function ($name, $default_value = "") {
        $request = Flight::request();
        $query_param = @$request->query->getData()[$name];
        $query_param = $query_param ? $query_param : $default_value;
        return urldecode($query_param);
    });


    //perform JWT decode

    $path = Flight::request()->url;
    if ($path == '/docs.json' || $path == '/login' || $path == '/register') {
        return TRUE;
    }

    $headers = getallheaders();
    if (@!$headers['Authorization']) {
        Flight::json(["message" => "Authorization is missing"], 403);
        return FALSE;
    } else {
        try {
            $decoded = (array)JWT::decode($headers['Authorization'], new Key(JWT_SECRET, 'HS256'));
            Flight::set('user', $decoded);
            return TRUE;
        } catch (\Exception $e) {
            Flight::json(["message" => "Authorization token is not valid"], 403);
            return FALSE;
        }
    }
});

require_once __DIR__ . '/src/routes/BookRoutes.php';
require_once __DIR__ . '/src/routes/BookshelfRoutes.php';
require_once __DIR__ . '/src/routes/UserRoutes.php';

Flight::start();
