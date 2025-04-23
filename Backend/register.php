<?php
require 'dbConnection.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $Fname = $_POST['Fname'];
    $Lname = $_POST['Lname'];
    $Email = $_POST['email'];
    $Password = Password_hash($_POST['password'], PASSWORD_DEFAULT);
    $Confirm = $_POST['confirm'];
    $Role = 2;
}
if ($Password === $Confirm) {
    $sql = "insert into users(FirstName,LastName,Email,hashedPassword,RoleId)
    values('$Fname','$Lname','$Email','$Password','$Role')";
}
