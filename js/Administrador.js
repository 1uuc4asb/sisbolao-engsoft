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
            //return;
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
            let data = new Date($("." + game.className).find($(".modal-game-date")[index-1]).val());
            let dataUtc = Date.UTC(data.getYear(),data.getMonth(),data.getDay(),data.getHours(),data.getMinutes());
            let dataFinal = dataUtc/1000 | 0;
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
            alert(answer);
        })
        //console.log(scoreRules);
        //console.log(tiebreakerRules);
    }

    excluirBolao() {

    }

    convidarAPostadorParaBolao() {

    }

    registrarResultadoJogo() {

    }
}
