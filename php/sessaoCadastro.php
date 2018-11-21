<?php
    echo "
        <form id=\"cadastro-form\" action=\"/php/cadastro.php\" method=\"POST\" class=\"form validate-form\">
            <span class=\"form-title p-b-26\">
                Cadastre-se no melhor site de bolão agora!
            </span>
            <span class=\"form-title p-b-48\">
                <img style=\"height: 3em;\" src=\"images/black.png\"/>
            </span>
            <div class=\"wrap-input100 validate-input\" data-validate=\"Digite seu login!\">
                <input id=\"login-input2\" class=\"input100\" type=\"text\" name=\"login\">
                <span class=\"focus-input100\" data-placeholder=\"Login\"></span>
            </div>
            <div i class=\"wrap-input100 validate-input\" data-validate=\"Digite sua senha!\">
                <span class=\"btn-show-pass\">
                    <i class=\"zmdi zmdi-eye\"></i>
                </span>
                <input id=\"pass1\"class=\"input100\" type=\"password\">
                <span class=\"focus-input100\" data-placeholder=\"Senha\"></span>
            </div>
            <div class=\"wrap-input100 validate-input\" data-validate=\"Digite sua senha!\">
                <span class=\"btn-show-pass\">
                    <i class=\"zmdi zmdi-eye\"></i>
                </span>
                <input id=\"pass2\" class=\"input100\" type=\"password\" name=\"senha\">
                <span class=\"focus-input100\" data-placeholder=\"Confirme sua senha\"></span>
            </div>
            <div class=\"container-form-btn\">
                <div class=\"wrap-form-btn\">
                    <div class=\"form-bgbtn\"></div>
                    <button class=\"form-btn\">
                        Cadastrar-se
                    </button>
                </div>
            </div>
        </form>
    ";
?>
