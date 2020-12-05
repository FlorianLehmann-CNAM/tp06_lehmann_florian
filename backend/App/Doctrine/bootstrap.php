<?php
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
date_default_timezone_set('America/Lima');
require_once __DIR__ . "/../../vendor/autoload.php";
$isDevMode = true;
$config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/config/yaml"), $isDevMode);
$conn = array(
'driver' => 'pdo_mysql',
'user' => 'root',
'password' => 'value=42',
'dbname' => 'cnam_met02',
'port' => '3306'
);
$entityManager = EntityManager::create($conn, $config);
$repo = $entityManager->getRepository('User');