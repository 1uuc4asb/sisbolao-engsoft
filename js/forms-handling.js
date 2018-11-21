(function ($) { //Realizar requisição http para chamar a página de cadastro
    $(document).on("click", "#cadastro", function () {
        var xmlhttp;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                //console.log(xmlhttp.responseText);
                $(".wrap")[0].innerHTML = xmlhttp.responseText;
            }
        }

        xmlhttp.open("GET", "../php/sessaoCadastro.php");
        xmlhttp.send();
    });



    /*==================================================================
        [ Validate ]*/

    $(document).on('submit', '.validate-form', function (e) {
        e.preventDefault();
        var check = true;
        var input = $('.validate-input .input100');
        console.log(input);
        console.log($("#login-input"));
        var verifylogin_flag = true;
        for (var i = 0; i < input.length; i++) {
            var validation = validate(input[i]);
            //console.log(validation);
            if (validation.answer == false) {
                showValidate(input[i], validation.type);
                verifylogin_flag = false;
                console.log(input[i].id == "input-login");
                check = false;
            }
        }
        var formao = this;
        var form_id = this.id;
        //console.log(this);
        if (verifylogin_flag) {
            var xmlhttp2;
            if (window.XMLHttpRequest) {
                xmlhttp2 = new XMLHttpRequest();
            } else {
                xmlhttp2 = new ActiveXObject("Microsoft.XMLHTTP");
            }
            if (form_id == "login-form") {
                xmlhttp2.onreadystatechange = function () {
                    if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
                        if (xmlhttp2.responseText == "exist") {
                            console.log("existe");
                            var xmlhttp3;
                            if (window.XMLHttpRequest) {
                                xmlhttp3 = new XMLHttpRequest();
                            } else {
                                xmlhttp3 = new ActiveXObject("Microsoft.XMLHTTP");
                            }
                            xmlhttp3.onreadystatechange = function () {
                                if (xmlhttp3.readyState == 4 && xmlhttp3.status == 200) {
                                    //alert(xmlhttp3.responseText);
                                    if (xmlhttp3.responseText == "correct") {
                                        console.log("#" + form_id);
                                        $(document).off("submit");
                                        $("#" + form_id).submit();
                                        //alert("entrou aq :)");
                                    } else {
                                        showValidate($("#pass-input"), 5);
                                        check = false;
                                    }
                                }
                            }
                            xmlhttp3.open("POST", "../php/verifypassword.php", "false");
                            xmlhttp3.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                            xmlhttp3.send("login=" + $("#login-input").val() + "&senha=" + $("#pass-input").val());
                        } else {
                            //Mostrar em div que o login ta incorreto
                            console.log("!existe");
                            showValidate($("#login-input"), 4);
                            check = false;
                        }
                    }
                }
            } else if (form_id == "cadastro-form") {
                xmlhttp2.onreadystatechange = function () {
                    if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
                        if (xmlhttp2.responseText == "exist") {
                            // div mostrar que usuário está em uso!
                            console.log(xmlhttp2.responseText);
                            showValidate($("#login-input2"), 3);
                            check = false;
                        } else {
                            $(document).off("submit");
                            $("#" + form_id).submit();
                        }
                    }
                }
            }
            xmlhttp2.open("POST", "../php/verifylogin.php", "false");
            xmlhttp2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            var loginValue = $("#login-input").val();
            if (form_id == "cadastro-form") {
                loginValue = $("#login-input2").val();
            }
            xmlhttp2.send("login=" + loginValue);
        }
    });


    /*$('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });*/

    $(document).on("focus", '.validate-form .input100', function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function validate(input) {
        var resposta = {
            answer: true,
            type: 1
        };
        if ($(input).val().trim() == "") {
            resposta.answer = false;
        } else if ($(input).prop('id') == "pass2") {
            if ($(input).val() != $("#pass1").val()) {
                resposta.answer = false;
                resposta.type = 2;
            }
        }
        //console.log(resposta);
        return resposta;

    }

    function showValidate(input, type) {
        var thisAlert = $(input).parent();
        if (type == 2) { // Cadastro - Senhas não identicas
            thisAlert.attr("data-validate", "As senhas não são idênticas.");
        }
        if (type == 3) { // Cadastro - Login existe
            thisAlert.attr("data-validate", "Este login já existe. Tente outro!");
        }
        if (type == 4) { // Login - Login incorreto
            thisAlert.attr("data-validate", "Este login não existe em nosso banco.");
        }
        if (type == 5) { // Senha incorreta
            thisAlert.attr("data-validate", "Senha incorreta.");
        }
        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
})(jQuery);
