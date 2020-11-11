<?php

namespace App\Models;

class User{


    public $Id;
    public $Name;
    public $Surname;
    public $Address;
    public $PostalCode;
    public $City;
    public $MobilePhone;
    public $Mail;
    public $Country;
    public $Gender;
    public $Login;
    public $Password;
    

    public function __construct($id, $name, $surname, $address, $postalCode, $city, $mobilePhone, $mail, $country, $gender, $login, $password){
        $this->Id = $id;
        $this->Name = $name;
        $this->Surname = $surname;
        $this->Address = $address;
        $this->PostalCode = $postalCode;
        $this->City = $city;
        $this->MobilePhone = $mobilePhone;
        $this->Mail = $mail;
        $this->Country = $country;
        $this->Gender = $gender;
        $this->Login = $login;
        $this->Password = $password;
    }

    public function toJson(){

        $user = array();
        foreach($this as $key => $value) {
            $user[$key] = $value;
        }
        return json_encode($user);
    }
}

