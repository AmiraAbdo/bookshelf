<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class BaseService
{
    protected $dao;
    public function __construct($dao)
    {
        $this->dao = $dao;
    }

    public function getAll()
    {
        return $this->dao->getAll();
    }

    public function getById($id)
    {
        return $this->dao->getById($id);
    }

    public function add($data)
    {
        return $this->dao->add($data);
    }

    public function update($id, $data)
    {
        return $this->dao->update($id, $data);
    }

    public function delete($id)
    {
        return $this->dao->delete($id);
    }
}
