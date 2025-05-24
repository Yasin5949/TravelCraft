<?php
session_start();
$host = "localhost";
$username = "root";
$password = "Ya5in@astu##";
$dbname = "TravelCraftDB";

$conn = new mysqli($host, $username, $password, $dbname);
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $PhoneNumber = $_POST['phoneNumber'];
    $Reason = $_POST['Reason'];
    $UserID = $_SESSION['UserID'];
    $RequestStatus = 'Pending';
    $stmtCheck = $conn->prepare("SELECT * FROM CallRequest WHERE UserID=? And RequestStatus='Pending'");
    $stmtCheck->bind_param("i", $UserID);
    $stmtCheck->execute();
    $result = $stmtCheck->get_result();
    if ($result->num_rows > 0) {
        echo json_encode(["message" => "You Have Request Created Before Please Wait For The Response!"]);
    } else {
        $stmt = $conn->prepare("INSERT INTO CallRequest(UserID,PhoneNumber,RequestStatus,Reason) values(?,?,?,?)");
        $stmt->bind_param("iiss", $UserID, $PhoneNumber, $RequestStatus, $Reason);
        $stmt->execute();
        echo json_encode(["message" => "Request Created Successfully!"]);
    }
}
