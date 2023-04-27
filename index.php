<?php

//die("HAMO");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once './vendor/autoload.php';
require_once './src/services/BaseService.class.php';
require_once './src/services/BookService.class.php';

Flight::route('/', function () {
    echo 'hello world!';
});

Flight::route('/rani', function () {
    echo 'hello world Rani!';
});

Flight::register('baseService', 'BaseService');
Flight::register('bookService', 'BookService');

Flight::route('GET /book/@id', function ($id) {
    $stmt = Flight::get("connection")->prepare("SELECT * FROM book WHERE book_id = :id;");
    $stmt->execute(['id' => $id]);
    Flight::json($stmt->fetchAll(PDO::FETCH_ASSOC));
});

Flight::route('GET /bookshelf', function () {
    $stmt = Flight::get("connection")->prepare("SELECT * FROM book;");
    $stmt->execute();
    Flight::json($stmt->fetchAll(PDO::FETCH_ASSOC));
});

Flight::route('GET /user', function () {
    $stmt = Flight::get("connection")->prepare("SELECT * FROM book;");
    $stmt->execute();
    Flight::json($stmt->fetchAll(PDO::FETCH_ASSOC));
});

require_once __DIR__ . '/src/routes/BookRoutes.php';

Flight::start();
