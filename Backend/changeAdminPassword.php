<?php
require_once 'dbConnection.php';
$db = new Database();
$conn = $db->getConnection();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $password = $_POST['password'];
    $confirm = $_POST['confirm'];
    $adminPassword = $_POST['oldPassword'];
    $check = $conn->prepare("SELECT hashedPassword FROM TourAdmin WHERE AdminID=1");
    $check->execute();
    $result = $check->get_result();
    $admin = $result->fetch_assoc();
    $check->close();
    if ($admin && password_verify($adminPassword, $admin['hashedPassword'])) {
        if ($confirm === $password) {
            $hashedPassword = password_hash($_POST['password'], PASSWORD_DEFAULT);
            $stmt = $conn->prepare("UPDATE TourAdmin SET hashedPassword = ? WHERE AdminID=1");
            $stmt->bind_param("s", $hashedPassword);
            $stmt->execute();
            echo json_encode(["Changed" => "Admin Changed"]);
        } else {
            echo json_encode(["misMatch" => "Password Don't Match"]);
        }
    } else {
        echo json_encode(["notAdmin" => "Wrong Admin Password"]);
    }
}
