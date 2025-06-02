<?php
header('Content-Type: application/json');
session_start();
$host = "localhost";
$username = "root";
$password = "Ya5in@astu##";
$dbname = "TravelCraftDB";

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed: " . $conn->connect_error]));
}

$sql = "SELECT 
    u.UserID,
    u.firstName,  
    b.BookedAt,
    b.BookingStatus,
    b.BookedFor,
    b.EndingDate,
    b.Total,
    b.BookingID,
    t.TourName,
    t.Region,
    t.TourImage
    FROM Users u 
    INNER JOIN Booking b ON u.UserID = b.UserID
    INNER JOIN Tours t ON b.TourID = t.TourID
    ";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    die(json_encode(["error" => "failed: " . $conn->error]));
}
$stmt->execute();
$result = $stmt->get_result();

$response = [];

if ($result->num_rows === 0) {
    $response = ["message" => "No bookings found"];
} else {
    $response = $result->fetch_all(MYSQLI_ASSOC);
}

echo json_encode($response);

$stmt->close();
$conn->close();
