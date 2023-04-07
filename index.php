<?php
//die("HAMO");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require './vendor/autoload.php';

$servername = "";
$username = "";
$password = "";
$schema = "";
$port = "";
$conn = new PDO("mysql:host=$servername;dbname=$schema;port=$port", $username, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
Flight::set("connection", $conn);

Flight::route('/', function () {
  echo 'hello world!';
});

Flight::route('/rani', function () {
  echo 'hello world Rani!';
});

Flight::route('GET /book', function () {
  $stmt = Flight::get("connection")->prepare("SELECT * FROM book;");
  $stmt->execute();
  Flight::json($stmt->fetchAll(PDO::FETCH_ASSOC));
});

Flight::route('GET /book/@id', function ($id) {
  $stmt = Flight::get("connection")->prepare("SELECT * FROM book WHERE book_id = :id;");
  $stmt->execute(['id'=>$id]);
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

Flight::start();
