import eventSelect from "../inputs/eventSelect.js";

export default class NewProtocol {
    protocol: HTMLInputElement | null;
    dateCadastro: HTMLInputElement | null;
    dateEnvio: HTMLInputElement | null;
    interessado: HTMLInputElement | null;
    cpf: HTMLInputElement | null;
    dateVencimento: HTMLInputElement | null;
    deposito: HTMLInputElement | null;

    typeDocument: HTMLSelectElement | null;

    buttonAdd: HTMLButtonElement | null;

    constructor(
        protocol: string,
        typeDocument: string,
        dateCadastro: string,
        dateEnvio: string,
        interessado: string,
        cpf: string,
        dateVencimento: string,
        deposito: string,
        buttonAdd: string,
    ) {
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

    addEvents(){
        eventSelect();
    }

    init(): NewProtocol {
        this.addEvents();

        return this;
    }
}
