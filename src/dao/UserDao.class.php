<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once dirname(__FILE__) . "/BaseDao.class.php";

class UserDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct('user');
    }

    public function getByUsername($username)
    {
        return $this->oneRow("SELECT username, password, iduser FROM user WHERE username = :username", ["username" => $username]);
    }

    public function register($data)
    {

        if ($this->getByUsername($data['username']) != null) {
            Flight::json(['status' => 'error', 'message' => 'Username is taken']);
            exit;
        }

        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            $emailErr = "Invalid email format";
            Flight::json(['status' => 'error', 'message' => $emailErr]);
            exit;
        }

        if (strlen($data['password']) < 8) {
            Flight::json(['status' => 'error', 'message' => 'Password is not long enough: must be at least 8 characters long']);
            exit;
        }
        $data['password'] = md5($data['password']);

        return $data;
    }
}
