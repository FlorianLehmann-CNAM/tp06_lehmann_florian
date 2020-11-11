<?php

namespace App\Middleware;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class JWTMiddleware{


    public function __invoke(Request $request, Response $response, callable $next){
        $response = $next($request, $response);
        $token = $request->getAttribute("decoded_token_data");
        $response = $response
            ->withHeader("Content-Type", "application/json")
            ->withJson($token);

        return $response;
    }
}