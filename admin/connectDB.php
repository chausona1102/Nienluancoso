<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "nienluandb";
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $connected = true;
        $databname = $dbname;
    }catch (PDOException $e) {
        echo "Unconnected" .$e->getMessage();
    }
?>