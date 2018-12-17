class ListaDeObservadores {
    constructor() {
        this.lista = [];
    }
    
    adicionar (observador) {
        this.lista.push(observador);
    }
    
    remover(indice) {
        this.lista.splice(indice,1);
    }
    
    pegar(indice) {
        for(let i=0;i<this.lista.length; i++) {
            if(i==indice) {
                return this.lista[i];
            }
        }
    }
    
    contar() {
        return this.lista.length;
    }
    
     getListaDeObservadores() {
        return this.lista;
    }
     setListadeObservadores(observadores) {
        this.lista = observadores;
    } 
}
