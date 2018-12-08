class Usuario {
    // #login; 
    constructor(login) {
        if (new.target === Usuario) {
            throw new TypeError("Cannot construct Abstract instances directly");
        } else {
            this.login = login;
        }
    }


    visualizarBolao() {

    }
    getLogin() {
        return this.login;
    }

    setLogin(login) {
        this.login = login;
    }
}
