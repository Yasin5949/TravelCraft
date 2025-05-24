<?php
session_start();
$host = "localhost";
$username = "root";
$password = "Ya5in@astu##";
$dbname = "TravelCraftDB";

$conn = new mysqli($host, $username, $password, $dbname);
if (isset($_GET['query'])) {
    $query = $_GET['query'];
    $UserID = $_SESSION['UserID'];
    $sql = "SELECT * FROM Canceled WHERE UserID=? AND BookingID=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $UserID, $query);
    $stmt->execute();
    $result = $stmt->get_result();
    $users = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($users);
} else {
    echo json_encode(["error" => "No search query provided"]);
}
