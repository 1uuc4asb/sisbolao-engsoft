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
    
    $query = "SELECT apostadores,jogos FROM Boloes WHERE BINARY id = \"$bolaoId\"";
    $query_result = $conn->query($query);

    if($query_result === FALSE) {
        $error = $conn->error;
        $conn->close();
        echo "Erro: " . $error;
        exit;
    }
    else {
        $row = $query_result->fetch_assoc();
        $jogos = json_decode($row["jogos"]);
        $apostou = FALSE;
        for($i=0;$i< count($jogos); $i++) {
            for($j=0;$j<count($jogos[$i]->apostas);$j++) {
                if($jogos[$i]->apostas[$j]->dono == $apostador) {
                    $apostou = TRUE;
                    break;
                }
            }
            if($apostou === TRUE) {
                break;
            }
        }
        if($apostou === TRUE) {
            echo "Você não pode excluir um apostador que já fez uma aposta!";
        }
        else {
            $apostadores = json_decode($row["apostadores"]);
            $index = array_search($apostador,$apostadores);
            array_splice($apostadores,$index,1);
            $query = "UPDATE Boloes SET apostadores = '" . json_encode($apostadores, JSON_UNESCAPED_UNICODE ) . "' WHERE id = '$bolaoId'";
            $query_result = $conn->query($query);

            if($query_result === FALSE) {
                $error = $conn->error;
                $conn->close();
                echo "Erro: " . $error;
                exit;
            }
            else {
                $query = "SELECT Boloes FROM Usuarios WHERE BINARY Login = \"$apostador\"";
                $query_result = $conn->query($query);
                if($query_result === FALSE) {
                    $error = $conn->error;
                    $conn->close();
                    echo "Erro: " . $error;
                    exit;
                }
                else {
                    $row = $query_result->fetch_assoc();
                    $boloes = json_decode($row["Boloes"]);
                    //var_dump($boloes);
                    $index = array_search($bolaoId,$boloes);
                    array_splice($boloes,$index,1);
                    $query = "UPDATE Usuarios SET Boloes = '" . json_encode($boloes, JSON_UNESCAPED_UNICODE ) . "' WHERE BINARY Login = \"$apostador\"";
                    $query_result = $conn->query($query);

                    if($query_result === FALSE) {
                        $error = $conn->error;
                        $conn->close();
                        echo "Erro: " . $error;
                        exit;
                    }
                    else {
                        echo "success"; 
                    }
                }
                
            }
        }
    }
?>