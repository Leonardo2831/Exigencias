export default class NewProtocol {
    constructor(protocol, typeDocument, dateCadastro, dateEnvio, interessado, cpf, dateVencimento, deposito, buttonAdd) {
        this.protocol = document.querySelector(protocol);
        this.dateCadastro = document.querySelector(dateCadastro);
        this.dateEnvio = document.querySelector(dateEnvio);
        this.interessado = document.querySelector(interessado);
        this.cpf = document.querySelector(cpf);
        this.dateVencimento = document.querySelector(dateVencimento);
        this.deposito = document.querySelector(deposito);
        this.typeDocument = document.querySelector(typeDocument);
        this.buttonAdd = document.querySelector(buttonAdd);
    }
    init() {
        return this;
    }
}
