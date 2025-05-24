<?php
header('Content-Type: application/json');
$host = "localhost";
$username = "root";
$password = "Ya5in@astu##";
$dbname = "TravelCraftDB";
$conn = new mysqli($host, $username, $password, $dbname);
if (isset($_GET['query'])) {
    $RequestID = $_GET['query'];
    $stmtCheck = $conn->prepare("UPDATE CallRequest SET RequestStatus='Responded' WHERE RequestID=? ");
    $stmtCheck->bind_param('i', $RequestID);
    if ($stmtCheck->execute()) {
        echo json_encode(["message" => "Request Answered"]);
    } else {
        echo json_encode(["Failed" => "Request Not Answered"]);
    }
}
