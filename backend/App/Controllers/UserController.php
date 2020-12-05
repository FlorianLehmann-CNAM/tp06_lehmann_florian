<?php

namespace App\Controllers;


use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use App\Controllers\JWTController;
use User;
use Firebase\JWT\JWT;


class UserController{
   
    private $container;
    const JWT_SECRET = "MET-02";


    // constructor receives container instance
    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    
 
    public function login(ServerRequestInterface $request, ResponseInterface $response, array $args) : ResponseInterface{

        require_once __DIR__ . '/../Doctrine/bootstrap.php';


        $login = $request->getQueryParams()['login'];
        $password = $request->getQueryParams()['password'];

        $userRepo = $entityManager->getRepository('User');
        $userExist = $userRepo->findOneBy(array("login" => $login, "password" => $password));

        $response = JWTController::createJwt($response);

        if($userExist){
            return $response->write(json_encode(array(
                "success" => true,
                "user" => [
                    "id" => $userExist->getId(),
                    "name" => $userExist->getName(),
                    "surname" => $userExist->getSurname(),
                    "mail" => $userExist->getMail()
                ],
            )));
        }
        else{
            return $response->withStatus(404);
        }
        
        
    }

    public function register(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface{
        
        require_once __DIR__ . '/../Doctrine/bootstrap.php';


        $value = json_decode($request->getBody());
        $userRepo = $entityManager->getRepository('User');
        $userExists = $userRepo->findOneBy(array("login" => $value->Login, "name" => $value->Name));
        
        if(!$userExists){
            $user = new User;
            $user->setName($value->Name);
            $user->setSurname($value->Surname);
            $user->setAddress($value->Address);
            $user->setPostalCode($value->PostalCode);
            $user->setCity($value->City);
            $user->setMobilePhone($value->MobilePhone);
            $user->setMail($value->Mail);
            $user->setCountry($value->Country);
            $user->setGender($value->Gender);
            $user->setLogin($value->Login);
            $user->setPassword($value->Password);

            $entityManager->persist($user);
            $entityManager->flush();

            return $response->write($request->getBody());
        }
        else{
            return $response
                    ->withStatus(401);

        }

     
        
        //return data

    }

 
}