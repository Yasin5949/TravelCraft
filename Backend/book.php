<?php
session_start();
header('Content-Type: application/json');
require_once 'dbConnection.php';
$db = new Database();
$conn = $db->getConnection();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $date1 = new DateTime($_POST['BookedFor']);
    $date2 = new DateTime($_POST['endingDate']);
    $Total = floatval($_POST['Total']);
    $interval = $date1->diff($date2);
    $daysDifference = $interval->days;
    $overAllCost = $daysDifference * $Total;
    $UserID = $_SESSION['UserID'];
    $TourID = $_POST['TourID'];
    $BookedFor = $_POST['BookedFor'];
    $ending = $_POST['endingDate'];
    if (isset($_SESSION['UserID'])) {
        if (!$BookedFor || !$ending) {
            echo json_encode(["message" => "Please Enter The date"]);
        }
        if ($BookedFor > $ending) {
            echo json_encode(["message" => "Please Enter Valid Schedule!"]);
        } else {
            $stmt = $conn->prepare("INSERT INTO Booking(UserID,TourID,BookingStatus,Total,BookedFor,EndingDate) values(?,?,'Pending',?,?,?)");
            $stmt->bind_param("iidss", $UserID, $TourID, $overAllCost, $BookedFor, $ending);
            $stmt->execute();
            echo json_encode(["message" => "Tour Booked Successfully!"]);
        }
    } else {
        echo json_encode(["message" => "User not Logged In"]);
    }
}
