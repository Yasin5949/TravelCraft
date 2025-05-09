<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require_once 'dbConnection.php';
$db = new Database();
$conn = $db->getConnection();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $Fname = $_POST['Fname'];
    $Lname = $_POST['Lname'];
    $Email = $_POST['email'];
    $Password = $_POST['password'];
    $Confirm = $_POST['confirm'];
    $Role = 2;
    if ($password !== $Confirm) {
        die("Password do not match");
    }
    $hashedPassword = Password_hash($_POST['password'], PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO users(FirstName,LastName,Email,hashedPassword,RoleId) values(?,?,?,?,?)");
    $stmt->bind_param("ssssi", $Fname, $Lname, $Email, $hashedPassword, $Role);
    if ($stmt->execute()) {
        echo "Registered successful";
    } else {
        echo "Password Don't Match" . $stmt->error;
    }
    $stmt->close();
    $conn->close();
}
