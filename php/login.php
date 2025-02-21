   <!DOCTYPE html>
   <html lang="en">
   <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../img/logogamepad.png" type="image/x-icon">
    <title>Login</title>
    </head>
    <?php
//Login php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "web_game_data";
// Kết nối PDO
try {
    // Kết nối PDO
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $usern = trim($_POST["username"]);
        $pw = $_POST["password"];
        // Truy vấn dữ liệu
        $stmt = $conn->prepare("SELECT * FROM user_table WHERE Username = :username");
        $stmt->bindParam(':username', $usern);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if(!$user){
            echo "<h1>Sai tên tài khoản</h1>";
            echo "<script>setTimeout(()=> {
                window.location.href = '../page/login.html';
                }, 2000);</script>";
                exit();
        }else if (!$user['status']) {
            echo "<h1>Tài khoản đã bị vô hiệu hóa</h1>";
            echo "<script>setTimeout(()=> {
                window.location.href = '../page/login.html';
            }, 2000);</script>";
            exit();
        }else if($user && password_verify($pw, $user["Pass"])){
                $_SESSION["username"] = $usern;
                $_SESSION['fullname'] = $user['Fullname'];
                $_SESSION['score'] = $user['Score'];
            echo "Dang nhap thanh cong!";
            if($user['User_type'] == 'admin'){
                header("location: ../admin/admin.php");
                exit();
            }else if($user['User_type'] == 'user') {
                header("location: ../index.php");
                exit();
            }
        }else {
            echo "<h1>Sai mật khẩu</h1>";
            echo "<script>setTimeout(()=> {
                        window.location.href = '../page/login.html';
                    }, 2000);</script>";
            exit();
        } 
    }
    
    // Hiển thị dữ liệu
    
} catch (PDOException $e) {
    echo "Lỗi: " . $e->getMessage();
}

// Đóng kết nối
$conn = null;
?>
   <body>
   </body>
   </html>
