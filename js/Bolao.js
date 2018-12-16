class Bolao {
    /*#id;
    #apostadores;
    #jogos;                      FAZER GETTERS AND SETTERS DESSES GAROTOS
    #ranking;*/
    
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