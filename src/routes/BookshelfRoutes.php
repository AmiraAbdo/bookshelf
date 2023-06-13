<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

Flight::route('GET /bookshelf', function () {
    $user = Flight::get('user');
    if (isset($user['username'])) {
        Flight::json(Flight::bookshelfService()->getAll());
    }
});

Flight::route('GET /bookshelf/@id', function ($id) {
    $user = Flight::get('user');
    if (isset($user['username'])) {
        if (Flight::bookshelfService()->getById($id) != null) {
            Flight::json(Flight::bookshelfService()->getById($id));
        } else {
            Flight::json(["message" => "bookshelf with this id doesnt exist"]);
        }
    }
});

Flight::route('GET /bookshelf/search/@search', function ($params) {
    $user = Flight::get('user');
    if (isset($user['username'])) {
        Flight::json(Flight::bookshelfService()->search($params));
    }
});

Flight::route('POST /bookshelf', function () {
    $user            = Flight::get('user');
    $data            = Flight::request()->data->getData();
    $data['user_id'] = $user['iduser'];
    // exit;
    if (isset($user['username'])) {
        Flight::json(Flight::bookshelfService()->add($data));
    }
});

Flight::route('PUT /bookshelf/@id', function ($id) {
    $user = Flight::get('user');
    if (isset($user['username'])) {
        $data       = Flight::request()->data->getData();
        $bookshelf  = Flight::bookshelfService()->getById($id);
        $name       = $bookshelf['name'];
        if (Flight::bookshelfService()->getById($id) != null) {
            Flight::bookshelfService()->update($id, $data);
            Flight::json(["message" => $name . " updated"]);
        } else {
            Flight::json(["message" => "bookshelf with this id doesnt exist"]);
        }
    }
});

Flight::route('DELETE /bookshelf/@id', function ($id) {
    $user = Flight::get('user');
    if (isset($user['username'])) {
        $bookshelf  = Flight::bookshelfService()->getById($id);
        $name       = $bookshelf['name'];
        if (Flight::bookshelfService()->getById($id) != null) {
            Flight::bookshelfService()->delete($id);
            Flight::json(["message" => $name . " deleted"]);
        } else {
            Flight::json(["message" => "bookshelf with this id doesnt exist"]);
        }
    }
});

Flight::route('GET /bookshelf/books/@id', function ($id) {
    $user = Flight::get('user');
    if (isset($user['username'])) {
        Flight::json(Flight::bookshelfService()->getBooks($id));
    }
});

Flight::route('GET /bookshelf/user/@id', function ($id) {
    // $user = Flight::get('user');
    $bookshelf = Flight::bookshelfService()->getByUserId($id);
    Flight::json($bookshelf);
});
