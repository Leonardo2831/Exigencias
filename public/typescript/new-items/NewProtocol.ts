import eventSelect from "../inputs/eventSelect.js";
import createStructProtocol from "../createStructProtocol.js";
import postProtocol from "../postProtocol.js";
import verifyDefeated from "../verifyDefeated.js";

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
            console.log(
                this.protocol?.value,
                this.dateCadastro?.value,
                this.dateEnvio?.value,
                this.interessado?.value,
                this.cpf?.value,
                this.dateVencimento?.value
            );

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

        const protocolSaved: boolean = await postProtocol(
            newItemToSave,
            this.urlPost,
            this.typeDocument.value,
            "Protocolo salvo com sucesso",
            "Erro ao salvar o protocolo"
        );

        if (protocolSaved) {
            const table = document.querySelector(
                `[data-protocol='${this.typeDocument?.value}']`
            );
            table?.appendChild(protocolRow);
        }

        this.form?.reset();
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
