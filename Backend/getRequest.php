<?php
header('Content-Type: application/json');
$host = "localhost";
$username = "root";
$password = "Ya5in@astu##";
$dbname = "TravelCraftDB";
$conn = new mysqli($host, $username, $password, $dbname);
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $stmtCheck = $conn->prepare("SELECT 
                                    u.UserID,
                                    u.ProfilePicture,
                                    u.firstName,
                                    u.Email,
                                    c.RequestedAt,
                                    c.Reason,
                                    c.PhoneNumber,
                                    c.RequestID
                                    FROM CallRequest c
                                    INNER JOIN Users u ON c.UserID=u.UserID
                                    WHERE  RequestStatus='Pending'");
    $stmtCheck->execute();
    $result = $stmtCheck->get_result();
    if ($result->num_rows > 0) {
        $request = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($request);
    } else {
        echo json_encode(["message" => "No Request Found"]);
    }
}
