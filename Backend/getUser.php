<?php
session_start();

if (!isset($_SESSION["UserID"])) {
    header("Location: ../HTMLPages/login.html");
    exit();
}
$response = [
    "firstName" => $_SESSION["firstName"],
    "lastName" => $_SESSION["lastName"],
    "Email" => $_SESSION["Email"],
    "userID" => $_SESSION["UserID"],
    "Privilege" => $_SESSION['Privilege'],
    "ProfilePicture" => $_SESSION['ProfilePicture']
];

echo json_encode($response);
