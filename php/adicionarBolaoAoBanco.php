<?php
    $server = 'localhost';
    $db_user = 'root';
    $db_password = 'Lucas@2301';

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

    if($query_result === FALSE) {
        echo "Erro: $conn->error";
        $conn->close();
        exit;
    }
    else {
        $query = "SELECT id FROM Boloes";
        $query_result = $conn->query($query);
        if($query_result === FALSE) {
            echo "Erro: $conn->error";
            $conn->close();
            exit;
        }
        else {
            while($row = $query_result->fetch_assoc()) {
                $id = $row["id"];
            }
            $query = "SELECT * FROM Boloes WHERE id = \"$id\"";
            $query_result = $conn->query($query);
            if($query_result === FALSE) {
                echo "Erro: $conn->error";
                $conn->close();
                exit;
            }
            else {
                $row = $query_result->fetch_assoc();
                $jogosArr = json_decode($row["jogos"]);
                foreach($jogosArr as $jogo) {
                    array_push($jogo->observadores->lista, $id);
                }
                $query = "UPDATE Boloes SET jogos = '" . json_encode($jogosArr , JSON_UNESCAPED_UNICODE ) . "' WHERE id = \"$id\"";
                $query_result = $conn->query($query);
                if($query_result === FALSE) {
                    echo "Erro: $conn->error";
                    $conn->close();
                    exit;
                }
                else {
                    echo "success";
                }
            }
            echo $id;
        }
        $conn->close();
    }
?>