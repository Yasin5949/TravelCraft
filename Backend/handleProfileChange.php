<?php
session_start();
$host = "localhost";
$username = "root";
$password = "Ya5in@astu##";
$db = "TravelCraftDB";
$conn = new mysqli($host, $username, $password, $db);
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!isset($_SESSION['UserID'])) {
        die("Error: User not logged in.");
    }
    $user = $_SESSION['UserID'];
    if (!isset($_FILES["userProfile"]) || $_FILES["userProfile"]["error"] != 0) {
        die("Error: No file uploaded or upload failed.");
    }
    $images = "C:/xampp/htdocs/TravelCraft/UserPicture/";
    $imageName = basename($_FILES["userProfile"]["name"]);
    $targetImage = $images . $imageName;
    $imageFileType = strtolower(pathinfo($imageName, PATHINFO_EXTENSION));

    $check = getimagesize($_FILES["userProfile"]["tmp_name"]);
    if ($check === false) {
        die("File is not image.");
    }

    if (move_uploaded_file($_FILES["userProfile"]["tmp_name"], $targetImage)) {
        $relativePath = "UserPicture/" . $imageName;
        $stmt = $conn->prepare("UPDATE Users  set ProfilePicture=? where UserID=?");
        $stmt->bind_param("si", $relativePath, $user);
        $response = [
            "profile" => $relativePath
        ];
        if ($stmt->execute()) {
            echo json_encode(["Profile" => $relativePath]);
        } else {
            echo "Error:" . $stmt->error;
        }
        $stmt->close();
    } else {
        echo "error uploading file";
    }
}
