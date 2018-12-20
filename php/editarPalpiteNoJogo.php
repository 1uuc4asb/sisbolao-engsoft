<?php
    $server = 'localhost';
    $db_user = 'root';
    $db_password = 'Lucas@2301';

    $bolao = json_decode($_POST["bolao"]);
    $jogo = json_decode($_POST["jogo"]);
    $palpite = $_POST["palpite"];
    $login = $_POST["login"];

    $conn = new mysqli($server,$db_user,$db_password, "Bolao");

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    //var_dump($bolao);
    //var_dump($jogo);
    //var_dump($aposta);
    
    /*
        O que preciso fazer?
            - Editar objeto que guarda o id do bolao, o id do jogo e a aposta e colocar no Apostador (no banco) (FEITO)
            - Editar a aposta no objeto jogo no bolão (no banco)
    */
    
    $query = "SELECT Apostas FROM Usuarios WHERE Login = '" . $login . "'";
    //echo $query . "\n";
    $query_result = $conn->query($query);
    if($query_result === FALSE) {
        echo "Erro: $conn->error";
        $conn->close();
        exit;
    }
    else {
        if($query_result->num_rows > 0) {
            $row = $query_result->fetch_assoc();
            $apostasArr = json_decode($row["Apostas"]);
            //var_dump($apostasArr);
            foreach($apostasArr as $aposta) {
                if(($aposta->bolao == $bolao->id) && ($aposta->jogo) == $jogo->id) {
                    $aposta->aposta->palpite = $palpite;
                }
            }
            //var_dump($apostasArr);
            $query = "UPDATE Usuarios SET Apostas = '" . json_encode($apostasArr, JSON_UNESCAPED_UNICODE ) . "' WHERE Login = '" . $login . "'";
            //echo $query . "\n";
            $query_result = $conn->query($query);
            if($query_result === FALSE) {
                echo "Erro: $conn->error";
                $conn->close();
                exit;
            }
            else {
                $query = "SELECT jogos FROM Boloes WHERE id = '" . $bolao->id . "'";
                $query_result = $conn->query($query);
                //echo $query . "\n";
                if($query_result === FALSE) {
                    echo "Erro: $conn->error";
                    $conn->close();
                    exit;
                }
                else {
                    $row = $query_result->fetch_assoc();
                    $jogos = json_decode($row["jogos"]);
                    //var_dump($jogos);
                    foreach($jogos[$jogo->id-1]->apostas as $aposta) {
                        if($aposta->dono == $login) {
                            $aposta->palpite = $palpite;
                        }
                    }
                    //var_dump($jogos);
                    $query = "UPDATE Boloes SET jogos = '" . json_encode($jogos, JSON_UNESCAPED_UNICODE ) . "' WHERE id = '" . $bolao->id . "'";
                    //echo $query;
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
            }
        }
        else {
            echo "Usuario nao existe";
            exit;
        }
    }
    $conn->close();
?>