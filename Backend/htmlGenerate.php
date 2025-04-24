<?php
require "dbConnection.php";
$result = $conn->query("SELECT * FROM Roles");
if ($row = $result->fetch_assoc()) {
    Header("Content-Type: appication/json");
    echo json_encode([
        "Role" => $row['RoleName'],
        "Id" => $row['RoleId']
    ]);
}
