<?php
    $server = 'localhost';
    $db_user = 'root';
   $db_password = 'xxxxxxxxxxxx'; 

    $conn = new mysqli($server,$db_user,$db_password, "Bolao");

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $login = $_POST["login"];
    $senha = md5($_POST["senha"]);

    
    
    $query = "SELECT * FROM Usuários WHERE BINARY Login = \"$login\"";
    $query_result = $conn->query($query);

    if($query_result->num_rows <= 0) {
        echo "Usuario não cadastrado porra!<br/>";
        echo "<a href=\"../index.php\"> Por enquando volte para o inicio </a>";
    }
    else {
        $user = $query_result->fetch_assoc();
        if($user["Senha"] == $senha) {
            if($user["Tipo"] == "adm") {
                setcookie('tipo','adm', 0 , '/');
            }
            else {
                setcookie('tipo','usr', 0 , '/');
            }
            setcookie('login',$login, 0 , '/');
            header("Location:../index.php");
        }
        else {
            echo "Brother, teu usuário existe, mas você esqueceu sua senha!<br/>";
            echo "<a href=\"../index.php\"> Por enquando volte para o inicio </a>";
        }
    }

    $conn->close();
?>
