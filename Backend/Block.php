<?php
$host = "localhost";
$username = "root";
$password = "Ya5in@astu##";
$dbname = "TravelCraftDB";

$conn = new mysqli($host, $username, $password, $dbname);
if (isset($_GET['query'])) {
    $query = $_GET['query'];
    $sql = "UPDATE Users SET Privilege='Blocked' WHERE UserID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $query);
    if ($stmt->execute()) {
        echo json_encode(["message" => "User Blocked!"]);
    } else {
        echo json_encode(["message" => "User Not Blocked!"]);
    }
} else {
    echo json_encode(["error" => "No search query provided"]);
}
