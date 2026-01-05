import createStructProtocol from "../createStructProtocol.js";
import type Exigencias from "../Exigencias.js";
import type Protocol from "../Protocol.js";
import getProtocols from "../protocolsData/getProtocols.js";
import initAfterLoad from "./initAfterLoad.js";

export default class LoadProtocols {
    private url: string;

    icon: HTMLElement | null;
    alert: HTMLElement | null;

    tablePublic: HTMLTableElement | null;
    tableDoc: HTMLTableElement | null;
    tableTitle: HTMLTableElement | null;
    tableDepositDefeated: HTMLTableElement | null;
    tableDefeated: HTMLTableElement | null;
    tableCompleted: HTMLTableElement | null;

    constructor(
        url: string,
        icon: string,
        alert: string,
        tablePublic: string,
        tableDoc: string,
        tableTitle: string,
        tableDepositDefeated: string,
        tableDefeated: string,
        tableCompleted: string
    ) {
        this.url = url;

        this.icon = document.querySelector(icon);
        this.alert = document.querySelector(alert);

        this.tablePublic = document.querySelector(tablePublic);
        this.tableDoc = document.querySelector(tableDoc);
        this.tableTitle = document.querySelector(tableTitle);
        this.tableDepositDefeated =
            document.querySelector(tableDepositDefeated);
        this.tableDefeated = document.querySelector(tableDefeated);
        this.tableCompleted = document.querySelector(tableCompleted);
    }

    addProtocolsInTable(exigencias: Exigencias | null) {
        if (!exigencias) return;

        const tables: Record<keyof Exigencias, HTMLTableElement | null> = {
            public: this.tablePublic,
            doc: this.tableDoc,
            title: this.tableTitle,
            depositDefeated: this.tableDepositDefeated,
            defeated: this.tableDefeated,
            completed: this.tableCompleted,
        };

        // deve fazer a tipagem Array<keyof Exigencias> para que o typescript não recuse na hora de passar a key para o array.
        const keysExigencias = Object.keys(exigencias) as Array<
            keyof Exigencias
        >;

        keysExigencias.forEach((key) => {
            const protocolsCheck = exigencias[key];
            const table = tables[key];

            if (table && protocolsCheck) {
                protocolsCheck.forEach((protocolObject: Protocol) => {
                    const row = createStructProtocol(
                        protocolObject.protocol,
                        protocolObject.dateCadastro,
                        protocolObject.dateEnvio,
                        protocolObject.interessado,
                        protocolObject.cpf,
                        protocolObject.dateVencimento,
                        protocolObject.deposito,
                        protocolObject.status
                    );

                    table.appendChild(row);
                });
            }
        });
    }

    async fetchProtocols(): Promise<Exigencias | null> {
        const messageSuccess = "Exigências carregadas com sucesso";
        const messageError = "Erro ao carregar os dados";

        const data: Exigencias | null = await getProtocols(this.url, messageSuccess, messageError);

        if(this.icon) this.icon.remove();

        if(!data) return null;

        return data;
    }

    async loadProtocols() {
        const protocols: Exigencias | null = await this.fetchProtocols();
        this.addProtocolsInTable(protocols);

        initAfterLoad();
    }

    init(): LoadProtocols {
        if (
            this.url &&
            this.icon &&
            this.alert &&
            this.tablePublic &&
            this.tableDoc &&
            this.tableTitle &&
            this.tableDepositDefeated &&
            this.tableDefeated &&
            this.tableCompleted
        )
            this.loadProtocols();

        return this;
    }
}
