<?php
$host = "localhost";
$username = "root";
$password = "Ya5in@astu##";
$dbname = "TravelCraftDB";

$conn = new mysqli($host, $username, $password, $dbname);
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $Fname = $_POST['firstName'];
    $Lname = $_POST['lastName'];
    $password = $_POST['password'];
    $confirm = $_POST['confirm'];
    $adminPassword = $_POST['oldAdmin'];
    $check = $conn->prepare("SELECT hashedPassword FROM TourAdmin WHERE AdminID=1");
    $check->execute();
    $result = $check->get_result();
    $admin = $result->fetch_assoc();
    $check->close();
    if ($admin && password_verify($adminPassword, $admin['hashedPassword'])) {
        if ($confirm === $password) {
            $hashedPassword = password_hash($_POST['password'], PASSWORD_DEFAULT);
            $stmt = $conn->prepare("UPDATE TourAdmin SET AdminFirstName = ?, AdminLastName = ?, hashedPassword = ? WHERE AdminID=1");
            $stmt->bind_param("sss", $Fname, $Lname, $hashedPassword);
            $stmt->execute();
            echo json_encode(["Changed" => "Admin Changed"]);
        } else {
            echo json_encode(["misMatch" => "Password Don't Match"]);
        }
    } else {
        echo json_encode(["notAdmin" => "Wrong Admin Password"]);
    }
}
