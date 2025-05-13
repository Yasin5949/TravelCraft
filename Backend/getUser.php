<?php
session_start();

if (!isset($_SESSION["firstName"])) {
    header("Location: ../HTMLPages/login.html");
    exit();
}
$response = [
    "firstName" => $_SESSION["firstName"],
    "lastName" => $_SESSION["lastName"],
    "Email" => $_SESSION["Email"],
    "userID" => $_SESSION["UserID"]
];

echo json_encode($response);
