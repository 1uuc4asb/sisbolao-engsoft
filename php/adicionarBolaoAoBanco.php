<?php
    $server = 'localhost';
    $db_user = 'root';
    $db_password = 'x';

    $bolao = json_decode($_POST["bolao"]);

    $conn = new mysqli($server,$db_user,$db_password, "Bolao");

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $apostadores = json_encode($bolao->apostadores, JSON_UNESCAPED_UNICODE );
    $jogos = json_encode($bolao->jogos, JSON_UNESCAPED_UNICODE );
    $ranking = json_encode($bolao->ranking, JSON_UNESCAPED_UNICODE );
    $administrador = json_encode($bolao->Administrador, JSON_UNESCAPED_UNICODE );
    $scoreRules = json_encode($bolao->scoreRules, JSON_UNESCAPED_UNICODE );
    $tiebreakerRules = json_encode($bolao->tiebreakerRules, JSON_UNESCAPED_UNICODE );
    
    //var_dump($bolao);
    $query = "INSERT INTO Boloes (apostadores,jogos,ranking,regras,regra_de_desempate,administrador) VALUES ('$apostadores','$jogos','$ranking','$scoreRules','$tiebreakerRules','$administrador')";
    $query_result = $conn->query($query);
    
    if($query_result != TRUE) {
        $erro = $conn->error;
        $conn->close();
        echo "Erro: " . $erro;
    }
    else {
        $query = "SELECT id FROM Boloes";
        $query_result = $conn->query($query);
        $id = "";
        while($row = $query_result->fetch_assoc()) {
            $id = $row["id"];
        }
        $conn->close();
        echo $id;
    }
?>