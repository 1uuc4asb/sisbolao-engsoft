<?php
    $server = 'localhost';
    $db_user = 'root';
    $db_password = 'Lucas@2301';

    $bolao = json_decode($_POST["bolao"]);
    $jogo = json_decode($_POST["jogo"]);
    $aposta = json_decode($_POST["aposta"]);

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
            - Criar um objeto que guarda o id do bolao, o id do jogo e a aposta e colocar no Apostador (no banco) (FEITO)
            - Colocar a aposta no objeto jogo no bolão (no banco)
            - Atualizar montante do jogo
    */
    
    $query = "SELECT Apostas FROM Usuarios WHERE Login = '" . $aposta->dono . "'";
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
            $apostaObj->bolao = $bolao->id;
            $apostaObj->jogo = $jogo->id;
            $apostaObj->aposta = $aposta;
            array_push($apostasArr,$apostaObj);
            //var_dump($apostasArr);
            $query = "UPDATE Usuarios SET Apostas = '" . json_encode($apostasArr, JSON_UNESCAPED_UNICODE ) . "' WHERE Login = '" . $aposta->dono . "'";
            //echo $query;
            $query_result = $conn->query($query);
            if($query_result === FALSE) {
                echo "Erro: $conn->error";
                $conn->close();
                exit;
            }
            else {
                //var_dump($bolao);
                $bolao->jogos[$jogo->id - 1]->montante += $aposta->valor;
                array_push($bolao->jogos[$jogo->id - 1]->apostas,$aposta);
                //var_dump($bolao);
                $query = "UPDATE Boloes SET jogos = '" . json_encode($bolao->jogos, JSON_UNESCAPED_UNICODE ) . "' WHERE id = '" . $bolao->id . "'";
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
        else {
            echo "Usuario nao existe";
            exit;
        }
    }
    $conn->close();
?>