<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    .false {
        color: red;
    }
    .true {
        color: rgb(0,200,0);
    }
    h1 {
        text-align: center;
        padding: 20px;
        width: 50vh;
        height: 30vh;
        margin: 30px;
    }
</style>
<?php
    // Sign In PHP
    session_start();
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "nienluandb";
    // Kết nối PDO
    try {
        // Kết nối PDO
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $usern = trim($_POST["username"]);
        $pw = $_POST["password"];
        $fullname = $_POST['fullname'];

        // Truy vấn dữ liệu
        $checkStmt = $conn->prepare("SELECT * FROM user_table WHERE Username = :username");
        $checkStmt->bindParam(':username', $usern);
        $checkStmt->execute();

        if($checkStmt->rowCount() > 0){
            echo '<h1 class="false">Ten dang nhap da ton tai</h1>';
            echo "<script>setTimeout(()=> {
                        window.location.href = '../page/signin.html';
                    }, 2000);</script>";
            exit();
        }else {
            $hashedPassword = password_hash($pw, PASSWORD_DEFAULT, [1,2,3,5,6,5]);
            $stmt = $conn->prepare("INSERT INTO user_table (Username,Pass,Fullname) VALUES(:username, :pass, :fullname)");
            $stmt->bindParam(':username', $usern);
            $stmt->bindParam(':pass', $hashedPassword);
            $stmt->bindParam(':fullname', $fullname);
            $stmt->execute();
            // header("location: login.php");
        }

        // Hiển thị dữ liệu
        
    } catch (PDOException $e) {
        echo "Lỗi: " . $e->getMessage();
        exit();
    }
        
    // Đóng kết nối
    $conn = null;
?>
<body>
    <h1 class="true">Đăng ký thành công. Quay lai trang Đăng nhập sau 3s</h1>
</body>
<script>
    setTimeout(()=> {
        window.location.href = '../page/login.html';
    }, 3000);

</script>
</html>
