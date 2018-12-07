class Bolão {
    /*#id;
    #apostadores;
    #jogos;                      FAZER GETTERS AND SETTERS DESSES GAROTOS
    #ranking;*/
    
    constructor () {
        if (regras === undefined && regras_de_desempate === undefined) {
            this.regras = "";
            this.regras_de_desempate = "";
        } else {
            this.regras = regras;
            this.regras_de_desempates = regras_de_desempate;
        }
    }

    calcularPremioeDefinirVencedor() {

    }

    atualizarRanking() {

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

}