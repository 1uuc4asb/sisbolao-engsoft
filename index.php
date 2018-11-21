<?php

    $login_cookie = $_COOKIE['login'];
    $type_cookie = $_COOKIE['tipo'];

    if(isset($login_cookie)) {

        setcookie('login',"", 1 , "/");
        if ($type_cookie == "adm") { 
            setcookie('tipo', "", 1 , "/");
            echo "
                <!DOCTYPE html>
                <html lang=\"en\">

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
                    <!--===============================================================================================-->
                </head>

                <body>
                    <div class=\"limiter\">
                        <div class=\"container-login100\">
                            <div class=\"wrap\">
                                Eai administrador $login_cookie!
                                Beleza, seu usuário existe, mas eu ainda não fiz uma página pra isso kk <br/> Eu irei te deslogar para que você possa ter a incrível emoção de logar novamente. Basta atualizar a página.<br/>
                                <a href=\"../index.php\"> Atualize a página para mim </a>
                            </div>
                        </div>
                    </div>


                    <div id=\"dropDownSelect1\"></div>

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
                <script src=\"js/forms-handling.js\"></script>

                </body>

                </html>
            ";
        }
        else {
            echo "
                <!DOCTYPE html>
                <html lang=\"en\">

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
                    <!--===============================================================================================-->
                </head>

                <body>
                    <div class=\"limiter\">
                        <div class=\"container-login100\">
                            <div class=\"wrap\">
                                Eai usuário $login_cookie !
                                Beleza, seu usuário existe, mas eu ainda não fiz uma página pra isso kk <br/> Eu irei te deslogar para que você possa ter a incrível emoção de logar novamente. Basta atualizar a página.<br/>
                                <a href=\"../index.php\"> Atualize a página para mim </a>
                            </div>
                        </div>
                    </div>


                    <div id=\"dropDownSelect1\"></div>

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
                <script src=\"js/forms-handling.js\"></script>

                </body>

                </html>
            ";
        }
    }
    else {
        echo "
            <!DOCTYPE html>
            <html lang=\"en\">
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
                <!--===============================================================================================-->
            </head>
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
                                    <a id=\"cadastro\" class=\"txt2\">
                                        Cadastre-se
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div id=\"dropDownSelect1\"></div>
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
                <script src=\"js/forms-handling.js\"></script>
            </body>
        </html>
        ";
    }

?>
