<?php

class Book
{
    public $title;
    public $author;
    public $genre;
    public $year;
    public $synopsis;
    public $NYT_bestseller = 0;
    public $created_by;

    public function __construct($array)
    {
        foreach($array as $key => $value) {
            $this->$key = $value;
        }
    }

    public function title($title)
    {
        $this->title = $title;
        return $this;
    }

    public function author($author)
    {
        $this->author = $author;
        return $this;
    }

    public function genre($genre)
    {
        $this->genre = $genre;
        return $this;
    }

    public function year($year)
    {
        $this->year = $year;
        return $this;
    }

    public function synopsis($synopsis)
    {
        $this->synopsis = $synopsis;
        return $this;
    }

    public function NYT_bestseller($NYT_bestseller)
    {
        $this->NYT_bestseller = $NYT_bestseller;
        return $this;
    }

    public function created_by($created_by)
    {
        $this->created_by = $created_by;
        return $this;
    }

    public function build()
    {
        return $this;
    }

    public function getById($id)
    {

    }
}
