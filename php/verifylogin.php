<?php

    $server = 'localhost';
    $db_user = 'root';
$db_password = 'xxxxx';

    $conn = new mysqli($server,$db_user,$db_password, "Bolao");

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $login = $_POST["login"];
  
    $query = "SELECT * FROM Usuários WHERE BINARY Login = \"$login\"";
    $query_result = $conn->query($query);

    if($query_result->num_rows <= 0) {
        echo "!exist";
    }
    else {
        echo "exist";
    }

    $conn->close();
?>
