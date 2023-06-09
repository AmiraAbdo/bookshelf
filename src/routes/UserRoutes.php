<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

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

// Flight::route('GET /user/username/@username', function ($username) {
//     if (Flight::userService()->getByUsername($username) != null) {
//         Flight::json(Flight::userService()->getByUsername($username));
//     } else {
//         Flight::json(["message" => "user with this username doesnt exist"]);
//     }
// });

Flight::route('POST /login', function () {
    $data = Flight::request()->data->getData();
    $user = Flight::userService()->getByUsername($data['username']);
    if ($user != null) {
        if ($user['password'] == $data['password']) {
            Flight::json("brao");
        } else {
            Flight::json(["message" => "wrong password"]);
        }
    } else {
        Flight::json(["message" => "user with this username doesnt exist"]);
    }
});
