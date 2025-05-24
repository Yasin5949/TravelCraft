<?php
session_start();
header('Content-Type: application/json');
$host = "localhost";
$username = "root";
$password = "Ya5in@astu##";
$dbname = "TravelCraftDB";

$conn = new mysqli($host, $username, $password, $dbname);
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $UserID = $_SESSION['UserID'];
    $BookingID = intval($_POST['BookingID']);
    $Reason = $_POST['Reason'];
    $CanceledAt = date("Y-m-d H:i:s", time());
    $insert = $conn->prepare("INSERT INTO Canceled(UserID,BookingID,Reason,CanceledAt) values(?,?,?,?)");
    $insert->bind_param("iiss", $UserID, $BookingID, $Reason, $CanceledAt);
    $Update = $conn->prepare("UPDATE Booking SET BookingStatus='Canceled' WHERE BookingID=? ");
    $Update->bind_param("i", $BookingID);
    if ($insert->execute()  && $Update->execute()) {
        echo json_encode(["message" => "Tour Canceled Successfully!"]);
    } else {
        echo json_encode(["error" => "Failed To Cancel Booking!"]);
    }
}
