<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/BookshelfDao.class.php';


class BookshelfService extends BaseService
{
    public function __construct()
    {
        parent::__construct(new BookshelfDao());
    }

    public function search($params)
    {
        return $this->dao->search($params);
    }

    public function getBooks($bookshelf_id)
    {
        return $this->dao->getBooks($bookshelf_id);
    }

    public function getByUserId($user_id)
    {
        return $this->dao->getByUserId($user_id);
    }
}
