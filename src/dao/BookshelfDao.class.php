<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once dirname(__FILE__) . "/BaseDao.class.php";

class BookshelfDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct('bookshelf');
    }

    public function search($params)
    {
        return $this->queryNoParams("SELECT * FROM bookshelf WHERE author LIKE '%" . $params . "%' OR title LIKE '%" . $params . "%'");
    }

    public function getBooks($idbookshelf)
    {
        $query = "SELECT b.title, b.author, b.genre, b.year, b.synopsis, b.NYT_bestseller, b.created_by, b.idbook from book b
        JOIN book_bookshelf bb ON bb.book_id = b.idbook
        JOIN  bookshelf b2 ON b2.idbookshelf = bb.bookshelf_id
        WHERE b2.idbookshelf = :idbookshelf
        GROUP BY (b.idbook);";
        return $this->queryParams($query, ['idbookshelf' => $idbookshelf]);
    }

    public function getByUserId($iduser)
    {
        $query = "SELECT * FROM bookshelf b WHERE user_id = :iduser";
        return $this->queryParams($query, ['iduser' => $iduser]);
    }
}
