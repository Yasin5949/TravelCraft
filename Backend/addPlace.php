<?php
$host = "localhost";
$username = "root";
$password = "Ya5in@astu##";
$database = "TravelCraftDB";
$conn = new mysqli($host, $username, $password, $database);
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $TourName = $_POST['TourName'];
    $Description = $_POST['Description'];
    $Region = $_POST['Region'];
    $Price = $_POST['Price'];
    if (!isset($_FILES["TourImage"]) || $_FILES["TourImage"]["error"] != 0) {
        die("Error: No file uploaded or upload failed.");
    }
    $images = "C:/xampp/htdocs/TravelCraft/images/";
    $imageName = basename($_FILES["TourImage"]["name"]);
    $targetImage = $images . $imageName;
    $imageFileType = strtolower(pathinfo($imageName, PATHINFO_EXTENSION));

    $check = getimagesize($_FILES["TourImage"]["tmp_name"]);
    if ($check === false) {
        die("File is not image.");
    }

    if (move_uploaded_file($_FILES["TourImage"]["tmp_name"], $targetImage)) {
        $relativePath = "images/" . $imageName;
        $stmt = $conn->prepare("INSERT INTO Tours(TourName,Descriptions,TourImage,Region,TourPrice) values(?,?,?,?,?)");
        $stmt->bind_param("ssssd", $TourName, $Description, $relativePath, $Region, $Price);
        if ($stmt->execute()) {
            echo "Tour Added";
        } else {
            echo "Error:" . $stmt->error;
        }
        $stmt->close();
    } else {
        echo "error uploading file";
    }
}
$conn->close();
