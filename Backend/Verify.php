<?php
session_start();
$host = "localhost";
$username = "root";
$password = "Ya5in@astu##";
$dbname = "TravelCraftDB";

$conn = new mysqli($host, $username, $password, $dbname);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $Email = $_SESSION["email"];
    $verificationCode = $_POST["verificationCode"];

    $stmt = $conn->prepare("SELECT * FROM PendingUsers WHERE Email = ? AND verificationCode = ?");
    $stmt->bind_param("si", $Email, $verificationCode);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {

        $row = $result->fetch_assoc();
        $stmt = $conn->prepare("INSERT INTO Users (firstName, lastName, Email, hashedPassword, ProfilePicture) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $row['firstName'], $row['lastName'], $row['Email'], $row['hashedPassword'], $row['ProfilePicture']);
        $stmt->execute();

        $stmt = $conn->prepare("DELETE FROM PendingUsers WHERE Email = ?");
        $stmt->bind_param("s", $Email);
        $stmt->execute();

        echo json_encode(["Verified" => "User registered successfully!"]);
    } else {
        echo json_encode(["misMatch" => "Invalid verification code!"]);
    }
}
