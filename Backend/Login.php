<?php
session_start();
$host = "localhost";
$username = "root";
$password = "Ya5in@astu##";
$db = "TravelCraftDB";
$conn = new mysqli($host, $username, $password, $db);
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $Email = $_POST["Email"];
    $password = $_POST["password"];
    $stmt = $conn->prepare("SELECT UserID, firstName, lastName, Email, Privilege, ProfilePicture, hashedPassword FROM Users WHERE Email=?");
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
        $_SESSION['Privilege'] = $user['Privilege'];
        $_SESSION['ProfilePicture'] = $user['ProfilePicture'];
        echo json_encode(["Logged" => "User Logged In"]);
    } else {
        echo json_encode(["misMatch" => "Wrong Password"]);
    }
}
