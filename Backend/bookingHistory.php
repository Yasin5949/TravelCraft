<?php
session_start();
if (!isset($_SESSION["UserID"])) {
    echo json_encode(["error" => "User not logged in"]);
    exit();
}

$host = "localhost";
$username = "root";
$password = "";
$dbname = "TravelCraftDB";

$conn = new mysqli($host, $username, $password, $dbname);


if ($conn->connect_error) {
    echo json_encode(["error" => "Database connection failed"]);
    exit();
}
$userID = $_SESSION["UserID"];
$sql = "SELECT * FROM Booking WHERE UserID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userID);
$stmt->execute();
$result = $stmt->get_result();
$bookings = [];
while ($row = $result->fetch_assoc()) {
    $bookings[] = $row;
}
if (!empty($bookings)) {
    echo json_encode(["bookings" => $bookings]);
} else {
    echo json_encode(["error" => "No bookings found"]);
}
$stmt->close();
$conn->close();
