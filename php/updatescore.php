<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GamePad</title>
</head>
<body>
<?php
    session_start();
    $servername = 'localhost';
    $username = 'root';
    $password = "";
    $dbname = "web_game_data";
    

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $conn->prepare("SELECT Score FROM user_table WHERE Username = :username");
        $stmt->bindParam(':username', $_SESSION["username"]);
        $stmt->execute();
        
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if($user['Score'] < $_GET['score'] ){
            $updateScore = $conn->prepare("UPDATE user_table SET Score = :newscore WHERE Username = :username");
            $updateScore->bindParam(':username', $_SESSION["username"]);
            $updateScore->bindParam(':newscore', $_GET['score']);
            $updateScore->execute();
            echo "<h1>Đang cập nhật lại điểm....</h1>";
            echo '<script>
                    setTimeout(()=> {
                        alert("Cập nhật thành công");
                        window.history.back();
                        }, 500);
            </script>';
            exit();
        }else {
            echo '<script>window.history.back();</script>';
        }   

    } catch (PDOException $e) {
        echo "Loi" .$e->getMessage();
        exit();
    }
    $conn = null;
?>

</body>
<script>
</script>
</html>