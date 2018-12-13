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
        var bolaoObj; // É indiretamente uma instancia de Bolao
            var bolao; // Será a instancia de bolao
            $.ajax({
                url: "../php/pegarBolaoById.php",
                method: "POST",
                async: false,
                data: {id: id}
            }).done(function (bolaoJSON) {
                bolaoObj = JSON.parse(bolaoJSON);
                let jogos = [];
                for(let i=0;i<bolaoObj.jogos.length;i++) {
                    let jogo = new Jogo(i+1,bolaoObj.jogos[i].time1,bolaoObj.jogos[i].time2,bolaoObj.jogos[i].tempoLimite,bolaoObj.jogos[i].data);
                    jogos.push(jogo);
                }
                //console.log(bolaoObj);
                let adm = new Administrador(bolaoObj.administrador.login);
                bolao = new Bolao(jogos,bolaoObj.regras,bolaoObj.regra_de_desempate,adm);
                bolao.setID(bolaoObj.id);
                bolao.setApostadores(bolaoObj.apostadores);
                //console.log("Bolao:", bolao);
            });
        if(this instanceof Administrador) {
            console.log("Sou um administrador e cliquei no bolão " + id);
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
                let adiciona = true;
                for(let j=0; j<bolao.getApostadores().length; j++) {
                    if(apostadoresArr[i] == bolao.getApostadores()[j]) {
                        adiciona = false;
                    }
                }
                if(adiciona) {
                    selectContent += "<option value=\"" + apostadoresArr[i] + "\">" + apostadoresArr[i] + "</option>";  
                }
            }
            var gamesContent = "";
            let data = new Date();
            let dataUtc = Date.UTC(data.getYear(),data.getMonth(),data.getDay(),data.getHours(),data.getMinutes());
            let dataFinal = dataUtc/1000 | 0;
            for(let i=0;i<bolaoObj.jogos.length; i++) {
                gamesContent += "<div style=\"border: solid; border-radius: 5px; margin: 1em;   \">" +
                                    (dataFinal>bolao.getJogos()[i].data? (bolao.getJogos()[i].getResultado()==""? "<button style=\"float: right;\" id=\"" + bolao.getJogos()[i].getId()  + "\" class\"register-game-result\" > Registrar resultado de jogo </button>" : "<div style=\"float: rigth;\">Resultado de jogo registrado!</div>") : "") +
                                    "<div style=\"font-size: 3.5em; margin: 1em;\">" +
                                        bolao.getJogos()[i].getTime1() + (bolao.getJogos()[i].getResultado()==""? " X " : bolao.getJogos()[i].getResultado()) + bolao.getJogos()[i].getTime2() +
                                    "</div>" +
                                    "<div style=\"font-size: 1.5em; margin: 1em;\">" +
                                        "<b>Data do jogo</b>: " + new Date(bolao.getJogos()[i].getData()).toLocaleDateString() + " " +new Date(bolao.getJogos()[i].getData()).getHours() + ":" + new Date(bolao.getJogos()[i].getData()).getMinutes() + ", <b>Número de apostas</b>: " + bolao.getJogos()[i].getApostas().length + ", <b>Montante</b>: " + bolao.getJogos()[i].getMontante() + " R$" + 
                                    "</div>" +
                                    "<div style=\"font-size: 1.5em; margin: 1em;\">" +
                                        "<b>Tempo limite de aposta</b>: " + bolao.getJogos()[i].getTempoLimite()[0] + " dia " + bolao.getJogos()[i].getTempoLimite()[1] + " horas " + bolao.getJogos()[i].getTempoLimite()[2] + " minutos antes do jogo..." +
                                    "</div>" +
                               "</div>";
            }
            
            var participantesSelect = "";
            for(let i=0;i<bolao.getApostadores().length; i++) {
                participantesSelect += "<option value=\"" + bolao.getApostadores()[i] + "\">" + bolao.getApostadores()[i] + "</option>";
            }
            
            var ranking = "";
            for(let i=0;i<bolao.getRanking().length; i++) {
                ranking += "<li> " + bolao.getRanking()[i] + "</li>";
            }
            
            var desempate = "";
            switch (bolao.getRegrasdeDesempate()) {
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
                                    "<h2>Bolão " + bolao.getID() + "</h2>" +
                                "</div>" +
                                "<div class=\"modal-body\" style=\"text-align: center;\">" +
                                    "<button style=\"float: right;\" id=\"" + bolao.getID() + "\" class=\"rmv-bolao\"> Excluir bolão </button>" +
                                    "<div style=\"text-align: left; margin: 1em;\">Número de participantes: " + bolao.getApostadores().length + "</div>" +
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
                                            "<ul style=\"list-style: disc;\"> <li><b>acertar o placar</b>: " + bolao.getRegras()[0] + "</li>" +
                                            "<li><b>acertar apenas o vencedor</b>: " + bolao.getRegras()[1] + "</li>" +
                                            "<li><b>acertar a quantidade de gols de um time</b>: " + bolao.getRegras()[2] + "</li></ul>" +
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
            var gamesContent = "";
            let data = new Date();
            let dataUtc = Date.UTC(data.getYear(),data.getMonth(),data.getDay(),data.getHours(),data.getMinutes());
            let dataFinal = dataUtc/1000 | 0;
            for(let i=0;i<bolaoObj.jogos.length; i++) {
                gamesContent += "<div style=\"border: solid; border-radius: 5px; margin: 1em;   \">" +
                                    "<div style=\"font-size: 3.5em; margin: 1em;\">" +
                                        bolao.getJogos()[i].getTime1() + (bolao.getJogos()[i].getResultado()==""? " X " : bolao.getJogos()[i].getResultado()) + bolao.getJogos()[i].getTime2() +
                                    "</div>" +
                                    "<div style=\"font-size: 1.5em; margin: 1em;\">" +
                                        "<b>Data do jogo</b>: " + new Date(bolao.getJogos()[i].getData()).toLocaleDateString() + " " +new Date(bolao.getJogos()[i].getData()).getHours() + ":" + new Date(bolao.getJogos()[i].getData()).getMinutes() + ", <b>Número de apostas</b>: " + bolao.getJogos()[i].getApostas().length + ", <b>Montante</b>: " + bolao.getJogos()[i].getMontante() + " R$" + 
                                    "</div>" +
                                    "<div style=\"font-size: 1.5em; margin: 1em;\">" +
                                        "<b>Tempo limite de aposta</b>: " + bolao.getJogos()[i].getTempoLimite()[0] + " dia " + bolao.getJogos()[i].getTempoLimite()[1] + " horas " + bolao.getJogos()[i].getTempoLimite()[2] + " minutos antes do jogo..." +
                                    "</div>" +
                               "</div>";
            }
            
            var ranking = "";
            for(let i=0;i<bolao.getRanking().length; i++) {
                ranking += "<li> " + bolao.getRanking()[i] + "</li>";
            }
            
            var desempate = "";
            switch (bolao.getRegrasdeDesempate()) {
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
                                    "<h2>Bolão " + bolao.getID() + "</h2>" +
                                "</div>" +
                                "<div class=\"modal-body\" style=\"text-align: center;\">" +
                                    "<div style=\"text-align: left; margin: 1em;\">Número de participantes: " + bolao.getApostadores().length + "</div>" +
                                    "<div>" +
                                        "<h3 style=\"margin: 1em;\"> Jogos </h3>" +
                                        gamesContent +
                                    "</div>" +
                                    "<div>" +
                                        "<h3 style=\"margin: 1em;\"> Regras do Bolão </h3>" +
                                        "Quantidade de pontos ganhos ao:<br/><div style=\"width: 25em;display: inline-block;text-align: left;\">" +
                                            "<ul style=\"list-style: disc;\"> <li><b>acertar o placar</b>: " + bolao.getRegras()[0] + "</li>" +
                                            "<li><b>acertar apenas o vencedor</b>: " + bolao.getRegras()[1] + "</li>" +
                                            "<li><b>acertar a quantidade de gols de um time</b>: " + bolao.getRegras()[2] + "</li></ul>" +
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
    }
    getLogin() {
        return this.login;
    }

    setLogin(login) {
        this.login = login;
    }
}
