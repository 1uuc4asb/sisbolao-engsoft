class Usuario {
    // #login; 
    constructor(login) {
        if (new.target === Usuario) {
            throw new TypeError("Cannot construct Abstract instances directly");
        } else {
            this.login = login;
        }
    }


    visualizarBolao(id) {
        if(this instanceof Administrador) {
            console.log("Sou um administrador e cliquei no bolão " + id);
            var bolaoObj; // É indiretamente uma instancia de Bolao
            $.ajax({
                url: "../php/pegarBolaoById.php",
                method: "POST",
                async: false,
                data: {id: id}
            }).done(function (bolaoJSON) {
                bolaoObj = JSON.parse(bolaoJSON);
                console.log(bolaoObj);
            });
            var apostadoresArr;
            $.ajax({
                url: "../php/pegaApostadores.php",
                async: false
            }).done(function (apostadoresJSON) {
                apostadoresArr = JSON.parse(apostadoresJSON);
                console.log(apostadoresArr);
            });
            
            var selectContent = "";
            for(let i=0;i<apostadoresArr.length; i++) {
                selectContent += "<option value=\"" + apostadoresArr[i] + "\">" + apostadoresArr[i] + "</option>";
            }
            var gamesContent = "";
            let data = new Date();
            let dataUtc = Date.UTC(data.getYear(),data.getMonth(),data.getDay(),data.getHours(),data.getMinutes());
            let dataFinal = dataUtc/1000 | 0;
            for(let i=0;i<bolaoObj.jogos.length; i++) {
                gamesContent += "<div style=\"border: solid; border-radius: 5px; margin: 1em;   \">" +
                                    (dataFinal>bolaoObj.jogos[i].data? (bolaoObj.jogos[i].resultado==""? "<button style=\"float: right;\" id=\"" + bolaoObj.jogos[i].id  + "\" class\"register-game-result\" > Registrar resultado de jogo </button>" : "<div style=\"float: rigth;\">Resultado de jogo registrado!</div>") : "") +
                                    "<div style=\"font-size: 3.5em; margin: 1em;\">" +
                                        bolaoObj.jogos[i].time1 + (bolaoObj.jogos[i].resultado==""? " X " : bolaoObj.jogos[i].resultado) + bolaoObj.jogos[i].time2 +
                                    "</div>" +
                                    "<div style=\"font-size: 1.5em; margin: 1em;\">" +
                                        "<b>Data do jogo</b>: " + new Date(bolaoObj.jogos[i].data).toLocaleDateString() + " " +new Date(bolaoObj.jogos[i].data).getHours() + ":" + new Date(bolaoObj.jogos[i].data).getMinutes() + ", <b>Número de apostas</b>: " + bolaoObj.jogos[i].apostas.length + ", <b>Montante</b>: " + bolaoObj.jogos[i].montante + " R$" + 
                                    "</div>" +
                                    "<div style=\"font-size: 1.5em; margin: 1em;\">" +
                                        "<b>Tempo limite de aposta</b>: " + bolaoObj.jogos[i].tempoLimite[0] + " dia " + bolaoObj.jogos[i].tempoLimite[1] + " horas " + bolaoObj.jogos[i].tempoLimite[2] + " minutos antes do jogo..." +
                                    "</div>" +
                               "</div>";
            }
            
            var participantesSelect = "";
            for(let i=0;i<bolaoObj.apostadores.length; i++) {
                participantesSelect += "<option value=\"" + bolaoObj.apostadores[i] + "\">" + bolaoObj.apostadores[i] + "</option>";
            }
            
            var ranking = "";
            for(let i=0;i<bolaoObj.ranking.length; i++) {
                ranking += "<li> " + bolaoObj.ranking[i] + "</li>";
            }
            
            var desempate = "";
            switch (bolaoObj.regra_de_desempate) {
                case "random":
                    desempate = "Aleatoriamente";
                    break;
                case "ordemalfabetica":
                    desempate = "Ordem alfabética";
                    break;
                case "nboloes":
                    desempate = "Número de bolões em que jogador está inserido";
                    break;
            }
            
            
            let modalcontent = "<div class=\"modal-content\" style=\"left: 5em;\">" +
                                "<div class=\"modal-header\">" +
                                    "<span class=\"close\">&times;</span>" +
                                    "<h2>Bolão " + bolaoObj.id + "</h2>" +
                                "</div>" +
                                "<div class=\"modal-body\" style=\"text-align: center;\">" +
                                    "<button style=\"float: right;\" id=\"" + bolaoObj.id + "\" class=\"rmv-bolao\"> Excluir bolão </button>" +
                                    "<div style=\"text-align: left; margin: 1em;\">Número de participantes: " + bolaoObj.apostadores.length +
                                    "<br/><select id=\"rmv-usr\">" +
                                        participantesSelect +
                                    "</select>" +
                                    "<button id=\"rmv-usr-btn\"> Remover apostador do Bolão </button><br/>" +
                                    "<select id=\"invite-usr\">"+
                                        selectContent +
                                    "</select>" +
                                    "<button id=\"invite-usr-btn\"> Convidar Apostador para o Bolão </button></div>" +
                                    "<div>" +
                                        "<h3 style=\"margin: 1em;\"> Jogos </h3>" +
                                        gamesContent +
                                    "</div>" +
                                    "<div>" +
                                        "<h3 style=\"margin: 1em;\"> Regras do Bolão </h3>" +
                                        "Quantidade de pontos ganhos ao:<br/><div style=\"width: 25em;display: inline-block;text-align: left;\">" +
                                            "<ul style=\"list-style: disc;\"> <li><b>acertar o placar</b>: " + bolaoObj.regras[0] + "</li>" +
                                            "<li><b>acertar apenas o vencedor</b>: " + bolaoObj.regras[1] + "</li>" +
                                            "<li><b>acertar a quantidade de gols de um time</b>: " + bolaoObj.regras[2] + "</li></ul>" +
                                    "</div>" +
                                    "<div>" +
                                        "<h3 style=\"margin: 1em;\"> Regra de desempate </h3>" +
                                            desempate +
                                    "</div>" +
                                    "<div>" +
                                        "<h3 style=\"margin: 1em;\"> Ranking </h3>" +
                                        "<ol>" +
                                            ranking +
                                        "</ol>" +
                                    "</div>" +
                                "</div>" +
                            "</div>";
            $("#myModal").html(modalcontent);
            $("#myModal").css("display", "block");
        }
        else {
            console.log("Sou um apostador e cliquei no bolão " + id);
        }
    }
    getLogin() {
        return this.login;
    }

    setLogin(login) {
        this.login = login;
    }
}
