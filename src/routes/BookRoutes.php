<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

Flight::route('GET /book', function(){
    Flight::json(Flight::bookService()->getAll());
});

Flight::route('GET /book/@id', function($id){
    Flight::json(Flight::bookService()->getById($id));
});