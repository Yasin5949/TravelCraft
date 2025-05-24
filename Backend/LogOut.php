<?php
session_start();
header("Content-Type: application/json");
if (!isset($_SESSION['UserID'])) {
    echo json_encode(["error" => "User not logged in."]);
    exit;
}
session_unset();
session_destroy();
echo json_encode(["success" => true]);
exit;
