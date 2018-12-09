class Administrador extends Usuario {
    constructor(login) {
        super(login);
    }

    criarBolao(bolaoelements, formHandler) {
        let dadosvalidos = true;
        let games = bolaoelements.find(".modal-game");
        console.log(games.find("input"));
        
        // Verificar dados dos jogos
        let scoreRulesInputs = "",tiebreakerRulesInputs = "";
        if(bolaoelements.find("#habilitar-scorerules").prop( "checked" )) {
            scoreRulesInputs = bolaoelements.find("#scorerules").find("input");
        }
        if(bolaoelements.find("#habilitar-tiebreakerrules").prop( "checked" )) {
            tiebreakerRulesInputs = bolaoelements.find("#tiebreakerrules").find("select");
        }
        console.log(scoreRulesInputs);
        console.log(tiebreakerRulesInputs);
        dadosvalidos = formHandler.validarCriacaoBolao(games.find("input"), scoreRulesInputs, tiebreakerRulesInputs, formHandler);
        if(!dadosvalidos) {
            return;
        }
        let quantidade_de_jogos = games.length;
    }

    excluirBolao() {

    }

    convidarAPostadorParaBolao() {

    }

    registrarResultadoJogo() {

    }
}
