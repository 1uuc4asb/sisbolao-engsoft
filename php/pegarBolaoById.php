<?php
    $server = 'localhost';
    $db_user = 'root';
    $db_password = 'Lucas@2301';

    $conn = new mysqli($server,$db_user,$db_password, "Bolao");

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $id = $_POST["id"];
    
    $query = "SELECT * FROM Boloes WHERE id = \"$id\"";
    $query_result = $conn->query($query);

    if($query_result === FALSE) {
        echo "Erro: $conn->error";
        $conn->close();
        exit;
    }
    else {
        if($query_result->num_rows <= 0) {
            echo "Não existe bolão com o id: $id";
            $conn->close();
            exit;
        }
        else {
            $row = $query_result->fetch_assoc();
            $bolaoObj->id = json_decode($row["id"]);
            $bolaoObj->apostadores = json_decode($row["apostadores"]);
            $bolaoObj->jogos = json_decode($row["jogos"]);
            $bolaoObj->ranking = json_decode($row["ranking"]);
            $bolaoObj->regras = json_decode($row["regras"]);
            $bolaoObj->regra_de_desempate = json_decode($row["regra_de_desempate"]);
            $bolaoObj->administrador = json_decode($row["administrador"]);
            $conn->close();
            echo json_encode($bolaoObj, JSON_UNESCAPED_UNICODE );
        }
    }
?>