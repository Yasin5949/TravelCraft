<?php
session_start();
$host = "localhost";
$username = "root";
$password = "Ya5in@astu##";
$dbname = "TravelCraftDB";

$conn = new mysqli($host, $username, $password, $dbname);
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["username"];
    $password = $_POST["password"];
    $stmt = $conn->prepare("SELECT * FROM TourAdmin WHERE AdminFirstName=?");
    $stmt->bind_param("s", $name);
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        $admin = $result->fetch_assoc();
        $stmt->close();

        if ($admin && password_verify($password, $admin["hashedPassword"])) {
            $_SESSION['AdminID'] = $admin['AdminID'];
            $_SESSION['AdminFirstName'] = $admin['AdminFirstName'];
            echo json_encode(["loggedIn" => "Logged IN"]);
            exit();
        } else {
            echo json_encode(["message" => "Wrong Credential"]);
            exit();
        }
    }
} else {
    echo json_encode(["error" => "Command Not Executed"]);
}
