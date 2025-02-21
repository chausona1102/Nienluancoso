<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blocking</title>
</head>
<?php 
    require_once __DIR__ . '/connectDB.php';
    
    if(isset($_GET['user'])){
        try {
            $usern = htmlspecialchars($_GET['user']);
            $stmt =  $conn->prepare("UPDATE user_table SET status = 1 WHERE Username = :username");
            $stmt->bindParam(":username", $usern);
            $stmt->execute();
            echo "<h1 style='color: red; padding: 20px;'>Tài khoản đã $usern đã được mở khóa. Quay lại trang admin sau 3s</h1>";
            echo "<script>
                        setTimeout(()=> {
                            window.history.back();
                        }, 10);
                    </script>";
            exit();
        }catch (PDOException $e) {
            echo "Lỗi: " . $e->getMessage();
            exit();
        }
     }else {
        echo "Không tìm thấy Username";
    }


?>
<body>
    
</body>

</html>