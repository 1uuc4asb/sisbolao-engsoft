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

    analisarConvites(apostador) {
        console.log("Apostador:", apostador);
        $.ajax ({
            url: "../php/visualizarConvites.php",
            method: "POST",
            data: { apostador: apostador }
        }).done( function (answer) {
            if(answer[0] == "E") {
                alert(answer);
            }
            else {
                var convitesArr = JSON.parse(answer);
                var convites = "";
                for(let i=0; i< convitesArr.length; i++) {
                    convites += "<li id=\"" + convitesArr[i]  + "\" class=\"invite\" style=\"border: solid;\"> Você foi convidado para entrar no Bolão " + convitesArr[i] + "! Deseja entrar? (Você pode apenas observar se quiser!)<br/> <button id=\"" + convitesArr[i] + "\" class=\"accept-invite\"> Aceitar </button> <button id=\"" + convitesArr[i] + "\" class=\"refuse-invite\"> Recusar </button>";
                }
                let modalcontent = "<div class=\"modal-content\" style=\"left: 5em;\">" +
                                        "<div class=\"modal-header\">" +
                                            "<span class=\"close\">&times;</span>" +
                                            "<h2> Meus convites </h2>" +
                                        "</div>" +
                                        "<div class=\"modal-body\" style=\"text-align: center;\">" +
                                            "<ul id=\"usr-invites\">" +
                                                convites +
                                            "</ul>" +
                                        "</div>" +
                                    "</div>";
                    $("#myModal").html(modalcontent);
                    $("#myModal").css("display", "block");
            }
        });
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
