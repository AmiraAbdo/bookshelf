<?php

class Database
{
    private static $instance;
    private $pdo;

    private function __construct()
    {
        $servername = getenv('BOOKSHELF_SERVERNAME');
        $username   = getenv('BOOKSHELF_USERNAME');
        $password   = getenv('BOOKSHELF_PASSWORD');
        $schema     = getenv('BOOKSHELF_SCHEMA');
        $port       = 25060;

        $this->pdo = new PDO("mysql:host=$servername;dbname=$schema;port=$port", $username, $password);
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public static function getInstance()
    {
        if (!self::$instance) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    public function getConnection()
    {
        return $this->pdo;
    }
}
