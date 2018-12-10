(function ($) {
    //Assim que iniciarmos a pagina index.php inciaremos este script.

    //Instanciar o objeto de form handling
    var formHandler = new FormHandler();

    // https://www.w3schools.com/js/js_cookies.asp -- COMO VERIRFICAR OS COOKIES. VAMOS TRABALAHR COM ISSO.
    var cookies = document.cookie;
    if (!cookies.includes("login")) {
        console.log("Não logado.");
    } else {
        /*$.getScript("js/Usuario.js", function () {
            alert("Script loaded but not necessarily executed.");
        });
        $.getScript("js/Administrador.js", function () {
            alert("Script loaded but not necessarily executed.");
        });
        $.getScript("js/Apostador.js", function () {
            alert("Script loaded but not necessarily executed.");
        });*/
        console.log(cookies);
        let login = cookies.substr(cookies.indexOf("login=") + 6, cookies.indexOf(";") - (cookies.indexOf("login=") + 6));
        console.log("O login da criatura é:", login);
        if (cookies.search("adm")) {
            console.log("É adm");
            //var usuario1 = new Usuario(login);
            var usuario = new Administrador(login);
            console.log(usuario.getLogin());
        } else {
            console.log("É usuario");
            var usuario = new Apostador(login);
        }
    }
    
    
    /*================================================================== Janela geral ==================================================================*/
    
    /*================================================================== Criar bolão  ==================================================================*/
    $(document).on("click", "#cria-bolao", function () {
        console.log($("#myModal"));
        let gamenumber = $(".modal-game").length + 1;
        let game = "<div class=\"modal-game\">" +
                        "<h3> Jogo " + gamenumber + "</h3><br/>" +
                        "<div class=\"wrap-input100\" data-validate=\"Digite o nome do time!\">" +
                            "<input class=\"modal-game-team1 input100\" type=\"text\"/>" +
                            "<span class=\"focus-input100\" data-placeholder=\"Time 1\"></span>" +
                        "</div>" +
                        "<div class=\"wrap-input100\" data-validate=\"Digite o nome do time!\">" +
                            "<input class=\"modal-game-team2 input100\" type=\"text\"/>" +
                            "<span class=\"focus-input100\" data-placeholder=\"Time 2\"></span>" +
                        "</div>" +
                        "Data/Horário do jogo:" +
                        "<div class=\"wrap-input100\" data-validate=\"*\">" +
                            "<input class=\"modal-game-date datetime\" type=\"datetime-local\"/>" +
                        "</div>" +
                        "Tempo limite de apostas até... " +
                        "<div class=\"wrap-input100\" style=\"margin-bottom: auto;\" data-validate=\"*\">" +
                            "<input value=\"0\" style=\"width: 3em\" class=\"modal-game-timelimitday datetime\" type=\"number\"/> dia(s) <input value=\"0\" style=\"width: 3em\" class=\"modal-game-timelimithour datetime\" type=\"number\"/> hora(s) e <input value=\"30\" style=\"width: 3em\" class=\"modal-game-timelimitminute datetime\" type=\"number\"/> minuto(s)" +
                        "</div>" +
                        "...antes do início do jogo" +
                    "</div>";
        let modalcontent = "<div class=\"modal-content\" style=\"left: 5em;\">" +
                                "<div class=\"modal-header\">" +
                                    "<span class=\"close\">&times;</span>" +
                                    "<h2>Criar um bolão</h2>" +
                                "</div>" +
                                "<div class=\"modal-body\" style=\"text-align: center;\">" +
                                    "<button id=\"add-game-modal\"> Adicionar jogo </button>" +
                                    "<button id=\"remove-game-modal\"> Remover jogo </button>" +
                                    "<div id=\"created-games-modal\">" + game + "</div>" +
                                    "<div> Personalizar regras de pontuação do bolão? <input id=\"habilitar-scorerules\" type=\"checkbox\"/></div>" +
                                    "<div id=\"scorerules\" style=\"display: none;\"> " +
                                        "<h3> Quantidade de pontos ganhos ao: </h3><br/>" +
                                        "acertar o placar: " +
                                        "<div class=\"wrap-input100\" data-validate=\"*\">" +
                                            "<input id=\"rightscore\" class=\"datetime\" type=\"number\" value=\"100\"/> Pontos" +
                                        "</div>" +
                                        "acertar apenas o vencedor: " +
                                        "<div class=\"wrap-input100\" data-validate=\"*\">" +
                                            "<input id=\"rightwinner\" class=\"datetime\" type=\"number\" value=\"80\"/> Pontos" +
                                        "</div>" +
                                        "Acertar a quantidade de gols de um dos times: " +
                                        "<div class=\"wrap-input100\" style=\"margin: auto;\" data-validate=\"*\">" +
                                            "<input id=\"rightone\" class=\"datetime\" type=\"number\" value=\"30\"/> Pontos" +
                                        "</div>" +
                                    "</div>" +
                                    "<div>" + 
                                        "Personalizar regras de desempate do bolão? <input id=\"habilitar-tiebreakerrules\" type=\"checkbox\"/>" + 
                                    "</div>" +
                                    "<div id=\"tiebreakerrules\" style=\"display: none;\">" +
                                        "<h3>Em caso de dois jogadores obterem a mesma pontuação no bolão, qual será o critério de desempate?</h3>" +
                                        "<select id=\"tiebreakselect\">" +
                                            "<option value=\"random\"> Aleatoriamente </option>" +
                                            "<option value=\"ordemalfabetica\"> Ordem Alfabética </option>" +
                                            "<option value=\"nboloes\"> Número de bolões em que jogador está inserido </option>" +
                                        "</select>" +
                                    "</div>" +
                                    "<div><button id=\"criar-bolao-modal\"> Criar Bolão </button></div>" +
                                "</div>" +
                            "</div>";
        $("#myModal").html(modalcontent);
        $("#myModal").css("display", "block");
    });
    
    $(document).on("change", "#habilitar-scorerules", function () {
        if($("#scorerules").css("display") == "none") {
            $("#scorerules").css("display", "inline-block");
        }
        else {
            $("#scorerules").css("display", "none");
        }
    });
    
    $(document).on("change", "#habilitar-tiebreakerrules", function () {
        if($("#tiebreakerrules").css("display") == "none") {
            $("#tiebreakerrules").css("display", "inline-block");
        }
        else {
            $("#tiebreakerrules").css("display", "none");
        }
    });

    $(document).on("click", ".close", function () {
        $("#myModal").css("display", "none");
    });
    
    $(document).on("click", "#add-game-modal", function () {
        let gamenumber = $(".modal-game").length + 1;
        let game = "<div class=\"modal-game\">" +
                        "<h3> Jogo " + gamenumber + "</h3><br/>" +
                        "<div class=\"wrap-input100\" data-validate=\"Digite o nome do time!\">" +
                            "<input class=\"modal-game-team1 input100\" type=\"text\"/>" +
                            "<span class=\"focus-input100\" data-placeholder=\"Time 1\"></span>" +
                        "</div>" +
                        "<div class=\"wrap-input100\" data-validate=\"Digite o nome do time!\">" +
                            "<input class=\"modal-game-team2 input100\" type=\"text\"/>" +
                            "<span class=\"focus-input100\" data-placeholder=\"Time 2\"></span>" +
                        "</div>" +
                        "Data/Horário do jogo:" +
                        "<div class=\"wrap-input100\" data-validate=\"*\">" +
                            "<input class=\"modal-game-date datetime\" type=\"datetime-local\"/>" +
                        "</div>" +
                        "Tempo limite de apostas até... " +
                        "<div class=\"wrap-input100\" style=\"margin-bottom: auto;\" data-validate=\"*\">" +
                            "<input value=\"0\" style=\"width: 3em\" class=\"modal-game-timelimitday datetime\" type=\"number\"/> dia(s) <input value=\"0\" style=\"width: 3em\" class=\"modal-game-timelimithour datetime\" type=\"number\"/> hora(s) e <input value=\"30\" style=\"width: 3em\" class=\"modal-game-timelimitminute datetime\" type=\"number\"/> minuto(s)" +
                        "</div>" +
                        "...antes do início do jogo" +
                    "</div>";
        //let modalcontent = $("#created-games-model").html() + game;
        //$("#created-games-model").html(modalcontent);
        $("#created-games-modal").append(game);
    });
    
    $(document).on("click", "#remove-game-modal", function () {
        if($(".modal-game").length > 1) {
            let gametoremoveindex = $(".modal-game").length - 1;
            //console.log($(".modal-game")[gametoremoveindex]);
            $(".modal-game")[gametoremoveindex].remove();
        }
    });
    
    $(document).on("click", "#criar-bolao-modal", function (e) {
        var bolaoelements = $("." + e.currentTarget.offsetParent.className);
        //console.log(bolaoelements.find("input"));
        usuario.criarBolao(bolaoelements, formHandler);
    })
    
    /*================================================================== Criar bolão  ==================================================================*/
        
    /*================================================================== Janela geral ==================================================================*/

    //Realizar requisição http para chamar a página de cadastro
    $(document).on("click", "#cadastro", function () {
        formHandler.cadastrarUsuario();
    });

    $(document).on("click", "#refresh", function () {
        location.reload();
    });


    /*==================================================================
        [ Validate ]*/

    $(document).on("click", "#logout-btn", function () {
        formHandler.deslogar();
    });

    $(document).on('submit', '.validate-form', function (e) {
        formHandler.validarFormularioLoginCadastro(e, this);
    });

    $(document).on("focus", 'input, .validate-form .input100', function () {
        console.log("foco");
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
})(jQuery);
