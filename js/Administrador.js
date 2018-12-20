class Administrador extends Usuario {
    constructor(login) {
        super(login);
    }

    criarBolao(bolaoelements, formHandler) {
        let dadosvalidos = true;
        let games = bolaoelements.find(".modal-game");
        //console.log(games.find("input"));
        
        // Verificar dados dos jogos
        let scoreRulesInputs = "",tiebreakerRulesInput = "";
        var sRulesModified = false, tRulesModified = false;
        if(bolaoelements.find("#habilitar-scorerules").prop( "checked" )) {
            scoreRulesInputs = bolaoelements.find("#scorerules").find("input");
            sRulesModified = true;
        }
        if(bolaoelements.find("#habilitar-tiebreakerrules").prop( "checked" )) {
            tiebreakerRulesInput = bolaoelements.find("#tiebreakerrules").find("select");
            tRulesModified = true;
        }
        console.log(scoreRulesInputs);
        console.log(tiebreakerRulesInput);
        dadosvalidos = formHandler.validarCriacaoBolao(games.find("input"), scoreRulesInputs, tiebreakerRulesInput, formHandler);
        if(!dadosvalidos) {
            console.log("Dados invalidos");
            return;
        }
        let quantidade_de_jogos = games.length;
        var vetor_de_objjogo = [];
        //console.log("Games", games);
        var index = 0;
        for(let game of games) {
            index++;
            //console.log("index:", index);
            //console.log("game:",game);
            //console.log("quantidade_de_jogos", quantidade_de_jogos);
            //console.log("Time 1: ", $("." + game.className).find(".modal-game-team1").val());
            let id = index;
            let time1 = $("." + game.className).find($(".modal-game-team1")[index-1]).val();
            let time2 = $("." + game.className).find($(".modal-game-team2")[index-1]).val();
            console.log($("." + game.className).find($(".modal-game-date")[index-1]).val());
            let data = new Date($("." + game.className).find($(".modal-game-date")[index-1]).val());
            console.log("Data do jogo carai1: ", data);
            console.log("Data do jogo carai1: ", data.getFullYear() + "/"  + data.getMonth() + "/" + data.getDate() + " " + data.getHours() + ":" + data.getMinutes());
            let dataUtc = Date.UTC(data.getFullYear(),data.getMonth(),data.getDate(),data.getHours(),data.getMinutes());
            let dataFinal = dataUtc/1000 | 0;
            console.log("Data do jogo carai: ", dataFinal);
            //data.setTime( data.getTime() - new Date().getTimezoneOffset()*60*1000 );
            //let tempolimite = "[" + $("." + game.className).find($(".modal-game-timelimitday")[index-1]).val() + "," + $("." + game.className).find($(".modal-game-timelimithour")[index-1]).val() + "," + $("." + game.className).find($(".modal-game-timelimitminute")[index-1]).val() + "]";
            let tempoLimite = [];
            tempoLimite.push($("." + game.className).find($(".modal-game-timelimitday")[index-1]).val());
            tempoLimite.push($("." + game.className).find($(".modal-game-timelimithour")[index-1]).val());
            tempoLimite.push($("." + game.className).find($(".modal-game-timelimitminute")[index-1]).val());
            //console.log("id:",id);
            //console.log("time1:",time1);
            //console.log("time2:",time2);
            //console.log("data:",dataFinal);
            //console.log("tempoLimite:",tempolimite);
            let jogo = new Jogo(id,time1,time2,tempoLimite,dataFinal);
            vetor_de_objjogo.push(jogo);
            //console.log(jogo.toString());
        }
        var scoreRules, tiebreakerRules;
        if(sRulesModified) {
            //scoreRules = scoreRulesInputs.val();
            scoreRules = [];
            scoreRules.push($(scoreRulesInputs[0]).val());
            scoreRules.push($(scoreRulesInputs[1]).val());
            scoreRules.push($(scoreRulesInputs[2]).val());
            //console.log(scoreRulesInputs);
            //console.log(scoreRules);
        }
        else {
            scoreRules = [100,80,30];
        }
        if(tRulesModified) {
            tiebreakerRules = tiebreakerRulesInput.val();
        }
        else {
            tiebreakerRules = "random";
        }
        var bolaoObj = new Bolao(vetor_de_objjogo,scoreRules,tiebreakerRules,this);
        console.log(bolaoObj.toString());
        $.ajax({
            url: "../php/adicionarBolaoAoBanco.php",
            method: "POST",
            data: { bolao: bolaoObj.toString() }
        }).done( function (answer) {
            //alert(answer);
            /*bolaoObj.setID(answer);
            var nApostasTotal = 0, montanteTotal = 0;
            for(let i= 0; i< bolaoObj.getJogos().length; i++) {
                nApostasTotal += bolaoObj.getJogos()[i].apostas.length;
                montanteTotal += bolaoObj.getJogos()[i].montante;
            }
            var novoBolaoLi = "<li id=\"" + bolaoObj.getID() + "\" class=\"bolao-list-adm clickable\"> Bolão " + bolaoObj.getID() + " - Quantidade de apostadores: " + bolaoObj.getApostadores().length + " / Quantidade de jogos: " + bolaoObj.getJogos().length + " / Quantidade total de apostas: " + nApostasTotal + " / Montante total do Bolão: " + montanteTotal +  " R$ <img class=\"boloes-icon\" src=\"../images/config.png\"> </li>";
            $("#adm-bolao-list").append(novoBolaoLi);*/
            alert("O bolão foi criado com sucesso!");
            $("#myModal").css("display", "none");
        })
        //console.log(scoreRules);
        //console.log(tiebreakerRules);
    }

    excluirBolao(id) {
        console.log("id recebido:",id);
        $.ajax({
            url: "../php/excluirBolao.php",
            method: "POST",
            data: { id: id }
        }).done( function (answer) {
           if(answer == "success") {
               alert("O bolão foi excluído com sucesso!");
               $("#myModal").css("display", "none");
           }
            else {
                console.log(answer);
                alert(answer);
                $("#myModal").css("display", "none");
            }
        });
    }

    convidarApostadorParaBolao(bolao, apostador) {
        console.log("Id do bolao:", bolao);
        console.log("Nick do apostador:", apostador);
        $.ajax({
            url: "../php/convidarApostadorParaBolao.php",
            method: "POST",
            data: { bolao: bolao, apostador: apostador }
        }).done(function (answer) {
            if(answer == "success") {
                alert("O convite foi enviado com sucesso!");
                //alert(answer);
            }
            else {
                alert(answer);
            }
        });
    }
    
    excluirApostadorDeBolao(bolao, apostador) {
        console.log("Id do bolao:", bolao);
        console.log("Nick do apostador:", apostador);
        $.ajax({
            url: "../php/excluirApostadorDeBolao.php",
            method: "POST",
            data: { bolao: bolao, apostador: apostador }
        }).done(function (answer) {
            console.log(answer);
            if(answer == "success") {
                alert("O usuário foi excluído com sucesso!");
            }
            else {
                alert(answer);
            }
        });
    }

    registrarResultadoJogo(bolao_id,game_id) {
        var bolaoObj; // É indiretamente uma instancia de Bolao
        var bolao; // Será a instancia de bolao
        var thisUsuario = this;
            $.ajax({
                url: "../php/pegarBolaoById.php",
                method: "POST",
                async: false,
                data: {id: bolao_id}
            }).done(function (bolaoJSON) {
                try {
                    bolaoObj = JSON.parse(bolaoJSON);
                } catch (e) {
                    if(bolaoJSON[0] == "E") {
                        alert(bolaoJSON);
                    }
                    else {
                        alert("O bolão não existe mais...");
                        $.ajax({
                            url: "../php/mostrarTabelaUsr.php",
                            method: "POST",
                            data: { login: thisUsuario.getLogin()}
                        }).done(function (msg) {
                            $(".container-login100").html(msg);
                            //alert("Atualizou boy");
                        });
                    }
                }
                //console.log(bolaoJSON);
                //console.log(bolaoObj);
                let jogos = [];
                for(let i=0;i<bolaoObj.jogos.length;i++) {
                    let jogo = new Jogo(i+1,bolaoObj.jogos[i].time1,bolaoObj.jogos[i].time2,bolaoObj.jogos[i].tempoLimite,bolaoObj.jogos[i].data);
                    let apostas = [];
                    for(var j=0;j<bolaoObj.jogos[i].apostas.length; j++) {
                        let aposta = new Aposta(bolaoObj.jogos[i].apostas[j].palpite,bolaoObj.jogos[i].apostas[j].dono, bolaoObj.jogos[i].apostas[j].valor);
                        apostas.push(aposta);
                    }
                    jogo.setApostas(apostas);
                    jogo.setMontante(bolaoObj.jogos[i].montante);
                    jogo.setResultado(bolaoObj.jogos[i].resultado);
                    let lista = new ListaDeObservadores();
                    jogo.setListadeObservadores(lista);
                    for(let j=0;j<bolaoObj.jogos[i].observadores.lista.length;j++) {
                        jogo.adicionarObservador(bolaoObj.jogos[i].observadores.lista[j]);
                    }
                    jogos.push(jogo);
                }
                //console.log(bolaoObj);
                let adm = new Administrador(bolaoObj.administrador.login);
                bolao = new Bolao(jogos,bolaoObj.regras,bolaoObj.regra_de_desempate,adm);
                bolao.setID(bolaoObj.id);
                bolao.setApostadores(bolaoObj.apostadores);
                //console.log("Bolao:", bolao);
                var team1 = bolao.getJogos()[game_id -1].getTime1(),team2 = bolao.getJogos()[game_id -1].getTime2();
                var gol_team1 = prompt("Quantos gols o " + team1 + " marcou?");
                if(gol_team1 != null) {
                    if(gol_team1 == "") {
                        alert("Você deve digitar uma quantidade de gols!")
                    }
                    else {
                        if(isNaN(parseInt(gol_team1)) || parseInt(gol_team1) < 0) {
                            alert("Você deve digitar um número natural!");
                        }
                        else {
                            var confirmaçãoTime1 = confirm("Você tem certeza de que o " + team1 + " fez " + gol_team1 + " gol(s)?");
                            if(confirmaçãoTime1) {
                                var gol_team2 = prompt("Quantos gols o " + team2 + " marcou?");
                                if(gol_team2 == "") {
                                    alert("Você deve digitar uma quantidade de gols!")
                                }
                                else {
                                    if(isNaN(parseInt(gol_team2)) || parseInt(gol_team1) < 0) {
                                        alert("Você deve digitar um número natural!");
                                    }
                                    else {
                                        var confirmaçãoTime2 = confirm("Você tem certeza de que o " + team2 + " fez " + gol_team2 + " gol(s)?");
                                        if(confirmaçãoTime2) {
                                            //console.log("Resultado foi:", team1 + " " + gol_team1 +   " X " + gol_team2 + " " + team2);
                                            let resultado = gol_team1 + " X " + gol_team2;
                                            bolao.getJogos()[game_id -1].setResultado(resultado);
                                            //console.log("aasdgiudfngidoufgd", resultado, bolao.getJogos()[game_id -1].getResultado()+ "oi"  );
                                            bolao.getJogos()[game_id -1].notificarObservadores( function (answer) {
                                                if(answer === true) {
                                                    console.log("Notificou tudo agora é salvar o resultado do jogo.");
                                                    // Salvar resultado no banco
                                                    $.ajax({
                                                        url: "../php/salvarResultadoDeJogo.php",
                                                        method: "POST",
                                                        data: { bolao: bolao.toString() }
                                                    }).done(function () {
                                                        alert("Resultado registrado com sucesso!");
                                                        thisUsuario.visualizarBolao(bolao.getID());
                                                    }); 
                                                }
                                                else {
                                                    console.log("Erro.....");
                                                }
                                            });
                                            
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
        });
        
    }
}
