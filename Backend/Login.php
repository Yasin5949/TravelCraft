<?php
session_start();
$host = "localhost";
$username = "root";
$password = "";
$db = "TravelCraftDB";
$conn = new mysqli($host, $username, $password, $db);
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $Email = $_POST["Email"];
    $password = $_POST["password"];
    $stmt = $conn->prepare("SELECT * FROM Users WHERE Email=?");
    $stmt->bind_param("s", $Email);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    $stmt->close();

    if ($user && password_verify($password, $user["hashedPassword"])) {
        $_SESSION['UserID'] = $user['UserID'];
        $_SESSION['firstName'] = $user['firstName'];
        $_SESSION['lastName'] = $user['lastName'];
        $_SESSION['Email'] = $user['Email'];
        echo "User Logged In";

        // Redirect to admin page
        header('Location: ../HTMLPages/Home.html');
        exit(); // Ensure script stops after redirection
    }
}
