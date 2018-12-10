<?php
    $server = 'localhost';
    $db_user = 'root';
    $db_password = 'Lucas@2301';

    $conn = new mysqli($server,$db_user,$db_password, "Bolao");

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $login_cookie = $_COOKIE['login'];
    $type_cookie = $_COOKIE['tipo'];

    echo "
        <!DOCTYPE html>
            <html>
                <head>
                    <title>Bolão</title>
                    <meta charset=\"UTF-8\">
                    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
                    <!--===============================================================================================-->
                    <link rel=\"apple-touch-icon\" sizes=\"57x57\" href=\"ico/apple-icon-57x57.png\">
                    <link rel=\"apple-touch-icon\" sizes=\"60x60\" href=\"ico/apple-icon-60x60.png\">
                    <link rel=\"apple-touch-icon\" sizes=\"72x72\" href=\"ico/apple-icon-72x72.png\">
                    <link rel=\"apple-touch-icon\" sizes=\"76x76\" href=\"ico/apple-icon-76x76.png\">
                    <link rel=\"apple-touch-icon\" sizes=\"114x114\" href=\"ico/apple-icon-114x114.png\">
                    <link rel=\"apple-touch-icon\" sizes=\"120x120\" href=\"ico/apple-icon-120x120.png\">
                    <link rel=\"apple-touch-icon\" sizes=\"144x144\" href=\"ico/apple-icon-144x144.png\">
                    <link rel=\"apple-touch-icon\" sizes=\"152x152\" href=\"ico/apple-icon-152x152.png\">
                    <link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"ico/apple-icon-180x180.png\">
                    <link rel=\"icon\" type=\"image/png\" sizes=\"192x192\"  href=\"ico/android-icon-192x192.png\">
                    <link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"ico/favicon-32x32.png\">
                    <link rel=\"icon\" type=\"image/png\" sizes=\"96x96\" href=\"ico/favicon-96x96.png\">
                    <link rel=\"icon\" type=\"image/png\" sizes=\"16x16\" href=\"ico/favicon-16x16.png\">
                    <link rel=\"manifest\" href=\"ico/manifest.json\">
                    <meta name=\"msapplication-TileColor\" content=\"#ffffff\">
                    <meta name=\"msapplication-TileImage\" content=\"ico/ms-icon-144x144.png\">
                    <meta name=\"theme-color\" content=\"#ffffff\">
                    <!--===============================================================================================-->
                    <link rel=\"stylesheet\" type=\"text/css\" href=\"vendor/bootstrap/css/bootstrap.min.css\">
                    <!--===============================================================================================-->
                    <link rel=\"stylesheet\" type=\"text/css\" href=\"fonts/font-awesome-4.7.0/css/font-awesome.min.css\">
                    <!--===============================================================================================-->
                    <link rel=\"stylesheet\" type=\"text/css\" href=\"fonts/iconic/css/material-design-iconic-font.min.css\">
                    <!--===============================================================================================-->
                    <link rel=\"stylesheet\" type=\"text/css\" href=\"vendor/animate/animate.css\">
                    <!--===============================================================================================-->
                    <link rel=\"stylesheet\" type=\"text/css\" href=\"vendor/css-hamburgers/hamburgers.min.css\">
                    <!--===============================================================================================-->
                    <link rel=\"stylesheet\" type=\"text/css\" href=\"vendor/animsition/css/animsition.min.css\">
                    <!--===============================================================================================-->
                    <link rel=\"stylesheet\" type=\"text/css\" href=\"vendor/select2/select2.min.css\">
                    <!--===============================================================================================-->
                    <link rel=\"stylesheet\" type=\"text/css\" href=\"vendor/daterangepicker/daterangepicker.css\">
                    <!--===============================================================================================-->
                    <link rel=\"stylesheet\" type=\"text/css\" href=\"css/util.css\">
                    <link rel=\"stylesheet\" type=\"text/css\" href=\"css/main.css\">
                    <link rel=\"stylesheet\" type=\"text/css\" href=\"css/modal.css\">
                    <!--===============================================================================================-->
                    <!--===============================================================================================-->
                    <script src=\"vendor/jquery/jquery-3.2.1.min.js\"></script>
                    <!--===============================================================================================-->
                    <script src=\"vendor/animsition/js/animsition.min.js\"></script>
                    <!--===============================================================================================-->
                    <script src=\"vendor/bootstrap/js/popper.js\"></script>
                    <script src=\"vendor/bootstrap/js/bootstrap.min.js\"></script>
                    <!--===============================================================================================-->
                    <script src=\"vendor/select2/select2.min.js\"></script>
                    <!--===============================================================================================-->
                    <script src=\"vendor/daterangepicker/moment.min.js\"></script>
                    <script src=\"vendor/daterangepicker/daterangepicker.js\"></script>
                    <!--===============================================================================================-->
                    <script src=\"vendor/countdowntime/countdowntime.js\"></script>
                    <!--===============================================================================================-->
                    <script src=\"js/style.js\"></script>
                    <script src=\"js/Bolao.js\"></script>
                    <script src=\"js/Jogo.js\"></script>
                    <script src=\"js/Usuario.js\"></script>
                    <script src=\"js/Administrador.js\"></script>
                    <script src=\"js/Apostador.js\"></script>
                    <script src=\"js/FormHandler.js\"></script>
                    <script src=\"js/index.js\"></script>
                </head>
