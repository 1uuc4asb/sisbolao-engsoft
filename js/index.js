(function ($) {
    //Assim que iniciarmos a pagina index.php inciaremos este script.

    //Instanciar o objeto de form handling
    var formHandler = new FormHandler();

    // https://www.w3schools.com/js/js_cookies.asp -- COMO VERIRFICAR OS COOKIES. VAMOS TRABALAHR COM ISSO.
    
    /*================================================================== Cookies ==================================================================*/
    
    $(document).on("click", "#cookie-permission", function () {
        $.ajax({
            url: "../php/cookie-permission.php"
        }).done(function () {
            console.log("Cookie permitido!");
            location.reload();
        })
    });
    
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
        //console.log(cookies);
        let login = cookies.substring(cookies.indexOf("login=") + 6, cookies.indexOf(";", cookies.indexOf("login=")));
        //console.log(cookies.indexOf(";", cookies.indexOf("login=")));
        //console.log("O login da criatura é:", login);
        if (cookies.search("adm") != -1) {
            //console.log("É adm");
            //var usuario1 = new Usuario(login);
            var usuario = new Administrador(login);
            let mudou = false;
            setInterval(function () {
                if($("#myModal").css("display") != "none") {
                    mudou = true;
                }
                if(mudou && $("#myModal").css("display") == "none") {
                    mudou = false;
                    $.ajax({
                        url: "../php/mostrarTabelaAdm.php",
                        method: "POST",
                        data: { login: usuario.getLogin()}
                    }).done(function (msg) {
                        $(".container-login100").html(msg);
                        //alert("Atualizou boy");
                    });
                }
            });
            //console.log(usuario.getLogin());
            //console.log(login);
        } else {
            //console.log("É usuario");
            var usuario = new Apostador(login);
            $.ajax({
                url: "../php/pegaApostadorById.php",
                method: "POST",
                data: { login: usuario.getLogin() }
            }).done(function (msg) {
                //console.log("ASDSDASA: ", msg);
                var usrObj = JSON.parse(msg);
                usuario.setBoloes(usrObj.boloes);
                usuario.setApostas(usrObj.apostas);
            });
            let mudou = false;
            setInterval(function () {
                if($("#myModal").css("display") != "none") {
                    mudou = true;
                }
                if(mudou && $("#myModal").css("display") == "none") {
                    mudou = false;
                    $.ajax({
                        url: "../php/mostrarTabelaUsr.php",
                        method: "POST",
                        data: { login: usuario.getLogin()}
                    }).done(function (msg) {
                        $(".container-login100").html(msg);
                        //alert("Atualizou boy");
                    });
                }
            });
        }
    }
    
    /*================================================================== Cookies ==================================================================*/
    
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
    
    /*================================================================== Visualizar Bolão  ==================================================================*/
    $(document).on("click", ".bolao-list-adm,.bolao-list-usr", function () {
        usuario.visualizarBolao(this.id);
    });
    
    $(document).on("click", ".rmv-bolao", function () {
        if(confirm("Você deseja mesmo exluir este bolão? Todos os dados serão perdidos permanentemente.")) {
            usuario.excluirBolao(this.id);
        }
    });
    
    $(document).on("click", "#invite-usr-btn", function () {
        var nickApostador = $("#invite-usr").val();
        if(confirm("Você deseja convidar o usuário " + nickApostador + "?")) {
            usuario.convidarApostadorParaBolao($(".rmv-bolao").attr("id"),nickApostador);
        }
    });
    
    $(document).on("click", "#rmv-usr-btn", function () {
        var nickApostador = $("#rmv-usr").val();
        if(nickApostador != "" && nickApostador != null && nickApostador) {
            if(confirm("Você deseja excluir o usuário " + nickApostador + " do bolão?")) {
                usuario.excluirApostadorDeBolao($(".rmv-bolao").attr("id"),nickApostador);
            }
        }
    });
    
    $(document).on("click", ".register-game-result", function () {
        var game_id = this.id;
        var bolao_id = $($(this.parentNode.parentNode.parentNode).find(".rmv-bolao")).attr("id");
        //console.log("game  e bolao", game_id, bolao_id);
        usuario.registrarResultadoJogo(bolao_id,game_id);
    });
    
    $(document).on("click", ".inserir-palp", function () {
        console.log($(this.parentNode).find(".teams").html());
        var times = $(this.parentNode).find(".teams").html();
        var team1 = times.substring(0,times.indexOf("X") - 1);
        var team2 = times.substring(times.indexOf("X") + 2);
        var gol_team1 = prompt("Quantos gols você acha que o " + team1 + " vai marcar?");
        if(gol_team1 != null) {
            if(gol_team1 == "") {
                alert("Você deve digitar uma quantidade de gols!")
            }
            else {
                if(isNaN(parseInt(gol_team1))) {
                    alert("Você deve digitar um número inteiro!");
                }
                else {
                    var confirmaçãoTime1 = confirm("Você tem certeza de que o " + team1 + " fará " + gol_team1 + " gol(s)?");
                    if(confirmaçãoTime1) {
                        var gol_team2 = prompt("Quantos gols você acha que o " + team2 + " vai marcar?");
                        if(gol_team2 == "") {
                            alert("Você deve digitar uma quantidade de gols!")
                        }
                        else {
                            if(isNaN(parseInt(gol_team2))) {
                                alert("Você deve digitar um número inteiro!");
                            }
                            else {
                                var confirmaçãoTime2 = confirm("Você tem certeza de que o " + team2 + " fará " + gol_team2 + " gol(s)?");
                                if(confirmaçãoTime2) {
                                    console.log("O palpite do otário é:", gol_team1 + "X" + gol_team2);
                                    var valor = prompt("Quanto dinheiro você irá apostar?");
                                    if(valor == "") {
                                        alert("Você deve digitar um valor!")
                                    }
                                    else {
                                        if(isNaN(parseFloat(valor))) {
                                            alert("Você deve digitar um número real!");
                                        }
                                        else {
                                            var confirmaçãoValor = confirm("Você tem certeza de que deseja apostar R$" + valor + "?");
                                            if(confirmaçãoValor) {
                                                console.log("O otário apostou R$", valor);
                                                let palpite = gol_team1 + "X" + gol_team2;
                                                var aposta = new Aposta(palpite, usuario.getLogin() , valor);
                                                //console.log(aposta);
                                                //console.log(this.id);
                                                var id_bolao = this.id.substring(0,this.id.indexOf("/"));
                                                var id_jogo = this.id.substring(this.id.indexOf("/") + 1);
                                                //console.log("idbolao=", id_bolao);
                                                //console.log("idjogo=", id_jogo);
                                                usuario.inserirpalpite(id_bolao,id_jogo,aposta);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        
    });
    
    $(document).on("click", ".editar-palp", function () {
        console.log($(this.parentNode).find(".teams").html());
        var times = $(this.parentNode).find(".teams").html();
        var team1 = times.substring(0,times.indexOf("X") - 1);
        var team2 = times.substring(times.indexOf("X") + 2);
        var palpiteAnterior = $(this.parentNode).find(".palpite-atual").html().substring($(this.parentNode).find(".palpite-atual").html().indexOf(team1) + team1.length + 1,$(this.parentNode).find(".palpite-atual").html().indexOf(team2) -1);
        //console.log("PALPITE ANTERIOR PARÇA:", palpiteAnterior);
        var palpite1Anterior = palpiteAnterior.substring(0,palpiteAnterior.indexOf("X") - 1);
        var palpite2Anterior = palpiteAnterior.substring(palpiteAnterior.indexOf("X") + 2);
        //console.log("palpite1", palpite1Anterior);
        //console.log("palpite2", palpite2Anterior);
        var gol_team1 = prompt("Em seu palpite anterior o " + team1 + " marcaria " + palpite1Anterior + " gol(s). Quantos gols você acha que o " + team1 + " vai marcar?");
        if(gol_team1 != null) {
            if(gol_team1 == "") {
                alert("Você deve digitar uma quantidade de gols!")
            }
            else {
                if(isNaN(parseInt(gol_team1))) {
                    alert("Você deve digitar um número inteiro!");
                }
                else {
                    var confirmaçãoTime1 = confirm("Você tem certeza de que o " + team1 + " fará " + gol_team1 + " gol(s)?");
                    if(confirmaçãoTime1) {
                        var gol_team2 = prompt("Em seu palpite anterior o " + team2 + " marcaria " + palpite2Anterior + " gol(s). Quantos gols você acha que o " + team2 + " vai marcar?");
                        if(gol_team2 == "") {
                            alert("Você deve digitar uma quantidade de gols!")
                        }
                        else {
                            if(isNaN(parseInt(gol_team2))) {
                                alert("Você deve digitar um número inteiro!");
                            }
                            else {
                                var confirmaçãoTime2 = confirm("Você tem certeza de que o " + team2 + " fará " + gol_team2 + " gol(s)?");
                                if(confirmaçãoTime2) {
                                    console.log("O palpite do otário é:", gol_team1 + "X" + gol_team2);
                                    let palpite = gol_team1 + "X" + gol_team2;
                                    var id_bolao = this.id.substring(0,this.id.indexOf("/"));
                                    var id_jogo = this.id.substring(this.id.indexOf("/") + 1);
                                    usuario.editarpalpite(id_bolao,id_jogo, palpite);
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    
    /*================================================================== Visualizar Bolão  ==================================================================*/
   
    /*================================================================== Visualizar convites  ==================================================================*/
    
     $(document).on("click", ".see-invites", function () {
        //console.log(this.id);
        //console.log(usuario);
        usuario.analisarConvites(this.id);
    });
    
    $(document).on("click", ".accept-invite", function () {
        usuario.responderconvite(this.id, "accept");
    });
    
    $(document).on("click", ".refuse-invite", function () {
        usuario.responderconvite(this.id, "refuse");
    });
    
    /*================================================================== Visualizar convites  ==================================================================*/
        
    /*================================================================== Janela geral ==================================================================*/
    
    $(document).on("click","#voltarpinicial-cadastro", function(){
        window.location = "../index.php";
    });

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
