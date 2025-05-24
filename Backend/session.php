<?php
session_start();
if (!isset($_SESSION['UserID'])) {
    header("Location: ../HTMLPages/Login.html");
    exit();
}
