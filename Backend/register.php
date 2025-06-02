<?php
session_start();
header("Content-Type: application/json");

$host = "localhost";
$username = "root";
$password = "Ya5in@astu##";
$dbname = "TravelCraftDB";

$conn = new mysqli($host, $username, $password, $dbname);
if (!$conn) {
    echo json_encode(["connectionFail" => "Database connection failed"]);
    exit();
}

require __DIR__ . '/../vendor/autoload.php';


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


function sendVerificationEmail($email, $verificationCode)
{
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Use your SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = 'yasin2ashalo@gmail.com'; // Your email
        $mail->Password = 'ujma jytj xdsh pdjr'; // Use App Password for security
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('yasin2ashalo@gmail.com', 'TravelCraft');
        $mail->addAddress($email);
        $mail->Subject = "Email Verification Code";
        $mail->Body = "Your verification code is: " . $verificationCode;

        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("PHPMailer Error: " . $mail->ErrorInfo);
        return false;
    }
}
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $Fname = $_POST['firstName'];
    $Lname = $_POST['lastName'];
    $Email = $_POST['Email'];
    $password = $_POST['password'];
    $confirm = $_POST['confirm'];
    $profile = "UserPicture/profileChange.jpg";

    if (!$Fname || !$Lname || !$Email || !$password || !$confirm) {
        echo json_encode(["notFilled" => "Please Fill All Fields"]);
        exit();
    }

    if ($confirm !== $password) {
        echo json_encode(["misMatch" => "Passwords Do Not Match"]);
        exit();
    }
    $_SESSION['email'] = $Email;
    $verificationCode = rand(100000, 999999);
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO PendingUsers (firstName, lastName, Email, hashedPassword, ProfilePicture, verificationCode) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssi", $Fname, $Lname, $Email, $hashedPassword, $profile, $verificationCode);
    $stmt->execute();

    if (!sendVerificationEmail($Email, $verificationCode)) {
        echo json_encode(["error" => "Failed to send verification email"]);
        exit();
    } else {
        echo json_encode(["message" => "Verification Sent!"]);
    }
}
