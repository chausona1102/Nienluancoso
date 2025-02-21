<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reseting...</title>
</head>
<body>
<?php
    require_once __DIR__ . '/connectDB.php';

    echo "Day la trang reset diem";

    $usern = htmlspecialchars($_GET['user']);
    // $stmt = $conn->prepare("SELECT * FROM user_table WHERE Username = :username");
    // $stmt->bindParam('username', $usern);
    // $stmt->execute();

    // $user = $stmt->fetch(PDO::FETCH_ASSOC);

    $reset = $conn->prepare("UPDATE user_table SET Score = 0 WHERE Username = :username");
    $reset->bindParam('username', $usern);
    $reset->execute();
    header("location: admin.php");
?>
    
</body>
</html>