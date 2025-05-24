<?php
header('Content-Type: application/json');

$host = "localhost";
$username = "root";
$password = "Ya5in@astu##";
$dbname = "TravelCraftDB";

$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed: " . $conn->connect_error]));
}


$sql = "SELECT * FROM Tours";
$stmt = $conn->prepare($sql);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows === 0) {
    echo json_encode(["message" => "No tours found"]);
} else {
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}
