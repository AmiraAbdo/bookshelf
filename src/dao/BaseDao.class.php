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
        $servername = 'db-mysql-fra1-48254-do-user-12209601-0.b.db.ondigitalocean.com';
        $username   = 'doadmin';
        $password   = 'AVNS_5FL0VAwliaL9FttmarH';
        $schema     = 'defaultdb';
        $port       = 25060;

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
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table . " WHERE id" . $this->table . " = :id");
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

    /**radi */
    public function update($id, $data)
    {
        $query = "UPDATE " . $this->table . " SET ";
        foreach ($data as $name => $value) {
            $query .= $name . "= :" . $name . ", ";
        }
        $query = substr($query, 0, -2);
        $query .= " WHERE id" . $this->table . " = :id";

        $stmt       = $this->conn->prepare($query);
        $data['id'] = $id;
        $stmt->execute($data);
    }

    public function delete($id)
    {
        $stmt = $this->conn->prepare("DELETE FROM " . $this->table . " WHERE id" . $this->table . "=:id");
        $stmt->bindParam(':id', $id); // SQL injection prevention
        $stmt->execute();
    }
}
