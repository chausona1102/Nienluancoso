<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="img/logogamepad.png" type="image/x-icon">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/all.min.css">
    <title>GamePad</title>
</head>
<!--  -->
<?php
    session_start();
    $display1 = isset($_SESSION["username"]) ? "none" : "block";
    $display2 = isset($_SESSION["username"]) ? "block" : "none";
    if(isset($_SESSION['username'])) {
        $username = $_SESSION["username"];
    }
?>
<?php 

    require_once __DIR__ . '/connectDB.php'; 
    if($connected) {
        $result = "Connected";
    }else {
        $result = "Unconnected";
    }

?>
<body>
    <div class="container">
        <div class="row">
            <h1><i class="fa fa-gamepad"></i>GamePad - Admin</h1>
        </div>
        <div class="row">
            <div class="col-3">
                <ul class="nav">
                    <div class="profile-user" style="
                        display: <?php echo $display2; ?> ;" >
                        <label for=""><i class="fa fa-user" style="margin-right: 5px;"></i>Adminator</label>
                        <label for="">Fullname: <?php echo $_SESSION['fullname']; ?> </label>
                        <label for="">Max score: <?php echo $_SESSION['score']?></label>
                    </div>
                    <li><a href="#">Home</a></li>
                    <li><a href="../page/login.html" class="loginBtn" style="display: <?php echo $display1; ?>;" >Log in</a></li>
                    <li><a href="../php/logout.php" class="loginBtn" style="display: <?php echo $display2; ?>;" >Log out</a></li>
                </ul>
            </div>
            <div class="col-9">
                <div class="status">
                    <h6 class="cl-white">Database</h6>
                    <h6 class="cl-white">Status: <?php echo $result?> </h6>
                    <h5 class="cl-white" >User table</h5>
                    <div class="table-container">
                        <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Username</th>
                            <th scope="col">Fullname</th>
                            <th scope="col">Account Type</th>
                            <th scope="col">Status</th>
                            <th scope="col">Score</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                            if(isset($_SESSION['username']) && $_SESSION['username'] == 'admin@123') {
                                $stmt = $conn->prepare("SELECT * FROM user_table;");
                                $stmt->execute();
                                
                                $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
                                foreach($users as $user) {
                                    $id = $user['ID'];
                                    $usern = $user['Username'];
                                    $score = $user['Score'];
                                    $fullname = $user['Fullname'];
                                    $account_type = $user['User_type'];
                                    $status = $user['status'];
                                    if($account_type == 'admin') {
                                        continue;
                                    }
                                    if($status) {
                                        $color = "black";
                                    }else {
                                        $color = "red";
                                    }
                                    $delpag = 'deluser.php?user=';
                                    $rescorepag = 'resetscore.php?user=';
                                    $blockuserpag = 'blockuser.php?user=';
                                    $unblockpag = 'unblock.php?user=';
                                    echo "<tr style = 'color: $color;'>
                                        <th scope='row'>$id</th>
                                        <td>$usern</td>
                                        <td>$fullname</td>
                                        <td>$account_type</td>
                                        <td>$status</td>
                                        <td>$score</td>
                                        <td>
                                        <button onclick=\"window.location.href='$delpag$usern'\">Delete</button>
                                        <button onclick=\"window.location.href='$rescorepag$usern'\">Reset Score</button>
                                        <button onclick=\"window.location.href='$blockuserpag$usern'\">Block</button>
                                        <button onclick=\"window.location.href='$unblockpag$usern'\">Unblock</button>
                                        </td>
                                        </tr>";
                                }                     
                            }else{
                                header("location: ../index.php");
                            } 
                            ?>
                               
                        </tbody>
                        </table>
                    </div>

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