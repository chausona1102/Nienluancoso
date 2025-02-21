<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<?php
    require_once __DIR__ . '/connectDB.php'; 
    if($_GET['user']){
        echo $_GET['user'];
        $user = htmlspecialchars($_GET['user']);
    }
    $stmt = $conn->prepare("SELECT * FROM user_table WHERE Username = :username");
    $stmt->bindParam(':username', $user);
    $stmt->execute();

    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    $del = $conn->prepare("DELETE FROM user_table WHERE Username = :username");
    $del->bindParam(':username', $user);
    if($del->execute()){
        echo "<script>alert('Deleted')</script>";
        header("location: admin.php");
    }else {
        "<script>alert('Faile')</script>";
        header("location: admin.php");
    }
?>
<body>
    
</body>
</html>