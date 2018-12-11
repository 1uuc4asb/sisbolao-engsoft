<?php
    $server = 'localhost';
    $db_user = 'root';
    $db_password = 'x';

    $bolaoId = $_POST["bolao"];
    $apostador = $_POST["apostador"];

    $conn = new mysqli($server,$db_user,$db_password, "Bolao");

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $query = "SELECT Convites FROM Usuarios WHERE BINARY Login = \"$apostador\"";
    $query_result = $conn->query($query);

    if($query_result != TRUE) {
        $error = $conn->error;
        $conn->close();
        echo "Erro: " . $error;
        exit;
    }
    
    $row = $query_result->fetch_assoc();
    $convites = json_decode($row["Convites"]);
    //var_dump (array_search($bolaoId, $convites));
    if(array_search($bolaoId, $convites) === FALSE){
        //echo "Entrou...";
        array_push($convites,$bolaoId);
    }
    
    $query = "UPDATE Usuarios SET Convites = '" . json_encode($convites, JSON_UNESCAPED_UNICODE) . "' WHERE BINARY Login = \"$apostador\"";
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