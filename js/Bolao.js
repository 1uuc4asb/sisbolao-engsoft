class Bolao {
    
    constructor (jogos,scoreRules,tiebreakerRules, administrador) {
        this.apostadores = [];
        this.ranking = [];
        this.jogos = jogos;
        this.scoreRules = scoreRules;
        this.tiebreakerRules = tiebreakerRules;
        this.Administrador = administrador;
    }

    calcularPremioeDefinirVencedor(callback) {
        console.log("Jogo acabou. Definindo premio e vencedor");
        var qtApostas = 0;
        for(let i=0;i<this.jogos.length; i++) {
             qtApostas += this.jogos[i].getApostas().length;
        }
        if(qtApostas <= 0) {
            this.ranking[0] = { apostador: "NÃO HOUVERAM APOSTAS" , pontuacao: 0 };
        }
        else {
            var thisBolao = this;
            var premio = 0;
            for(let i=0;i<this.jogos.length; i++) {
                premio += parseFloat(this.jogos[i].getMontante());
            }
            var novoRanking = [];
            var lastRank;
            console.log("CARALHPORRA", this.ranking);
            if(this.ranking[0].pontuacao == this.ranking[1].pontuacao) {
                console.log("Empate");
                novoRanking.push(this.ranking[0]);
                novoRanking.push(this.ranking[1]);
                let i = 2;
                while( this.ranking[i] && (this.ranking[i-1].pontuacao == this.ranking[i].pontuacao)) {
                    novoRanking.push(this.ranking[i]);
                    i++;
                }
                lastRank = i;
                switch (this.tiebreakerRules) { // FAZER O DESEMPATE E ORDENAR NOVO RANKING
                    case "random": 
                        novoRanking.sort(function () {
                            return (Math.round(Math.random())-0.5);
                        });
                        break;
                    case "ordemalfabetica":
                        novoRanking.sort(function(a,b) {
                            return a.apostador < b.apostador ? -1 : a.apostador > b.apostador ? 1 : 0;
                        });
                        break;
                    case "nboloes":
                        var usuariosDoBolao = [];
                        for(let i=0;i<thisBolao.apostadores.length;i++) {
                            var usuario = new Apostador(thisBolao.apostadores[i]);
                            $.ajax({
                                url: "../php/pegaApostadorById.php",
                                method: "POST",
                                data: { login: usuario.getLogin() },
                                async: false
                            }).done(function (msg) {
                                var usrObj = JSON.parse(msg);
                                console.log(usrObj);
                                usuario.setBoloes(usrObj.boloes);
                                usuario.setApostas(usrObj.apostas);
                            });
                            usuariosDoBolao.push(usuario);
                        }
                        console.log(usuariosDoBolao);
                        novoRanking.sort(function(a,b) {
                            return usuariosDoBolao.find( x => x.getLogin() == a.apostador).getBoloes().length > usuariosDoBolao.find( x => x.getLogin() == b.apostador).getBoloes().length ? -1 : usuariosDoBolao.find( x => x.getLogin() == a.apostador).getBoloes().length < usuariosDoBolao.find( x => x.getLogin() == b.apostador).getBoloes().length ? 1 : 0;
                        });
                        break;
                }
                for(let i = lastRank+1; i<this.ranking.length; i++) {
                    novoRanking.push(this.ranking[i]);
                }
                console.log("Atualizou");
                this.ranking = novoRanking;
                this.ranking[0].apostador = " VENCEDOR! PREMIO: R$" + premio + " / " + this.ranking[0].apostador;
                console.log("Atualizou");
            }
            else {
                console.log("Sem empate");
                this.ranking[0].apostador = " VENCEDOR! PREMIO: R$" + premio + " / " + this.ranking[0].apostador;
            }
            console.log("Ranking final:", this.ranking);  
        }
        callback();
    }
    
    atualizarRanking(callback,apostas,resultado) {
        console.log("CARALHOOO", apostas,resultado);
        var thisBolao = this;
        var gol1 = resultado.substring(0,resultado.indexOf("X") - 1);
        var gol2 = resultado.substring(resultado.indexOf("X") + 2);
        for(let i=0;i<apostas.length;i++) {
            let palpite1 = apostas[i].palpite.substring(0,apostas[i].palpite.indexOf("X"));
            let palpite2 = apostas[i].palpite.substring(apostas[i].palpite.indexOf("X") + 1);
            let rank = { apostador: apostas[i].dono , pontuacao: 0 };
            console.log("Gols e palpites: ", gol1,gol2,palpite1,palpite2);
            if(gol1 == palpite1 && palpite2 == palpite2) {
                rank.pontuacao += parseFloat(this.getRegras()[0]);
            }
            let vencedorReal = (gol1 > gol2? 1 : 2);
            let vencedorPalpite = (palpite1 > palpite2? 1 : 2);
            if (vencedorReal == vencedorPalpite) {
                rank.pontuacao += parseFloat(this.getRegras()[1]);
            }
            if(gol1 == palpite1) {
                rank.pontuacao += parseFloat(this.getRegras()[2]);
            }
            if(gol2 == palpite2) {
                rank.pontuacao += parseFloat(this.getRegras()[2]);
            }
            console.log("REGRAS: ", parseFloat(this.getRegras()[0]));
            this.ranking.push(rank);
        }
        this.ranking.sort(function (a,b) {
            if(a.pontuacao < b.pontuacao) {
                return 1;
            }
            if(a.pontuacao > b.pontuacao) {
                return -1;
            }
            return 0;
        });
        // Verifica se todos os jogos acabaram, se sim, chama calcula premio e define vencedor.
        var acabou = true;
        for(let i=0;i<this.jogos.length; i++) {
            console.log("Resultadoooo:", this.jogos[i].getResultado());
            if(this.jogos[i].getResultado() == "") {
                acabou = false;
            }
        }
        var answerGlobal = true;
        if(acabou) {
            this.calcularPremioeDefinirVencedor(function () {
                console.log("Calculou tudo, agora vai guardar...");
                $.ajax({
                    url: "../php/salvarRankingDeBolao.php",
                    method: "POST",
                    data: {bolao: thisBolao.toString()}
                }).done(function (msg) {
                    if(msg != "success") {
                        alert(msg);
                        answerGlobal = false;
                    }
                    console.log("SUCESSO SALVANDO O RANKING");
                    callback(answerGlobal);
                });
            });
        }
        else {
            $.ajax({
                    url: "../php/salvarRankingDeBolao.php",
                    method: "POST",
                    data: {bolao: thisBolao.toString()}
                }).done(function (msg) {
                    if(msg != "success") {
                        alert(msg);
                        answerGlobal = false;
                    }
                    console.log(thisBolao.ranking);
                    callback(answerGlobal);
                });
        }
    }
    
    getAdministrador() {
        return this.Administrador;
    }
     setAdministrador(Administrador) {
        this.Administrador = Administrador;
    }
  
    setID(id) {
        this.id = id;
    }
    
    getID() {
        return this.id;
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
        return this.scoreRules;
    }

    setRegras(scoreRules) {
        this.scoreRules = scoreRules;
    }

    getRegrasdeDesempate() {
        return this.tiebreakerRules;
    }

    setRegrasDeDesempate(tiebreakerRules) {
        this.tiebreakerRules = tiebreakerRules;
    }
    
    toString() {
        return JSON.stringify(this);
    }

}