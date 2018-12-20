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
    
    $query = "SELECT * FROM Usuarios WHERE Login = \"$login\"";
    $query_result = $conn->query($query);
    
    if($query_result === FALSE) {
        echo "Erro: $conn->error";
        $conn->close();
        exit;
    }
    else { 
        if($query_result->num_rows <= 0) {
            $conn->close();
            echo "Não existem apostadores com o Login: $login";
        }
        else {
            $row = $query_result->fetch_assoc();
            $apostadorObj->boloes = json_decode($row["Boloes"]);
            $apostadorObj->apostas = json_decode($row["Apostas"]);
            $conn->close();
            echo json_encode($apostadorObj, JSON_UNESCAPED_UNICODE );
        }
    }
?>