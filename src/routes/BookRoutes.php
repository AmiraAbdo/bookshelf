<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require './Book.php';

/**mora bit neki bolji nacin za ovo
 *
 * potencijalno onaj /*
 */

Flight::route('GET /book', function () {
    $user = Flight::get('user');
    if (isset($user['username'])) {
        Flight::json(Flight::bookService()->getAll());
    }
});

Flight::route('GET /book/@id', function ($id) {
    $user = Flight::get('user');
    if (isset($user['username'])) {
        if (Flight::bookService()->getById($id) != null) {
            Flight::json(Flight::bookService()->getById($id));
        } else {
            Flight::json(["message" => "book with this id doesnt exist"]);
        }
    }
});

Flight::route('GET /book/isbn/@isbn', function ($isbn) {
    Flight::json(Flight::bookService()->getByISBN($isbn));
});

Flight::route('GET /book/search/@search', function ($params) {
    $user = Flight::get('user');
    if (isset($user['username'])) {
        Flight::json(Flight::bookService()->search($params));
    }
});

Flight::route('POST /book', function () {
    $user = Flight::get('user');
    if (isset($user['username'])) {
        Flight::json(Flight::bookService()->add(Flight::request()->data->getData()));
    }
});

Flight::route('PUT /book/@id', function ($id) {
    $user = Flight::get('user');
    if (isset($user['username'])) {
        $data = Flight::request()->data->getData();
        $book = new Book(Flight::bookService()->getById($id));
        foreach ($data as $key => $val) {
            $book->$key($val)
                ->build();
        }

        if (Flight::bookService()->getById($id) != null) {
            Flight::bookService()->update($id, $data);
            Flight::json(["message" => $book->title . " updated"]);
        } else {
            Flight::json(["message" => "book with this id doesnt exist"]);
        }
    }
});

Flight::route('DELETE /book/@id', function ($id) {
    $user = Flight::get('user');
    if (isset($user['username'])) {
        $book  = Flight::bookService()->getById($id);
        $title = $book['title'];
        if (Flight::bookService()->getById($id) != null) {
            Flight::bookService()->delete($id);
            Flight::json(["message" => $title . " deleted"]);
        } else {
            Flight::json(["message" => "book with this id doesnt exist"]);
        }
    }
});
