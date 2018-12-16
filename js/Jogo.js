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
    }

    getApostas() {
        return this.apostas;
    }

    setApostas(apostas) {
        this.apostas = apostas;
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
        this.notificarObservador();
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
