<?php

class conexion
{

    const DSN = 'mysql:host=localhost;dbname=monfab;port=3306';


    const USER = 'root';
    const PASSWORD = '';
    public $connection;
    public function __construct()
    {
        try {
            $this->connection = new PDO(self::DSN, self::USER, self::PASSWORD);
            
        } catch (Exception $e) {
            echo "la linea de error es: " . $e->getMessage();
        }
    } 
}