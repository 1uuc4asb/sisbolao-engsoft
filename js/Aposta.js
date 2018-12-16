class Aposta {

    constructor (palpite, dono,valor) {
        this.palpite = palpite;
        this.dono = dono;
        this.valor = valor;
    }
    
    getPalpite() {
        return this.palpite;
    }
    
    setPalpite(palpite) {
        this.palpite = palpite;
    }

    getValor() {
        return this.valor;
    }

    setValor(valor) {
        this.valor = valor;
    }
    getDono() {
        return this.dono;
    }

    setDono(dono) {
        this.dono = dono;
    }
}