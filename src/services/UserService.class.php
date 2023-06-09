<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/BaseService.class.php';
require_once __DIR__ . '/../dao/UserDao.class.php';

class UserService extends BaseService
{
    public function __construct()
    {
        parent::__construct(new UserDao());
    }

    public function getByUsername($username)
    {
        return $this->dao->getByUsername($username);
    }

    public function login($data)
    {
        return $this->dao->login($data);
    }

    public function register($data)
    {
        return $this->dao->register($data);
    }
}
