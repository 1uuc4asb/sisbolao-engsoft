class Aposta {

    constructor (dono,valor) {
        this.dono = dono;
        this.valor = valor;
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