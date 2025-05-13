<?php
session_start();
if (!isset($_SESSION['ResearcherID'])) {
    header("Location: ../Pages/adminLogin.html");
    exit();
}
