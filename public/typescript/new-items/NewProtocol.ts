import eventSelect from "../inputs/eventSelect.js";
import createStructProtocol from "../createStructProtocol.js";
import verifyDefeated from "../verifyDefeated.js";
import putProtocols from "../protocolsData/putProtocols.js";
import getProtocols from "../protocolsData/getProtocols.js";

export default class NewProtocol {
    form: HTMLFormElement | null;

    protocol: HTMLInputElement | null;
    dateCadastro: HTMLInputElement | null;
    dateEnvio: HTMLInputElement | null;
    interessado: HTMLInputElement | null;
    cpf: HTMLInputElement | null;
    dateVencimento: HTMLInputElement | null;
    deposito: HTMLInputElement | null;

    typeDocument: HTMLSelectElement | null;

    buttonAdd: HTMLButtonElement | null;

    private urlPost: string;

    constructor(
        form: string,
        protocol: string,
        typeDocument: string,
        dateCadastro: string,
        dateEnvio: string,
        interessado: string,
        cpf: string,
        dateVencimento: string,
        deposito: string,
        buttonAdd: string,
        urlPost: string
    ) {
        this.form = document.querySelector(form);

        this.protocol = document.querySelector(protocol);
        this.dateCadastro = document.querySelector(dateCadastro);
        this.dateEnvio = document.querySelector(dateEnvio);
        this.interessado = document.querySelector(interessado);
        this.cpf = document.querySelector(cpf);
        this.dateVencimento = document.querySelector(dateVencimento);
        this.deposito = document.querySelector(deposito);

        this.typeDocument = document.querySelector(typeDocument);

        this.buttonAdd = document.querySelector(buttonAdd);

        this.urlPost = urlPost;

        this.addProtocol = this.addProtocol.bind(this);
    }

    addClassInvalid() {
        const inputs = this.form?.querySelectorAll("input");

        inputs?.forEach((input) => {
            if (input.value == "") {
                input.classList.add("invalid");
                input.addEventListener("focus", () =>
                    input.classList.remove("invalid")
                );
            }
        });
    }

    async postProtocol(
        newItemToSave: any,
        callback: (newItemToSave : any, typeDocument : string, data : any) => void,
    ) {
        const messageSuccess = "Protocolo salvo com sucesso";
        const messageError = "Erro ao salvar o protocolo";
        
        const data = await getProtocols(this.urlPost, messageSuccess, messageError);

        if(!data || !this.typeDocument) return false;

        callback(newItemToSave, this.typeDocument.value, data);

        return await putProtocols(this.urlPost, data, messageSuccess, messageError);
    }

    async addProtocol(event: Event) {
        event.preventDefault();
        if (
            !this.protocol?.value ||
            !this.dateCadastro?.value ||
            !this.dateEnvio?.value ||
            !this.interessado?.value ||
            !this.cpf?.value ||
            !this.dateVencimento?.value
        ) {
            this.addClassInvalid();
            return;
        }

        if (!this.deposito || !this.typeDocument) return;

        const protocolRow = createStructProtocol(
            this.protocol?.value,
            this.dateCadastro?.value,
            this.dateEnvio?.value,
            this.interessado?.value,
            this.cpf?.value,
            this.dateVencimento?.value,
            this.deposito?.value,
            "Vigente"
        );

        const newItemToSave = {
            protocol: this.protocol?.value,
            dateCadastro: this.dateCadastro?.value,
            dateEnvio: this.dateEnvio?.value,
            interessado: this.interessado?.value,
            cpf: this.cpf?.value,
            dateVencimento: this.dateVencimento?.value,
            deposito: this.deposito?.value,
            status: "Vigente",
        };

        const protocolSaved: boolean = await this.postProtocol(
            newItemToSave,
            (newItem, typeDocument, data) => {
                const type = typeDocument;

                if (!type || !data[type]) {
                    throw new Error(
                        "Tipo de documento inválido ou não encontrado"
                    );
                }

                if (
                    newItem.deposito == "R$ 0,00" ||
                    newItem.deposito == "R$ 0,00"
                )
                    newItem.deposito = "";
                // 2. Append to correct array
                data[type].push(newItem);
            }
        );

        if (protocolSaved) {
            const table = document.querySelector(
                `[data-protocol='${this.typeDocument?.value}']`
            );
            table?.appendChild(protocolRow);
        }

        this.form?.reset();
        this.protocol?.focus();
        verifyDefeated("[data-defeated]");
    }

    addEvents() {
        eventSelect();
        this.buttonAdd?.addEventListener("click", this.addProtocol);
        this.form?.addEventListener("submit", this.addProtocol);
    }

    init(): NewProtocol {
        if (this.typeDocument && this.buttonAdd && this.form) this.addEvents();

        return this;
    }
}
