<?php
    $server = 'localhost';
    $db_user = 'root';
    $db_password = 'Lucas@2301';
    $conn = new mysqli($server,$db_user,$db_password, "Bolao");
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $login = $_POST["apostador"];

    $query = "SELECT convites FROM Usuarios WHERE BINARY Login = \"$login\"";
    $query_result = $conn->query($query);

    if($query_result == FALSE) {
        $error = $conn->error;
        $conn->close();
        echo "Erro: " . $error;
    }
    else {
        $row = $query_result->fetch_assoc();
        $convites = json_encode(json_decode($row["convites"]));
        $conn->close();
        echo $convites;
    }
?>