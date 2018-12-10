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

    atualizarRanking() {

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
        return this.regras;
    }

    setRegras(regras) {
        this.regras = regras;
    }

    getRegrasdeDesempate() {
        return this.regras_de_desempate;
    }

    setRegrasDeDesempate() {
        this.regras_de_desempate;
    }
    
    toString() {
        return JSON.stringify(this);
    }

}