";

    if(isset($login_cookie)) {
        if ($type_cookie == "adm") {
            echo "
                <body>
                    <div class=\"limiter\">
                        <div class=\"container-login100\">
                            <ul style=\"width: 100%;\">
                                <li id=\"cria-bolao\" style=\"float: left;\" class=\"menu-li clickable\"> Criar Bolão </li>
                                <li id=\"logout-btn\" class=\"menu-li clickable\"> Logout </li>
                                <span style=\"float: right; padding: 14px 16px;border-radius: 10px;\"> E ai administrador $login_cookie! </span>
                            </ul>
                            <div id=\"bolao_panel\">
                                Bolões que vocẽ administra: </br>
                                <ul id=\"adm-bolao-list\">";
            
                                $query = "SELECT * FROM Boloes";
                                $query_result = $conn->query($query);
                                
                                while($row = $query_result->fetch_assoc()) {
                                    $admobj = json_decode($row["administrador"]);
                                    $apostadoresarr = json_decode($row["apostadores"]);
                                    $jogosarr = json_decode($row["jogos"]);
                                    // Calcular número de apostas e montante
                                    $montanteTotal = 0;
                                    $nApostasTotal = 0;
                                    for($i = 0; $i < count($jogosarr); $i++) {
                                        $nApostasTotal += count($jogosarr[$i]->apostas);
                                        $montanteTotal += $jogosarr[$i]->montante;
                                    }
                                    //$oi = var_dump ($admobj);
                                    //echo $oi;
                                    if($admobj->login == $login_cookie) {
                                        echo "<li id=\"" . $row["id"] . "\" class=\"bolao-list-adm clickable\"> Bolão " . $row["id"] . " - Quantidade de apostadores: " . count($apostadoresarr) . " / Quantidade de jogos: " . count($jogosarr) . " / Quantidade total de apostas: " . $nApostasTotal . " / Montante total do Bolão: " . $montanteTotal .  " R$ <img class=\"boloes-icon\" src=\"../images/config.png\"> </li>";
                                    }
                                }
                                echo "</ul>
                            </div>
                        </div>
                    </div>
                </body>";
        }
        else {
            echo "
                <body>
                    <div class=\"limiter\">
                        <div class=\"limiter\">
                        <div class=\"container-login100\">
                            <ul style=\"width: 100%;\">
                                <li style=\"float: left;\" class=\"menu-li clickable\"> Visualizar convites </li>
                                <li id=\"logout-btn\" class=\"menu-li clickable\"> Logout </li>
                                <span style=\"float: right; padding: 14px 16px;border-radius: 10px;\"> E ai usuário $login_cookie! </span>
                            </ul>
                            <div id=\"bolao_panel\">
                                Eai usuário $login_cookie!
                                Beleza, seu usuário existe, mas eu ainda estou fazendo uma página pra isso kk <br/>
                                Aqui irão aparecer os seus bolões. Já já você verá! </br>
                            </div>
                        </div>
                    </div>
                </body>
            ";
        }
    }
    else {
        echo "
            <body>
            <div class=\"limiter\">
                    <div class=\"container-login100\">
                        <div class=\"wrap\">
                            <form id=\"login-form\" action=\"/php/login.php\" method=\"POST\" class=\"form validate-form\">
                                <span class=\"form-title p-b-26\">
                                    Sistema de Bolão
                                </span>
                                <span class=\"form-title p-b-48\">
                                    <img style=\"height: 3em;\" src=\"images/black.png\"/>
                                </span>
                                    <div class=\"wrap-input100 validate-input\" data-validate=\"Digite seu login!\">
                                    <input id=\"login-input\" class=\"input100\" type=\"text\" name=\"login\">
                                    <span class=\"focus-input100\" data-placeholder=\"Login\"></span>
                                </div>
                                    <div class=\"wrap-input100 validate-input\" data-validate=\"Digite sua senha!\">
                                        <span class=\"btn-show-pass\">
                                            <i class=\"zmdi zmdi-eye\"></i>
                                        </span>
                                        <input id=\"pass-input\" class=\"input100\" type=\"password\" name=\"senha\">
                                        <span class=\"focus-input100\" data-placeholder=\"Senha\"></span>
                                    </div>
                                    <div class=\"container-form-btn\">
                                    <div class=\"wrap-form-btn\">
                                        <div class=\"form-bgbtn\"></div>
                                        <button class=\"form-btn\">
                                            Login
                                        </button>
                                    </div>
                                </div>
                                    <div class=\"text-center p-t-115\">
                                    <span class=\"txt1\">
                                        Não tem conta?
                                    </span>
                                    <span id=\"cadastro\" class=\"txt2 clickable\">
                                        Cadastre-se
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </body>
        ";
    }
    echo "
        <div id=\"myModal\" class=\"modal\">
        </div>
    </html>";
?>
