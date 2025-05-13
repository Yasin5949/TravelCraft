<?php
require_once "dbConnection";
$db = new Database();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $conn = $db->getConnection();
    $Fname = $_POST['firstName'];
    $Lname = $_POST['lastName'];
    $Email = $_POST['Email'];
    $password = $_POST['password'];
    $confirm = $_POST['confirm'];
    $hashedPassword = Password_hash($_POST['password'], PASSWORD_DEFAULT);
    if ($confirm === $password) {
        $stmt = $conn->prepare("INSERT INTO Users(firstName,lastName,Email,hashedPassword) values(?,?,?,?)");
        $stmt->bind_param("ssss", $Fname, $Lname, $Email, $hashedPassword);
        $stmt->execute();
        echo " user Registered Successfully";
        header("Location: ../HTMLPages/Login.html");
    } else {
        echo "Password Do Not Match";
        header("Location: ../HTMLPages/Register.html");
    }
}
