<?php
$host = "localhost";
$username = "root";
$password = "Ya5in@astu##";
$dbname = "TravelCraftDB";

$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Failed!");
}
$sql = "SELECT * FROM Users";
$stmt = $conn->prepare($sql);
$stmt->execute();
$result = $stmt->get_result();
$users = $result->fetch_all(MYSQLI_ASSOC);
echo json_encode($users);
