<?php

use GuzzleHttp\Client;
use GuzzleHttp\Handler\MockHandler;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Psr7\Response;
use PHPUnit\Framework\TestCase;

class LoginTest extends TestCase
{
    protected $client;

    protected function setUp(): void
    {
        $mock = new MockHandler([
            new Response(200, [], json_encode(['token' => 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJwYXNzd29yZCI6ImUxNmIyYWI4ZDEyMzE0YmY0ZWZiZDYyMDM5MDZlYTZjIiwiaWR1c2VyIjoxOH0.x4G6Jc3RpX78j2vjKAFQkE2isP-Sdj472WjtIfPWMrU'])),
        ]);

        $handlerStack = HandlerStack::create($mock);
        $this->client = new Client(['handler' => $handlerStack]);
    }

    public function testLoginEndpoint()
    {
        $data = [
            'username' => 'test',
            'password' => 'testpassword'
        ];
        $headers = [
            'Content-Type' => 'application/json'
        ];
        $body = json_encode($data);

        $response = $this->client->post('/src/login', ['headers' => $headers, 'body' => $body]);

        $this->assertEquals(200, $response->getStatusCode());

        $responseBody = json_decode($response->getBody(), true);
        $this->assertArrayHasKey('token', $responseBody);
        $this->assertEquals('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJwYXNzd29yZCI6ImUxNmIyYWI4ZDEyMzE0YmY0ZWZiZDYyMDM5MDZlYTZjIiwiaWR1c2VyIjoxOH0.x4G6Jc3RpX78j2vjKAFQkE2isP-Sdj472WjtIfPWMrU', $responseBody['token']);

    }
}
