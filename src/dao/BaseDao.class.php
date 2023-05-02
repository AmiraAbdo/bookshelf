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
        $servername = getenv('BOOKSHELF_SERVERNAME');
        $username = getenv('BOOKSHELF_USERNAME');
        $password = getenv('BOOKSHELF_PASSWORD');
        $schema = getenv('BOOKSHELF_SCHEMA');
        $port = 25060;

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

    public function getById($id)
    {
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table . " WHERE " . $this->table . "_id = :id");
        $stmt->execute(['id' => $id]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return reset($result); //first element of array
    }

    public function queryNoParams($query)
    {
        $stmt = $this->conn->query($query);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function queryParams($query, $params)
    {
        $stmt = $this->conn->prepare($query);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function add($data)
    {
        {
            $query = "INSERT INTO " . $this->table . " (";
            foreach ($data as $column => $value) {
                $query .= $column . ", ";
            }
            $query = substr($query, 0, -2);
            $query .= ") VALUES (";
            foreach ($data as $column => $value) {
                $query .= ":" . $column . ", ";
            }
            $query = substr($query, 0, -2);
            $query .= ")";

            $stmt = $this->conn->prepare($query);
            $stmt->execute($data); // sql injection prevention
            $data['id'] = $this->conn->lastInsertId();
            return $data;
        }
    }
}
