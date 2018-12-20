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

    $login = $_POST["apostador"];
    $bolao = $_POST["bolao"];
    $answer = $_POST["answer"];

    if($answer == "accept") {
        $query = "SELECT apostadores FROM Boloes WHERE id = '$bolao'";
        $query_result = $conn->query($query);
        if($query_result === FALSE) {
            echo "Erro: " . $conn->error;
            $conn-close();
            exit;
        }
        else {
            if($query_result->num_rows <= 0) {
                $query = "SELECT convites FROM Usuarios WHERE Login = '$login'";
                $query_result = $conn->query($query);
                if($query_result === FALSE) {
                    echo "Erro: " . $conn->error;
                    $conn-close();
                    exit;
                }
                else {
                    $row = $query_result->fetch_assoc();
                    $convites = json_decode($row["convites"]);
                    $conviteIndex = array_search($bolao, $convites);
                    array_splice($convites, $conviteIndex, 1);
                    //echo json_encode($convites);
                    $query = "UPDATE Usuarios SET convites = '" . json_encode($convites, JSON_UNESCAPED_UNICODE ) . "' WHERE Login = '$login'";
                    $query_result = $conn->query($query);
                    if($query_result === FALSE) {
                        echo "Erro: " . $conn->error;
                        $conn-close();
                        exit;
                    }
                    else {
                        echo "!exist";
                    }
                }
                exit;
            }
            $row = $query_result->fetch_assoc();
            $apostadores = json_decode($row["apostadores"]);
            array_push($apostadores, $login);
            //echo json_encode($apostadores);
            $query = "UPDATE Boloes SET apostadores = '" . json_encode($apostadores, JSON_UNESCAPED_UNICODE ) . "' WHERE id = '$bolao'";
            $query_result = $conn->query($query);
            if($query_result === FALSE) {
                echo "Erro: " . $conn->error;
                $conn-close();
                exit;
            }
            else {
                $query = "SELECT Convites,Boloes FROM Usuarios WHERE Login = '$login'";
                $query_result = $conn->query($query);
                if($query_result === FALSE) {
                    echo "Erro: " . $conn->error;
                    $conn-close();
                    exit;
                }
                else {
                    $row = $query_result->fetch_assoc();
                    $convites = json_decode($row["Convites"]);
                    $conviteIndex = array_search($bolao, $convites);
                    array_splice($convites, $conviteIndex, 1);
                    $boloes = json_decode($row["Boloes"]);
                    array_push($boloes, $bolao);
                    //var_dump (json_encode($convites) . " " . json_encode($boloes));
                    $query = "UPDATE Usuarios SET Convites = '" . json_encode($convites, JSON_UNESCAPED_UNICODE ) . "',Boloes = '" . json_encode($boloes, JSON_UNESCAPED_UNICODE ) . "' WHERE Login = '$login'";
                    $query_result = $conn->query($query);
                    if($query_result === FALSE) {
                        echo "Erro: " . $conn->error;
                        $conn-close();
                        exit;
                    }
                    else {
                        echo "success";
                    }
                }
            }
        }
        
    }
    else {
        $query = "SELECT convites FROM Usuarios WHERE Login = '$login'";
        $query_result = $conn->query($query);
        if($query_result === FALSE) {
            echo "Erro: " . $conn->error;
            $conn-close();
            exit;
        }
        else {
            $row = $query_result->fetch_assoc();
            $convites = json_decode($row["convites"]);
            $conviteIndex = array_search($bolao, $convites);
            array_splice($convites, $conviteIndex, 1);
            //echo json_encode($convites);
            $query = "UPDATE Usuarios SET convites = '" . json_encode($convites, JSON_UNESCAPED_UNICODE ) . "' WHERE Login = '$login'";
            $query_result = $conn->query($query);
            if($query_result === FALSE) {
                echo "Erro: " . $conn->error;
                $conn-close();
                exit;
            }
            else {
                echo "success";
            }
        }
        
    }
?>