<?php

use GuzzleHttp\Client;
use GuzzleHttp\Handler\MockHandler;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Psr7\Response;
use PHPUnit\Framework\TestCase;

class GetBookByIDTest extends TestCase {

    protected $client;

    protected function setUp(): void {
        $mock = new MockHandler([
            new Response(200, [], json_encode( [
                "idbook" => 1, 
                "title" => "romeo and juliet", 
                "author" => "william shakespeare", 
                "genre" => "drama", 
                "year" => 1600, 
                "synopsis" => "a tragic story of two star-crossed lovers", 
                "NYT_bestseller" => 0, 
                "created_by" => 2, 
                "img" => "romeojuliet.jpg" 
             ])),
        ]);

        $handlerStack = HandlerStack::create($mock);
        $this->client = new Client(['handler' => $handlerStack]);
    }

    public function testGetBookEndpoint() {
        $response = $this->client->get('/book/1');

        $this->assertEquals(200, $response->getStatusCode());

        $data = json_decode($response->getBody(), true);

        $this->assertEquals(1, $data['idbook']);
        $this->assertEquals('romeo and juliet', $data['title']);
        $this->assertEquals('william shakespeare', $data['author']);
        $this->assertEquals('drama', $data['genre']);
        $this->assertEquals(1600, $data['year']);
        $this->assertEquals('a tragic story of two star-crossed lovers', $data['synopsis']);
        $this->assertEquals(0, $data['NYT_bestseller']);
        $this->assertEquals(2, $data['created_by']);
        $this->assertEquals('romeojuliet.jpg', $data['img']);
    }
}