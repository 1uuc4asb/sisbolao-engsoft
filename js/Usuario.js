class Usuario {
    // #login; 
    constructor (login) {
        if(new.target === Usuario) {
            if (new.target === Abstract) {
              throw new TypeError("Cannot construct Abstract instances directly");
            }
        }
        else {
            this.login = login;
        }
    }


    verificarResultados() {

    }
    getLogin() {
        return this.login;
    }

    setLogin(login) {
        this.login = login;
    }
}