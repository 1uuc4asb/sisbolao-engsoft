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
        var thisUsuario = this;
            $.ajax({
                url: "../php/pegarBolaoById.php",
                method: "POST",
                async: false,
                data: {id: id}
            }).done(function (bolaoJSON) {
                try {
                    bolaoObj = JSON.parse(bolaoJSON);
                } catch (e) {
                    if(bolaoJSON[0] == "E") {
                        alert(bolaoJSON);
                    }
                    else {
                        alert("O bolão não existe mais...");
                        $.ajax({
                            url: "../php/mostrarTabelaUsr.php",
                            method: "POST",
                            data: { login: thisUsuario.getLogin()}
                        }).done(function (msg) {
                            $(".container-login100").html(msg);
                            //alert("Atualizou boy");
                        });
                    }
                }
                console.log(bolaoJSON);
                console.log(bolaoObj);
                let jogos = [];
                for(let i=0;i<bolaoObj.jogos.length;i++) {
                    let jogo = new Jogo(i+1,bolaoObj.jogos[i].time1,bolaoObj.jogos[i].time2,bolaoObj.jogos[i].tempoLimite,bolaoObj.jogos[i].data);
                    let apostas = [];
                    for(var j=0;j<bolaoObj.jogos[i].apostas.length; j++) {
                        let aposta = new Aposta(bolaoObj.jogos[i].apostas[j].palpite,bolaoObj.jogos[i].apostas[j].dono, bolaoObj.jogos[i].apostas[j].valor);
                        apostas.push(aposta);
                    }
                    jogo.setApostas(apostas);
                    jogo.setMontante(bolaoObj.jogos[i].montante);
                    jogo.setResultado(bolaoObj.jogos[i].resultado);
                    jogo.setListadeObservadores(bolaoObj.jogos[i].observadores);
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
            //console.log("Sou um administrador e cliquei no bolão " + id);
            var apostadoresArr;
            $.ajax({
                url: "../php/pegaApostadores.php",
                async: false
            }).done(function (apostadoresJSON) {
                apostadoresArr = JSON.parse(apostadoresJSON);
                //console.log(apostadoresArr);
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
            let dataUtc = Date.UTC(data.getFullYear(),data.getMonth(),data.getDate(),data.getHours(), data.getMinutes());
            let dataFinal = dataUtc/1000 | 0;
            //console.log("dataFinal", dataFinal);
            for(let i=0;i<bolao.getJogos().length; i++) {
                //console.log("DataJogo", bolao.getJogos()[i].data);
                gamesContent += "<div style=\"border: solid; border-radius: 5px; margin: 1em;   \">" +
                                    (dataFinal>bolao.getJogos()[i].data? (bolao.getJogos()[i].getResultado()==""? "<button style=\"float: right;\" id=\"" + bolao.getJogos()[i].getId()  + "\" class=\"register-game-result\" > Registrar resultado de jogo </button>" : "<div style=\"float: rigth;\">Resultado de jogo registrado!</div>") : "") +
                                    "<div class=\"teams\" style=\"font-size: 3.5em; margin: 1em;\">" +
                                        bolao.getJogos()[i].getTime1() + (bolao.getJogos()[i].getResultado()==""? " X " : bolao.getJogos()[i].getResultado()) + bolao.getJogos()[i].getTime2() +
                                    "</div>" +
                                    "<div style=\"font-size: 1.5em; margin: 1em;\">" +
                                        "<b>Data do jogo</b>: " + new Date(bolao.getJogos()[i].getData() * 1000).toLocaleDateString() + " " + new Date(bolao.getJogos()[i].getData() * 1000).getUTCHours() + ":" + (String(new Date(bolao.getJogos()[0].getData() * 1000).getUTCMinutes()).length==1? "0" + new Date(bolao.getJogos()[i].getData() * 1000).getUTCMinutes() : new Date(bolao.getJogos()[i].getData() * 1000).getUTCMinutes()) + ", <b>Número de apostas</b>: " + bolao.getJogos()[i].getApostas().length + ", <b>Montante</b>: " + bolao.getJogos()[i].getMontante() + " R$" + 
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
                                    "<button id=\"rmv-usr-btn\" style=\"width: 18em; height: 2.4em;\"> Remover apostador do Bolão </button><br/>" +
                                    "<select id=\"invite-usr\">"+
                                        selectContent +
                                    "</select>" +
                                    "<button id=\"invite-usr-btn\" style=\"width: 18em; height: 2.4em;\"> Convidar Apostador para o Bolão </button>" +
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
            //console.log("Sou um apostador e cliquei no bolão " + id);
            var gamesContent = "";
            //console.log(this);
            let data = new Date();
            let dataUtc = Date.UTC(data.getFullYear(),data.getMonth(),data.getDate(),data.getHours(),data.getMinutes());
            let dataFinal = dataUtc/1000 | 0;
            for(let i=0;i<bolao.getJogos().length; i++) {
                let apostou = bolao.getJogos()[i].getApostas().filter( aposta => aposta.getDono() == this.getLogin());
                console.log(apostou);
                if(apostou.length != 0) {
                    var pont1 = apostou[0].getPalpite().substring(0,apostou[0].getPalpite().indexOf("X"));
                    var pont2 = apostou[0].getPalpite().substring(apostou[0].getPalpite().indexOf("X") + 1);
                }
                gamesContent += "<div style=\"border: solid; border-radius: 5px; margin: 1em;   \">" +
                                    (dataFinal>bolao.getJogos()[i].data? "<div style=\"float: right; padding: 0.5em; margin: 0.5em;\"> Este jogo já acabou! </div> " : (apostou.length==0? "<button id=\"" + bolao.getID() + "/" + bolao.getJogos()[i].getId() +"\" class=\"inserir-palp\" style=\"float: right;\" > Insira um palpite </button>" : "<button id=\"" + bolao.getID() + "/" + bolao.getJogos()[i].getId() +"\" class=\"editar-palp\" style=\"float: right;\" > Editar seu palpite </button><div style=\"float: right;margin: 0.5em;padding: 0.5em;\"> Seu palpite: " + bolao.getJogos()[i].getTime1() + " " + pont1 + " X " + pont2 + " " + bolao.getJogos()[i].getTime2()  + "</div>")) +
                                    "<div class=\"teams\" style=\"font-size: 3.5em; margin: 1em;\">" +
                                        bolao.getJogos()[i].getTime1() + (bolao.getJogos()[i].getResultado()==""? " X " : bolao.getJogos()[i].getResultado()) + bolao.getJogos()[i].getTime2() +
                                    "</div>" +
                                    "<div style=\"font-size: 1.5em; margin: 1em;\">" +
                                        "<b>Data do jogo</b>: " + new Date(bolao.getJogos()[i].getData() * 1000).toLocaleDateString() + " " + new Date(bolao.getJogos()[i].getData() * 1000).getUTCHours() + ":" + (String(new Date(bolao.getJogos()[0].getData() * 1000).getUTCMinutes()).length==1? "0" + new Date(bolao.getJogos()[i].getData() * 1000).getUTCMinutes() : new Date(bolao.getJogos()[i].getData() * 1000).getUTCMinutes()) + ", <b>Número de apostas</b>: " + bolao.getJogos()[i].getApostas().length + ", <b>Montante</b>: " + bolao.getJogos()[i].getMontante() + " R$" + 
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
