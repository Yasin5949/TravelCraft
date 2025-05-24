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

if (isset($_GET['query'])) {
    $query = $_GET['query'];
    $sql = "SELECT * FROM Tours WHERE TourName LIKE ?";
    $stmt = $conn->prepare($sql);
    $searchTerm = "%" . $query . "%";
    $stmt->bind_param("s", $searchTerm);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        echo json_encode(["message" => "No tours found"]);
    } else {
        echo json_encode($result->fetch_all(MYSQLI_ASSOC));
    }
} else {
    echo json_encode(["error" => "No search query provided"]);
}
