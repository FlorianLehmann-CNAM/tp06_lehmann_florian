<?php

namespace App\Controllers;


use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use App\Models\User;
use Firebase\JWT\JWT;

class UserController{
   
    private $container;
    const JWT_SECRET = "FautVraimentPasPousserLeBouchonTropLoinMaurice";


    // constructor receives container instance
    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }
 
    public function login(ServerRequestInterface $request, ResponseInterface $response, array $args) : ResponseInterface{

        $login = $request->getQueryParams()['login'];
        $password = $request->getQueryParams()['password'];
        $dateTime = time();
        $expirationTime = $dateTime + 60; // 60s of validity 
        
        $jwtPayload = array(
            "userId" => 1,
            "iat" => $dateTime,
            "exp" => $expirationTime
        );
        
        $token_jwt = JWT::encode($jwtPayload, JWT_SECRET, "HS256");

        $response = $response
            ->withHeader("Authorization", "{$token_jwt}")
            ->withHeader("Content-Type", "application/json");
        
        return $response->write(json_encode(array(
            "success" => true,
            "user" => [
                "id" => 1,
                "login" => $login,
                "password" => $password
            ],
        )));
    }

    public function register(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface{
        
        $value = json_decode($request->getBody());
        $user = new User(1, $value->Name, $value->Surname, $value->Address, $value->PostalCode, $value->City, $value->MobilePhone, $value->Mail, $value->Country, $value->Gender, $value->Login, $value->Password);
        // do something with $user

        //return data
        return $response->write($user->toJson());
    }

 
}