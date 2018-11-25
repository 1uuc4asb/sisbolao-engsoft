var Bolão = function (apostadores, jogos, ranking, regras, regras_de_desempate) {
    this.id = ""; // Resolver isso
    this.apostadores = "";
    this.jogos = jogos;
    this.ranking = ranking;
    if (regras === undefined && regras_de_desempate === undefined) {
        this.regras = "";
        this.regras_de_desempate = "";
    } else {
        this.regras = regras;
        this.regras_de_desempates = regras_de_desempate;
    }
}

Bolão.prototype.calcularPremioeDefinirVencedor = function () {

}

Bolão.prototype.atualizarRanking = function () {

}

Bolão.prototype.getApostadores = function () {
    return this.apostadores;
}

Bolão.prototype.setApostadores = function (apostadores) {
    this.apostadores = apostadores;
}

Bolão.prototype.getJogos = function () {
    return this.jogos;
}

Bolão.prototype.setJogos = function (jogos) {
    this.jogos = jogos;
}

Bolão.prototype.getRanking = function () {
    return this.ranking;
}

Bolão.prototype.setRanking = function (ranking) {
    this.ranking = ranking;
}

Bolão.prototype.getRegras = function () {
    return this.regras;
}

Bolão.prototype.setRegras = function (regras) {
    this.regras = regras;
}

Bolão.prototype.getRegrasdeDesempate = function () {
    return this.regras_de_desempate;
}

Bolão.prototype.setRegrasDeDesempate = function () {
    this.regras_de_desempate;
}
