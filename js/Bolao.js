class Bolao {
    
    constructor (jogos,scoreRules,tiebreakerRules, administrador) {
        this.apostadores = [];
        this.ranking = [];
        this.jogos = jogos;
        this.scoreRules = scoreRules;
        this.tiebreakerRules = tiebreakerRules;
        this.Administrador = administrador;
    }

    calcularPremioeDefinirVencedor() {

    }
    
    atualizarRanking(apostas,resultado) {
        console.log("CARALHOOO", apostas,resultado);
        var gol1 = resultado.substring(0,resultado.indexOf("X") - 1);
        var gol2 = resultado.substring(resultado.indexOf("X") + 2);
        for(let i=0;i<apostas.length;i++) {
            let palpite1 = apostas[i].palpite.substring(0,apostas[i].palpite.indexOf("X"));
            let palpite2 = apostas[i].palpite.substring(apostas[i].palpite.indexOf("X") + 1);
            let rank = { apostador: apostas[i].dono , pontuacao: 0 };
            console.log("Gols e palpites: ", gol1,gol2,palpite1,palpite2);
            if(gol1 == palpite1 && palpite2 == palpite2) {
                rank.pontuacao += parseFloat(this.getRegras()[0]);
            }
            let vencedorReal = (gol1 > gol2? 1 : 2);
            let vencedorPalpite = (palpite1 > palpite2? 1 : 2);
            if (vencedorReal == vencedorPalpite) {
                rank.pontuacao += parseFloat(this.getRegras()[1]);
            }
            if(gol1 == palpite1) {
                rank.pontuacao += parseFloat(this.getRegras()[2]);
            }
            if(gol2 == palpite2) {
                rank.pontuacao += parseFloat(this.getRegras()[2]);
            }
            console.log("REGRAS: ", parseFloat(this.getRegras()[0]));
            this.ranking.push(rank);
        }
        this.ranking.sort(function (a,b) {
            if(a.pontuacao < b.pontuacao) {
                return 1;
            }
            if(a.pontuacao > b.pontuacao) {
                return -1;
            }
            return 0;
        });
        // Verifica se todos os jogos acabaram, se sim, chama calcula premio e define vencedor.
        // Salvar ranking de bolao no banco
        console.log(this.ranking);
    }
    
    getAdministrador() {
        return this.Administrador;
    }
     setAdministrador(Administrador) {
        this.Administrador = Administrador;
    }
  
    setID(id) {
        this.id = id;
    }
    
    getID() {
        return this.id;
    }

    getApostadores() {
        return this.apostadores;
    }

    setApostadores(apostadores) {
        this.apostadores = apostadores;
    }

    getJogos() {
        return this.jogos;
    }

    setJogos(jogos) {
        this.jogos = jogos;
    }

    getRanking() {
        return this.ranking;
    }

    setRanking(ranking) {
        this.ranking = ranking;
    }

    getRegras() {
        return this.scoreRules;
    }

    setRegras(scoreRules) {
        this.scoreRules = scoreRules;
    }

    getRegrasdeDesempate() {
        return this.tiebreakerRules;
    }

    setRegrasDeDesempate(tiebreakerRules) {
        this.tiebreakerRules = tiebreakerRules;
    }
    
    toString() {
        return JSON.stringify(this);
    }

}