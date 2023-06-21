<?php

use GuzzleHttp\Client;
use GuzzleHttp\Handler\MockHandler;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Psr7\Response;
use PHPUnit\Framework\TestCase;

class AddBookshelfTest extends TestCase
{
    protected $client;

    protected function setUp(): void
    {
        $mock = new MockHandler([
            new Response(200, [], json_encode(['name' => 'MyNewBookshelf', 'description' => 'This is my new bookshelf.', 'user_id' => '18', 'id' => 'some_id_value' ])),
        ]);

        $handlerStack = HandlerStack::create($mock);
        $this->client = new Client(['handler' => $handlerStack]);
    }

    public function testPostBookshelfEndpoint()
    {
        $data = [
            'name' => 'MyNewBookshelf',
            'description' => 'This is my new bookshelf.'
        ];
        $headers = [
            'Content-Type' => 'application/json',
            'Authorization' => 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJwYXNzd29yZCI6ImUxNmIyYWI4ZDEyMzE0YmY0ZWZiZDYyMDM5MDZlYTZjIiwiaWR1c2VyIjoxOH0.x4G6Jc3RpX78j2vjKAFQkE2isP-Sdj472WjtIfPWMrU'
        ];
        $body = json_encode($data);

        $response = $this->client->post('/src/bookshelf', ['headers' => $headers, 'body' => $body]);

        $this->assertEquals(200, $response->getStatusCode());

        $responseBody = json_decode($response->getBody(), true);
        $this->assertArrayHasKey('id', $responseBody);
        $this->assertEquals($data['name'], $responseBody['name']);
        $this->assertEquals($data['description'], $responseBody['description']);
        $this->assertEquals('18', $responseBody['user_id']); #the token sent in headers is of a user with id 18
    }
}
