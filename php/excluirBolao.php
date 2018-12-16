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

    $query = "SELECT Apostadores FROM Boloes WHERE id = \"$id\"";
    $query_result = $conn->query($query);
    //echo $query . "\n";

    if( $query_result === FALSE ) {
        echo "Erro: " . $query_result->error;
    }
    else {
        $row = $query_result->fetch_assoc();
        $apostadoresArr = json_decode($row["Apostadores"]);
        for($i=0; $i< count($apostadoresArr); $i++) {
            $query = "SELECT Boloes,Apostas FROM Usuarios WHERE Login = '" . $apostadoresArr[$i] . "'";
            //echo $query . "\n";
            $query_result = $conn->query($query);
            if( $query_result === FALSE ) {
                echo "Erro: " . $query_result->error;
            }
            else {
                $row = $query_result->fetch_assoc();
                $apostas = json_decode($row["Apostas"]);
                $boloes = json_decode($row["Boloes"]);
                //var_dump($apostas);
                //echo "\n";
                //var_dump($boloes);
                //echo "\n";
                foreach($apostas as $index => $aposta) {
                    //echo "aposta id: " . $aposta->bolao . "\n";
                    //echo "bolao id: " . $id . "\n";
                    if($aposta->bolao == $id) {
                        array_splice($apostas,$index,1);
                    }
                }
                $indice_bolao = array_search($id,$boloes);
                if($indice_bolao !== FALSE) {
                    array_splice($boloes,$indice_bolao,1);
                }
                //var_dump($apostas);
                //echo "\n";
                //var_dump($boloes);
                //echo "\n";
                $query = "UPDATE Usuarios SET Boloes = '" . json_encode($boloes, JSON_UNESCAPED_UNICODE ) . "',Apostas = '" . json_encode($apostas, JSON_UNESCAPED_UNICODE ) . "' WHERE Login = '" . $apostadoresArr[$i] . "'";
                $query_result = $conn->query($query);
                if( $query_result === FALSE ) {
                    echo "Erro: " . $query_result->error;
                    echo "Não foi possível remover o bolão...";
                    $conn->close();
                    exit;
                }
            }
        }
        
        $query = "DELETE FROM Boloes WHERE id = \"$id\"";
        $query_result = $conn->query($query);

        if( $query_result === FALSE ) {
            echo "Erro: " . $query_result->error;
        }
        else {
            echo "success";
        }
    }
?>