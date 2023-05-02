<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once dirname(__FILE__) . "/BaseDao.class.php";

class BookDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct('book');
    }

    public function getByISBN($isbn)
    {
        return $this->queryParams("SELECT * FROM book WHERE ISBN = :isbn", ["isbn" => $isbn]);
    }

    public function search($params)
    {
        return $this->queryNoParams("SELECT * FROM book WHERE author LIKE '%" . $params . "%' OR title LIKE '%" . $params . "%'");
    }
}
