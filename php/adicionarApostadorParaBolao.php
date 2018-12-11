<?php
    $server = 'localhost';
    $db_user = 'root';
    $db_password = 'Lucas@2301';

    $bolaoId = $_POST["bolao"];
    $apostador = $_POST["apostador"];

    $conn = new mysqli($server,$db_user,$db_password, "Bolao");

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $convite = json_encode(array($bolaoId), JSON_UNESCAPED_UNICODE );
    
    $query = "UPDATE Usuarios SET convites = '$convite' WHERE BINARY Login = \"$apostador\"";
    $query_result = $conn->query($query);

    if($query_result != TRUE) {
        $error = $conn->error;
        $conn->close();
        echo "Erro: " . $error;
    }
    else {
        echo "success";
    }
?>