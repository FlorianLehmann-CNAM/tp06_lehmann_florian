<?php 

namespace App\Controllers;


use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use App\Models\User;
use Firebase\JWT\JWT;

class JWTController{

    public static function createJWT(ResponseInterface $response) : ResponseInterface{
        $dateTime = time();
        $expirationTime = $dateTime + 180; // 180s of validity 
        
        $jwtPayload = array(
            "userId" => 1,
            "iat" => $dateTime,
            "exp" => $expirationTime
        );
        
        $token_jwt = JWT::encode($jwtPayload, JWT_SECRET, "HS256");

        $response = $response
            ->withHeader("Authorization", "Bearer {$token_jwt}");

        return $response;
    }
}