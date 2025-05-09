<?php
session_start();
require_once "dbConnection.php";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $Email = $_POST['email'];
    $Password = Password_hash($_POST['password'], PASSWORD_DEFAULT);
    $db = new Database();
    $conn = $db->getConnection();
    $stmt = $conn->prepare("select UserId,hashedPassword from users where Email=?");
    $stmt->bind_param("s", $Email);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($UserId, $hashedPassword);
        $stmt->fetch();
        if (password_verify($password, $hashedPassword)) {
            $_SESSION["UserId"] = $UserId;
            echo "Login successful";
        } else {
            echo "invalid password";
        }
    } else {
        echo "user not found";
    }
    $stmt->close();
    $conn->close();
}
