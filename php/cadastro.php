<?php

    $server = 'localhost';
    $db_user = 'root';
    $db_password = 'x';

    $conn = new mysqli($server,$db_user,$db_password, "Bolao");

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $login = $_POST['login'];
    $senha = md5($_POST['senha']);

    $query = "SELECT Login FROM Usuários WHERE Login = \"$login\"";
    $query_result = $conn->query($query);

    $login_igual = $query_result->fetch_array();


    if($login == $login_igual[0]) {
        echo $query;
        echo "<br/>";
        echo "Mostrar que já existe alguem com este login cabeçon";
    }
    else {
        echo $query;
        echo "<br/>";
        $query = "INSERT INTO Usuários (Login,Senha,Tipo,Convites,Bolões,Apostas) VALUES " .
            "(\"$login\",\"$senha\",\"usr\",\"{}\",\"{}\",\"{}\")";
        if($conn->query($query) != TRUE) {
            echo "Retorna um erro ai";
        }
        else {
            echo "Tu ta cadastrado brother!";
            echo "<br/>";
            echo $query;

        }

    }

    $conn->close();

?>
