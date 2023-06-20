<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use Firebase\JWT\JWT;

// use Firebase\JWT\Key;

Flight::route('GET /user', function () {
    Flight::json(Flight::userService()->getAll());
});

Flight::route('GET /user/@id', function ($id) {
    if (Flight::userService()->getById($id) != null) {
        Flight::json(Flight::userService()->getById($id));
    } else {
        Flight::json(["message" => "user with this id doesnt exist"]);
    }
});

Flight::route('POST /login', function () {
    $data = Flight::request()->data->getData();
    $user = Flight::userService()->getByUsername($data['username']);
    if ($user != null) {
        if ($user['password'] == md5($data['password'])) {
            // Flight::json("yay");
            $jwt = JWT::encode($user, getenv('JWT_SECRET'), 'HS256');
            Flight::json(['token' => $jwt]);
        } else {
            Flight::json(["message" => "wrong password"]);
        }
    } else {
        Flight::json(["message" => "user with this username doesnt exist"]);
    }
});

Flight::route('POST /register', function () {
    $data    = Flight::request()->data->getData();
    $newUser = Flight::userService()->register($data);
    if ($newUser != null) {
        // $test = Flight::userService()->add($newUser);
        $newUser           = Flight::userService()->add($newUser);
        $newUser['iduser'] = $newUser['id'];
        $jwt               = JWT::encode($newUser, getenv('JWT_SECRET'), 'HS256');
        Flight::json(['token' => $jwt]);
    }
});
