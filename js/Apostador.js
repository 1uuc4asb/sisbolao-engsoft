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
    
    analisarConvites() {
        
        console.log("Apostador:", this.getLogin());
        $.ajax ({
            url: "../php/visualizarConvites.php",
            method: "POST",
            data: { apostador: this.getLogin() }
        }).done( function (answer) {
            if(answer[0] == "E") {
                alert(answer);
            }
            else {
                var convitesArr = JSON.parse(answer);
                var convites = "";
                for(let i=0; i< convitesArr.length; i++) {
                    convites += "<li id=\"" + convitesArr[i]  + "\" class=\"invite\" style=\"border: solid; margin: 1em;\"> Você foi convidado para entrar no Bolão " + convitesArr[i] + "! Deseja entrar? (Você pode apenas observar se quiser!)<br/> <button id=\"" + convitesArr[i] + "\" class=\"accept-invite\"> Aceitar </button> <button id=\"" + convitesArr[i] + "\" class=\"refuse-invite\"> Recusar </button>";
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

    responderconvite(id_bolao, answer) {
        console.log("Bolao:", id_bolao);
        console.log("Resposta do convite:", answer);
        $.ajax({
            url: "../php/adicionarApostadorParaBolao.php",
            method: "POST",
            data: { bolao: id_bolao, apostador: this.getLogin(), answer: answer }
        }).done(function (answerPHP) {
            console.log(answerPHP);
            if(answerPHP == "success") {
                $("#usr-invites").find("#" + id_bolao).remove();
                $("#n-invites").html($("#n-invites").html() - 1);
                if($("#n-invites").html() == 0) {
                    $("#n-invites").css("display","none");
                }
                if(answer == "accept") {
                    $.ajax({
                        url: "../php/pegarBolaoById.php",
                        method: "POST",
                        async: false,
                        data: {id: id_bolao}
                    }).done(function (bolaoJSON) {
                        let bolaoObj = JSON.parse(bolaoJSON);
                        var nApostasTotal = 0, montanteTotal = 0;
                        for(let i= 0; i< bolaoObj.jogos.length; i++) {
                            nApostasTotal += bolaoObj.jogos[i].apostas.length;
                            montanteTotal += bolaoObj.jogos[i].montante;
                        }
                        var novoBolaoLi = "<li id=\"" + bolaoObj.id + "\" class=\"bolao-list-adm clickable\"> Bolão " + bolaoObj.id + " - Quantidade de apostadores: " + bolaoObj.apostadores.length + " / Quantidade de jogos: " + bolaoObj.jogos.length + " / Quantidade total de apostas: " + nApostasTotal + " / Montante total do Bolão: " + montanteTotal +  " R$ <img class=\"boloes-icon\" src=\"../images/config.png\"> </li>";
                        $("#usr-bolao-list").append(novoBolaoLi);
                    });
                    alert("Você agora faz parte do bolão!");
                }
                else {
                    alert("O convite foi recusado.");
                }
            }
            else {
                alert(answerPHP);
            }
        });
        // Tirar convite da lista
    }

    visualizarjogos() {

    }

    inserirpalpite(id_jogo, valor) {

    }

    editarpalpite(id_jogo, valor) {

    }

    verificarranking(id_bolao) {

    }
}
