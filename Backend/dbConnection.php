<?php
class Database
{
    private $host = "localhost";
    private $username = "root";
    private $password = "Ya5in@astu##";
    private $database = "TravelCraftDB";
    private $conn;
    public function __constructor()
    {
        $this->conn = new mysqli($this->host, $this->username, $this->password, $this->database);
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->cconnect->error);
        }
    }
    public function getConnection()
    {
        return $this->conn;
    }
}
