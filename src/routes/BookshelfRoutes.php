<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

Flight::route('GET /bookshelf', function () {
    Flight::json(Flight::bookshelfService()->getAll());
});

Flight::route('GET /bookshelf/@id', function ($id) {
    if (Flight::bookshelfService()->getById($id) != null) {
        Flight::json(Flight::bookshelfService()->getById($id));
    } else {
        Flight::json(["message" => "bookshelf with this id doesnt exist"]);
    }
});

Flight::route('GET /bookshelf/search/@search', function ($params) {
    Flight::json(Flight::bookshelfService()->search($params));
});

Flight::route('POST /bookshelf', function () {
    Flight::json(Flight::bookshelfService()->add(Flight::request()->data->getData()));
});

Flight::route('PUT /bookshelf/@id', function ($id) {
    $data       = Flight::request()->data->getData();
    $bookshelf  = Flight::bookshelfService()->getById($id);
    $name       = $bookshelf['name'];
    if (Flight::bookshelfService()->getById($id) != null) {
        Flight::bookshelfService()->update($id, $data);
        Flight::json(["message" => $name . " updated"]);
    } else {
        Flight::json(["message" => "bookshelf with this id doesnt exist"]);
    }
});

Flight::route('DELETE /bookshelf/@id', function ($id) {
    $data       = Flight::request()->data->getData();
    $bookshelf  = Flight::bookshelfService()->getById($id);
    $name       = $bookshelf['name'];
    if (Flight::bookshelfService()->getById($id) != null) {
        Flight::json(Flight::bookshelfService()->delete($id));
        Flight::json(["message" => $name . " deleted"]);
    } else {
        Flight::json(["message" => "bookshelf with this id doesnt exist"]);
    }
});

Flight::route('GET /bookshelf/books/@id', function ($id) {
    Flight::json(Flight::bookshelfService()->getBooks($id));
});
