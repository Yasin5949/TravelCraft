<?php
require_once 'dbConnection.php';
$db = new Database();
$conn = $db->getConnection();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $BookedFor = $_POST['BookedFor'];
    $EndingDate = $_POST['endingDate'];
    $sql = "SELECT * FROM Booking WHERE UserID LIKE ?";
    $stmt = $conn->prepare($sql);
    $searchTerm = "%" . $query . "%";
    $stmt->bind_param("s", $searchTerm);
    $stmt->execute();
    $result = $stmt->get_result();
    $users = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($users);
} else {
    echo json_encode(["error" => "No search query provided"]);
}
