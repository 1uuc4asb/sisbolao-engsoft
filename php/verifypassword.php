<?php
    $server = 'localhost';
    $db_user = 'root';
    $db_password = 'Lucas@2301';

    $conn = new mysqli($server,$db_user,$db_password, "Bolao");

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $login = $_POST["login"];
    $senha = md5($_POST["senha"]);
  
    $query = "SELECT * FROM Usuarios WHERE BINARY Login = \"$login\"";
    $query_result = $conn->query($query);
    
    $user = $query_result->fetch_assoc();
    if($user["Senha"] == $senha) {
        $conn->close();
        echo "correct";
    }
    else {
        $conn->close();
        echo "incorrect";
    }
?>
