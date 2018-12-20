class Jogo {
    
    constructor (id,time1,time2,tempoLimite,data) {
        this.id = id;
        this.time1 = time1;
        this.time2 = time2;
        this.tempoLimite = tempoLimite;
        this.data = data;
        this.apostas = [];
        this.montante = 0;
        this.resultado = "";
        this.observadores = new ListaDeObservadores();
    }
    
    setListadeObservadores (lista) {
        this.observadores = lista;
    }
    
    getListaDeObservadores () {
        return this.observadores;
    }
    
    adicionarObservador (observador) {
        this.observadores.adicionar(observador);
    }
    
    removerObservadorPorIndice (indice) {
        this.observadores.remover(indice);
    }
    
    notificarObservadores(callback) {
        //console.log("Entrouaaaa");
        //console.log(this.observadores);
        var thisJogo = this;
        var tamanhoDaLista = this.observadores.contar();
        let observadoresObj = [];
        for(let i=0;i<tamanhoDaLista;i++) {
            let id_bolao = this.observadores.pegar(i);
            let bolaoObj; // É indiretamente uma instancia de Bolao
            let bolao; // Será a instancia de bolao
                $.ajax({
                    url: "../php/pegarBolaoById.php",
                    method: "POST",
                    async: false,
                    data: {id: id_bolao}
                }).done(function (bolaoJSON) {
                    try {
                        bolaoObj = JSON.parse(bolaoJSON);
                    } catch (e) {
                        if(bolaoJSON[0] == "E") {
                            alert(bolaoJSON);
                            callback(false);
                            return;
                        }
                    }
                    console.log(bolaoJSON);
                    console.log(bolaoObj);
                    let jogos = [];
                    for(let i=0;i<bolaoObj.jogos.length;i++) {
                        if(thisJogo.getId() == i+1) {
                            jogos.push(thisJogo);
                        }
                        else {
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
                    }
                    //console.log(bolaoObj);
                    let adm = new Administrador(bolaoObj.administrador.login);
                    bolao = new Bolao(jogos,bolaoObj.regras,bolaoObj.regra_de_desempate,adm);
                    bolao.setID(bolaoObj.id);
                    bolao.setApostadores(bolaoObj.apostadores);
                    bolao.setRanking(bolaoObj.ranking);
                    //console.log("Bolao:", bolao);
                });
            observadoresObj.push(bolao);
        }
        var answerGlobal = true;
        for(let i=0;i<observadoresObj.length; i++) {
            observadoresObj[i].atualizarRanking( function (answer) {
                console.log("Atualizou ranking haha");
                if(answer != true) {
                    alert("Erro ao atualizar o ranking.");
                    answerGlobal = false;
                }
                callback(answerGlobal);
            },this.apostas,this.resultado);
        }
    }

    
    getId() {
        return this.id;
    }
     setId(id) {
        this.id = id;
    }
    getApostas() {
        return this.apostas;
    }
    setApostas(apostas) {
        this.apostas = apostas;
    }
    getTime1() {
        return this.time1;
    }
     setTime1(time1) {
        this.time1 = time1;
    }
    getTime2() {
        return this.time2;
    }
     setTime2(time2) {
        this.time2 = time2;
    }
    getTempoLimite() {
        return this.tempoLimite;
    }
     setTempoLimite(tempoLimite) {
        this.tempoLimite = tempoLimite;
    }
    getResultado() {
        return this.resultado;
    }
    setResultado(resultado) {
        this.resultado = resultado;
    }
    getMontante() {
        return this.montante;
    }
     setMontante(montante) {
        this.montante = montante;
    }
    getData() {
        return this.data;
    }
     setData(data) {
        this.data = data;
    }
    
    toString() {
        return JSON.stringify(this);
    }

    notificarObservador() {

    }
    
    
}
