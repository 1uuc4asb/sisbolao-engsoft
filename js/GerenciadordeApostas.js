class Gerenciadordeapostas {
    
    adicionarpalpitenojogo(callback, id_bolao,id_jogo, aposta) {
        //console.log(id_bolao,id_jogo, aposta);
        var bolao; // Será a instancia de bolao
        var bolaoObj;
        //console.log(id_bolao,id_jogo, aposta);
        $.ajax({
            url: "../php/pegarBolaoById.php",
            method: "POST",
            async: false,
            data: {id: id_bolao}
        }).done(function (bolaoJSON) {
            bolaoObj = JSON.parse(bolaoJSON);
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
                let lista = new ListaDeObservadores();
                jogo.setListadeObservadores(lista);
                for(let j=0;j<bolaoObj.jogos[i].observadores.lista.length;j++) {
                    jogo.adicionarObservador(bolaoObj.jogos[i].observadores.lista[j]);
                }
                jogos.push(jogo);
            }
            //console.log(bolaoObj);
            let adm = new Administrador(bolaoObj.administrador.login);
            bolao = new Bolao(jogos,bolaoObj.regras,bolaoObj.regra_de_desempate,adm);
            bolao.setID(bolaoObj.id);
            bolao.setApostadores(bolaoObj.apostadores);
            //console.log("Bolao:", bolao);
        });
        //console.log(bolao);
        var jogo = bolao.getJogos().filter( jogo => jogo.getId() == id_jogo );
        //console.log(jogo[0].getId());
        var timelimit = 0;
        timelimit += jogo[0].getTempoLimite()[0] * 86400;
        timelimit += jogo[0].getTempoLimite()[1] * 3600;
        timelimit += jogo[0].getTempoLimite()[2] * 60;
        Date.prototype.stdTimezoneOffset = function() {
            var jan = new Date(this.getFullYear(), 0, 1);
            var jul = new Date(this.getFullYear(), 6, 1);
            return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
        }
        Date.prototype.dst = function() {
            return this.getTimezoneOffset() < this.stdTimezoneOffset();
        }
        let data = new Date();
        let dataUtc = Date.UTC(data.getFullYear(),data.getMonth(),data.getDate(),data.getHours(), data.getMinutes());
        let dataFinal = dataUtc/1000 | 0;
        if(data.dst()) {
            let offset = (data.stdTimezoneOffset() - data.getTimezoneOffset()) * 60;
            dataFinal -= offset;
        }
        //console.log("DataFinal: ", dataFinal);
        //console.log("Datalimite", (jogo[0].getData()));
        //console.log("timeLimit", timelimit);
        //console.log(id_bolao,id_jogo, aposta);
        if(jogo[0].getData() - timelimit > dataFinal) {
            $.ajax({
                url: "../php/adicionarPalpiteAJogo.php",
                method: "POST",
                data: { bolao: JSON.stringify(bolao) , jogo: JSON.stringify(jogo[0]) , aposta: JSON.stringify(aposta) }
            }).done(function (msg) {
                console.log(msg);
                if(msg == "success") {
                    callback("O seu palpite foi inserido com sucesso!");
                }
                else {
                    callback(msg);
                }
            });
        }
        else {
            callback("Tempo limite para inserir palpite excedido!");
        }
    }

    editarpalpitenojogo(callback, id_bolao,id_jogo, palpite, usuario_login) {
        //console.log(id_bolao,id_jogo, aposta);
        var bolao; // Será a instancia de bolao
        var bolaoObj;
        //console.log(id_bolao,id_jogo, aposta);
        $.ajax({
            url: "../php/pegarBolaoById.php",
            method: "POST",
            async: false,
            data: {id: id_bolao}
        }).done(function (bolaoJSON) {
            bolaoObj = JSON.parse(bolaoJSON);
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
                let lista = new ListaDeObservadores();
                jogo.setListadeObservadores(lista);
                for(let j=0;j<bolaoObj.jogos[i].observadores.lista.length;j++) {
                    jogo.adicionarObservador(bolaoObj.jogos[i].observadores.lista[j]);
                }
                jogos.push(jogo);
            }
            //console.log(bolaoObj);
            let adm = new Administrador(bolaoObj.administrador.login);
            bolao = new Bolao(jogos,bolaoObj.regras,bolaoObj.regra_de_desempate,adm);
            bolao.setID(bolaoObj.id);
            bolao.setApostadores(bolaoObj.apostadores);
            //console.log("Bolao:", bolao);
        });
        //console.log(bolao);
        var jogo = bolao.getJogos().filter( jogo => jogo.getId() == id_jogo );
        //console.log(jogo[0].getId());
        var timelimit = 0;
        timelimit += jogo[0].getTempoLimite()[0] * 86400;
        timelimit += jogo[0].getTempoLimite()[1] * 3600;
        timelimit += jogo[0].getTempoLimite()[2] * 60;
        Date.prototype.stdTimezoneOffset = function() {
            var jan = new Date(this.getFullYear(), 0, 1);
            var jul = new Date(this.getFullYear(), 6, 1);
            return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
        }
        Date.prototype.dst = function() {
            return this.getTimezoneOffset() < this.stdTimezoneOffset();
        }
        let data = new Date();
        let dataUtc = Date.UTC(data.getFullYear(),data.getMonth(),data.getDate(),data.getHours(), data.getMinutes());
        let dataFinal = dataUtc/1000 | 0;
        if(data.dst()) {
            let offset = (data.stdTimezoneOffset() - data.getTimezoneOffset()) * 60;
            dataFinal -= offset;
        }
        //console.log("DataFinal: ", dataFinal);
        //console.log("Datalimite", (jogo[0].getData()));
        //console.log("timeLimit", timelimit);
        //console.log(id_bolao,id_jogo, aposta);
        if(jogo[0].getData() - timelimit > dataFinal) {
            $.ajax({
                url: "../php/editarPalpiteNoJogo.php",
                method: "POST",
                data: { bolao: JSON.stringify(bolao) , jogo: JSON.stringify(jogo[0]) , palpite: palpite,login: usuario_login  }
            }).done(function (msg) {
                console.log(msg);
                if(msg == "success") {
                    callback("O seu palpite foi editado com sucesso!");
                }
                else {
                    console.log(msg);
                    callback(msg);
                }
            });
        }
        else {
            callback("Tempo limite para editar palpite excedido!");
        }
    }
}