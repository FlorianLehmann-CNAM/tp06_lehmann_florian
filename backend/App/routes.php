<?php

use Slim\App;
use App\Middleware\CorsMiddleware;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Firebase\JWT\JWT;

const JWT_SECRET = "CeciEstUnSecretVraimentLongVirguleTellementLongQuilDevientDifficileADecoderPoint";


return function (App $app) {
    
    
    $jwt = new Tuupola\Middleware\JwtAuthentication([
        "path" => "/",
        "secret" => JWT_SECRET,
        "ignore" => ["/user/login", "/user/register", "/products"],
        "secure" => false,
        "attribute" => "decoded_token_data",
        "algorithm" => ["HS256"],
        "error" => function ($response, $args){
            $data = array('jwtError' => true);
            return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
        }
    ]);

    $app->add(CorsMiddleware::class);
    $app->add($jwt);

    $app->get('/products', function($request, $response){
        $string = file_get_contents("../public/assets/Products.json");
        return $response->write($string);
    });
    $app->group('/user', function () {
        $this->get('/login', "App\Controllers\UserController:login");
        $this->post('/register', "App\Controllers\UserController:register");
    });

};
