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
            new Response(200, [], json_encode(['message' => 'book with this id doesnt exist'])),
        ]);

        $handlerStack = HandlerStack::create($mock);
        $this->client = new Client(['handler' => $handlerStack]);
    }

    public function testStatusEndpoint() {
        $response = $this->client->get('/book/@id');

        $this->assertEquals(200, $response->getStatusCode());

        $data = json_decode($response->getBody(), true);
        $this->assertArrayHasKey('message', $data);
        $this->assertEquals('book with this id doesnt exist', $data['message']);
    }
}