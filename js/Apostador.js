class Apostador extends Usuario {
    /* #boloes = "";
     #convites = "";
     #jogos_apostados = "";        FAZER GETTERS AND SETTERS DESSES GAROTOS
     #bolaoxpontacao = "";
     */

    constructor(login) {
        super(login);
        this.boloes = [];
        this.convites = [];
        this.jogos_apostados = [];
        this.bolaoxpontuacao = [];
    }

    analisarconvites() {

    }

    responderconvite(id_bolao) {

    }

    visualizarjogos() {

    }

    inserirpalpite(id_jogo, valor) {

    }

    editarpalpite(id_jogo, valor) {

    }

    verificarranking(id_bolao) {

    }
    getBoloes() {
        return this.boloes;
    }

    setBoloes(boloes) {
        this.boloes = boloes;
    }
    getConvites() {
        return this.convites;
    }

    setConvites(convites) {
        this.convites = convites;
    }
    getJogos_apostados() {
        return this.jogos_apostados;
    }

    setJogos_apostados(jogos_apostados) {
        this.jogos_apostados = jogos_apostados;
    }
    getBolaoxpontuacao() {
        return this.bolaoxpontuacao;
    }

    setBolaoxpontuacao(bolaoxpontuacao) {
        this.bolaoxpontuacao = bolaoxpontuacao;
    }
    
}
