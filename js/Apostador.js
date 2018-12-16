class Apostador extends Usuario {
    
    constructor(login) {
        super(login);
        this.boloes = [];
        this.convites = [];
        this.apostas = [];
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
    getApostas() {
        return this.apostas;
    }
     setApostas(apostas) {
        this.apostas = apostas;
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
        var thisUsuario = this;
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
                    alert("Você agora faz parte do bolão!");
                }
                else {
                    alert("O convite foi recusado.");
                }
            }
            else {
                if(answerPHP == "!exist") {
                    alert("O bolão não existe mais...");
                }
                else {
                    alert(answerPHP);
                }
                thisUsuario.analisarConvites();
            }
        });
    }

    inserirpalpite(id_bolao,id_jogo, aposta) {
        console.log(id_bolao, id_jogo, aposta);
        var gerenciador = new Gerenciadordeapostas();
        var thisApostador = this;
        gerenciador.adicionarpalpitenojogo(function (resposta) {
            alert(resposta);
            thisApostador.visualizarBolao(id_bolao);
        }, id_bolao,id_jogo, aposta);
    }

    editarpalpite(id_bolao,id_jogo, aposta) {

    }
}
