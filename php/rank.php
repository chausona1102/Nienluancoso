<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="img/logogamepad.png" type="image/x-icon">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="../css/all.min.css">
    <link rel="stylesheet" href="../css/rank.css">
    <title>Gamepad</title>
</head>

<?php
session_start();
require_once __DIR__ . '/../admin/connectDB.php';
$display1 = isset($_SESSION["username"]) ? "none" : "block";
$display2 = isset($_SESSION["username"]) ? "block" : "none";
if (isset($_SESSION['username'])) {
    $username = $_SESSION["username"];
}
?>

<body>
    <div class="container">
        <div class="row">
            <h1><i class="fa fa-gamepad"></i>GamePad</h1>
        </div>
        <div class="row">
            <div class="col-3">
                <ul class="nav">
                    <div class="profile-user" style="
                        display: <?php echo $display2; ?> ;">
                        <label for="">Username: <?php echo $username ?></label>
                        <label for="">Fullname: <?php echo $_SESSION['fullname']; ?> </label>
                        <label for="">Max score: <?php echo $_SESSION['score'] ?></label>
                    </div>
                    <li><a href="../index.php">Home</a></li>
                    <li><a href="../page/rules.html">Rules</a></li>
                    <li><a href="../php/rank.php">Rank</a></li>
                    <li><a href="../page/login.html" class="loginBtn" style="display: <?php echo $display1; ?>;">Log in</a>
                    </li>
                    <li><a href="../php/logout.php" class="loginBtn" style="display: <?php echo $display2; ?>;">Log out</a>
                    </li>
                </ul>
            </div>
            <div class="col-9">
                <h1>Rank: </h1>
                <div class="template">
                    <ul class="list-group list-group-flush col-8">
                        <?php 
                            $stmt = $conn->prepare('SELECT Fullname, Score, User_type FROM user_table ORDER BY Score DESC');
                            $stmt->execute();
                            $index = 0;
                            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                            foreach($result as $row) {
                                if($row['User_type'] == 'admin') {
                                    continue;
                                }
                                $index++;
                                $score = $row['Score'];
                                $Fname = $row['Fullname'];
                                echo "<li class='list-group-item'><span>$index. $Fname</span><span>Score: $score</span></li>";
                            }
                        ?>
                    </ul>
                </div>
            </div>
        </div>
        <div class="row" id="footer">
            <p>Develop by Chau So Na</p>
            <p>Contact: nab2205890@studen.ctu.edu.vn <i class="fa fa-envelope"></i></p>
            <p>Phone: 0374349105 <i class="fa fa-phone"></i></p>
        </div>
    </div>
</body>

</html>