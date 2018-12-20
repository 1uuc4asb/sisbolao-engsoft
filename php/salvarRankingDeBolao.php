<?php
    $server = 'localhost';
    $db_user = 'root';
    $db_password = 'Lucas@2301';
    $conn = new mysqli($server,$db_user,$db_password, "Bolao");
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $bolao = json_decode($_POST["bolao"]);
    
    $query = "UPDATE Boloes SET ranking = '" . json_encode($bolao->ranking, JSON_UNESCAPED_UNICODE ) . "' WHERE id = '$bolao->id'";
    $query_result = $conn->query($query);
    //var_dump($query);
    if(query_result === FALSE) {
        echo "Erro: $conn->error";
        $conn->close();
        exit;
    }
    else {
        echo "success";
    }
?>