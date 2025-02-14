<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="img/logogamepad.png" type="image/x-icon">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/all.min.css">
    <title>Gamepad</title>
</head>

<?php
    session_start();
    $display1 = isset($_SESSION["username"]) ? "none" : "block";
    $display2 = isset($_SESSION["username"]) ? "block" : "none";
    if(isset($_SESSION['username'])) {
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
                        display: <?php echo $display2; ?> ;" >
                        <label for="">Username: <?php echo $username ?></label>
                        <label for="">Fullname: <?php echo $_SESSION['fullname']; ?> </label>
                        <label for="">Max score: <?php echo $_SESSION['score']?></label>
                    </div>
                    <li><a href="#">Home</a></li>
                    <li><a href="page/rules.html">Rules</a></li>
                    <li><a href="page/login.html" class="loginBtn" style="display: <?php echo $display1; ?>;" >Log in</a></li>
                    <li><a href="php/logout.php" class="loginBtn" style="display: <?php echo $display2; ?>;" >Log out</a></li>
                </ul>
            </div>
            <div class="col-9">
                <h1>Game: </h1>
                <div class="template">
                    <div class="card" style="width: 15em;">
                        <img src="img/sudoku.png" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">Sudoku</h5>
                          <p class="card-text">Sudoku là trò chơi logic, yêu cầu điền số từ 1 đến 9 vào lưới 9x9 sao cho mỗi hàng, cột và vùng 3x3 không trùng số.</p>
                          <a href="page/sudoku.html" class="btn btn-dark" title="Chơi">Play</a>
                        </div>
                    </div>
                    <div class="card" style="width: 15rem;">
                        <img src="img/bomb.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">Minesweeper - Bomb</h5>
                          <p class="card-text">Trò chơi gỡ mìn. Luật chơi là gỡ hết ô không gặp mìn là thắng. Game quá dễ phá đảo ngay thôi</p>
                          <a href="page/bomb.html" class="btn btn-dark" title="Chơi">Play</a>
                        </div>
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