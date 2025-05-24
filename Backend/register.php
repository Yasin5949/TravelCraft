<?php
$host = "localhost";
$username = "root";
$password = "Ya5in@astu##";
$dbname = "TravelCraftDB";

$conn = new mysqli($host, $username, $password, $dbname);
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $Fname = $_POST['firstName'];
    $Lname = $_POST['lastName'];
    $Email = $_POST['Email'];
    $password = $_POST['password'];
    $confirm = $_POST['confirm'];
    $profile = "UserPicture/profileChange.jpg";
    if (!$Fname || !$Lname || !$Email || !$password || !$confirm) {
        echo json_encode(["notFilled" => "Please Fill The Field"]);
    } else {
        $hashedPassword = Password_hash($_POST['password'], PASSWORD_DEFAULT);
        if ($confirm === $password) {
            $stmt = $conn->prepare("INSERT INTO Users(firstName,lastName,Email,hashedPassword,ProfilePicture) values(?,?,?,?,?)");
            $stmt->bind_param("sssss", $Fname, $Lname, $Email, $hashedPassword, $profile);
            $stmt->execute();
            echo json_encode(["Registered" => " user Registered Successfully"]);
        } else {
            echo json_encode(["misMatch" => "Password Do Not Match"]);
        }
    }
}
