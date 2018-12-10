<?php

    $server = 'localhost';
    $db_user = 'root';
    $db_password = '';

    $conn = new mysqli($server,$db_user,$db_password, "Bolao");

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $login = $_POST['login'];
    $senha = md5($_POST['senha']);
    
        $query = "INSERT INTO Usuarios (Login,Senha,Tipo,Convites,Boloes,Apostas) VALUES " .
            "(\"$login\",\"$senha\",\"usr\",\"{}\",\"{}\",\"{}\")";
  

        if($conn->query($query) == FALSE) {
            echo $query;
            echo $conn->error;
        }
        else {
             echo "
        <!DOCTYPE html>
            <html>
                <head>
                    <title>Bolão</title>
                    <meta charset=\"UTF-8\">
                    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
                    <!--===============================================================================================-->
                    <link rel=\"apple-touch-icon\" sizes=\"57x57\" href=\"../ico/apple-icon-57x57.png\">
                    <link rel=\"apple-touch-icon\" sizes=\"60x60\" href=\"../ico/apple-icon-60x60.png\">
                    <link rel=\"apple-touch-icon\" sizes=\"72x72\" href=\"../ico/apple-icon-72x72.png\">
                    <link rel=\"apple-touch-icon\" sizes=\"76x76\" href=\"../ico/apple-icon-76x76.png\">
                    <link rel=\"apple-touch-icon\" sizes=\"114x114\" href=\"../ico/apple-icon-114x114.png\">
                    <link rel=\"apple-touch-icon\" sizes=\"120x120\" href=\"../ico/apple-icon-120x120.png\">
                    <link rel=\"apple-touch-icon\" sizes=\"144x144\" href=\"../ico/apple-icon-144x144.png\">
                    <link rel=\"apple-touch-icon\" sizes=\"152x152\" href=\"../ico/apple-icon-152x152.png\">
                    <link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"../ico/apple-icon-180x180.png\">
                    <link rel=\"icon\" type=\"image/png\" sizes=\"192x192\"  href=\"../ico/android-icon-192x192.png\">
                    <link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"../ico/favicon-32x32.png\">
                    <link rel=\"icon\" type=\"image/png\" sizes=\"96x96\" href=\"../ico/favicon-96x96.png\">
                    <link rel=\"icon\" type=\"image/png\" sizes=\"16x16\" href=\"../ico/favicon-16x16.png\">
                    <link rel=\"manifest\" href=\"../ico/manifest.json\">
                    <meta name=\"msapplication-TileColor\" content=\"#ffffff\">
                    <meta name=\"msapplication-TileImage\" content=\"../ico/ms-icon-144x144.png\">
                    <meta name=\"theme-color\" content=\"#ffffff\">
                    <!--===============================================================================================-->
                    <link rel=\"stylesheet\" type=\"text/css\" href=\"../vendor/bootstrap/../css/bootstrap.min.css\">
                    <!--===============================================================================================-->
                    <link rel=\"stylesheet\" type=\"text/css\" href=\"../fonts/font-awesome-4.7.0/../css/font-awesome.min.css\">
                    <!--===============================================================================================-->
                    <link rel=\"stylesheet\" type=\"text/css\" href=\"../fonts/iconic/../css/material-design-iconic-font.min.css\">
                    <!--===============================================================================================-->
                    <link rel=\"stylesheet\" type=\"text/css\" href=\"../vendor/animate/animate.css\">
                    <!--===============================================================================================-->
                    <link rel=\"stylesheet\" type=\"text/css\" href=\"../vendor/css-hamburgers/hamburgers.min.css\">
                    <!--===============================================================================================-->
                    <link rel=\"stylesheet\" type=\"text/css\" href=\"../vendor/animsition/../css/animsition.min.css\">
                    <!--===============================================================================================-->
                    <link rel=\"stylesheet\" type=\"text/css\" href=\"../vendor/select2/select2.min.css\">
                    <!--===============================================================================================-->
                    <link rel=\"stylesheet\" type=\"text/css\" href=\"../vendor/daterangepicker/daterangepicker.css\">
                    <!--===============================================================================================-->
                    <link rel=\"stylesheet\" type=\"text/css\" href=\"../css/util.css\">
                    <link rel=\"stylesheet\" type=\"text/css\" href=\"../css/main.css\">
                    <link rel=\"stylesheet\" type=\"text/css\" href=\"../css/modal.css\">
                    <!--===============================================================================================-->
                    <!--===============================================================================================-->
                    <script src=\"../vendor/jquery/jquery-3.2.1.min.js\"></script>
                    <!--===============================================================================================-->
                    <script src=\"../vendor/animsition/../js/animsition.min.js\"></script>
                    <!--===============================================================================================-->
                    <script src=\"../vendor/bootstrap/../js/popper.js\"></script>
                    <script src=\"../vendor/bootstrap/../js/bootstrap.min.js\"></script>
                    <!--===============================================================================================-->
                    <script src=\"../vendor/select2/select2.min.js\"></script>
                    <!--===============================================================================================-->
                    <script src=\"../vendor/daterangepicker/moment.min.js\"></script>
                    <script src=\"../vendor/daterangepicker/daterangepicker.js\"></script>
                    <!--===============================================================================================-->
                    <script src=\"../vendor/countdowntime/countdowntime.js\"></script>
                    <!--===============================================================================================-->
                    <script src=\"../js/style.js\"></script>
                    <script src=\"../js/Usuario.js\"></script>
                    <script src=\"../js/Administrador.js\"></script>
                    <script src=\"../js/Apostador.js\"></script>
                    <script src=\"../js/FormHandler.js\"></script>
                    <script src=\"../js/index.js\"></script>
                </head>
";
            echo "
            <body>
            <div class=\"limiter\">
                    <div class=\"container-login100\">
                        <div class=\"wrap\">
                                <span class=\"form-title p-b-26\">
                                    Sistema de Bolão
                                </span>
                                <span class=\"form-title p-b-48\">
                                    <img style=\"height: 3em;\" src=\"../images/black.png\"/>
                                </span>
                                    <div class=\"text-center\">
                                    Parabéns,agora você esta cadastrado.    
                                     </div>
                                     <button id=\"voltarpinicial-cadastro\" href=\"../index.php\" style=\"color: white; background: black;padding: 0.5em;margin: 0.5em;border-radius: 5px;\" type=\"button\">Clique aqui para voltar para tela de login</button>
                                     
                        </div>
                    </div>
                </div>
            </body>
        ";
    echo "
        <div id=\"myModal\" class=\"modal\">
        </div>
    </html>";
        }

    

    $conn->close();

?>
