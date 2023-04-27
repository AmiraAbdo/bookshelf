<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class BaseDao
{
    private $conn;
    private $table;

    public function __construct($table)
    {
        $servername = "";
        $username = "";
        $password = "";
        $schema = "";
        $port = "";
        $this->conn = new PDO("mysql:host=$servername;dbname=$schema;port=$port", $username, $password);
        $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->table = $table;
    }

    public function getAll()
    {
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}