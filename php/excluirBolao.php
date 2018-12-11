<?php
    $server = 'localhost';
    $db_user = 'root';
    $db_password = 'x';

    $conn = new mysqli($server,$db_user,$db_password, "Bolao");

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $id = $_POST["id"];
    
    $query = "DELETE FROM Boloes WHERE id = \"$id\"";
    $query_result = $conn->query($query);

    if( $query_result === FALSE ) {
        echo "Erro: " . $query_result->error;
    }
    else {
        echo "success";
    }
?>