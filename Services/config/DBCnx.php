<?php

class DBCnx {

    private string $host;
    private string $user;
    private string $password;
    private string $charset ='utf8mb4';
    private string $db;

    protected $pdo;

    public function __construct($db) {

        $file = "configuration.ini";
        if ( !$file = parse_ini_file($file, true) ){
            echo "File wasn't able to open";
        }

        $this->host = $file['database_clubs_itesi']['host'];
        $this->user = $file['database_clubs_itesi']['username'];
        $this->password = $file['database_clubs_itesi']['password'];
        $this->db = $db;

    }

    protected function Connection () {
       try {
           $cnx = "mysql:host=".$this->host.";dbname=".$this->db;
           $this->pdo = new PDO($cnx, $this->user, $this->password);
           return $this->pdo;

       } catch (PDOException $err) {
           print "Error DB!: " . $err->getMessage() . "<br/>";
           die();
       }
    }

    protected function Disconnect() {
        try {
            $this->pdo = null;
            return $this->pdo;
        } catch (PDOException $err){
            die();
        }
    }

}