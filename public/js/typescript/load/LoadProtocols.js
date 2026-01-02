var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import createStructProtocol from "../createStructProtocol.js";
import initAfterLoad from "./initAfterLoad.js";
export default class LoadProtocols {
    constructor(url, icon, alert, tablePublic, tableDoc, tableTitle, tableDepositDefeated, tableDefeated, tableCompleted) {
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
    addProtocolsInTable(exigencias) {
        if (!exigencias)
            return;
        const tables = {
            public: this.tablePublic,
            doc: this.tableDoc,
            title: this.tableTitle,
            depositDefeated: this.tableDepositDefeated,
            defeated: this.tableDefeated,
            completed: this.tableCompleted,
        };
        // deve fazer a tipagem Array<keyof Exigencias> para que o typescript não recuse na hora de passar a key para o array.
        const keysExigencias = Object.keys(exigencias);
        keysExigencias.forEach((key) => {
            const protocolsCheck = exigencias[key];
            const table = tables[key];
            if (table && protocolsCheck) {
                protocolsCheck.forEach((protocolObject) => {
                    const row = createStructProtocol(protocolObject.protocol, protocolObject.dateCadastro, protocolObject.dateEnvio, protocolObject.interessado, protocolObject.cpf, protocolObject.dateVencimento, protocolObject.deposito, protocolObject.status);
                    table.appendChild(row);
                });
            }
        });
    }
    fetchProtocols() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${this.url}/exigencias`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok)
                    throw new Error("Erro na requisição");
                const data = yield response.json();
                if (!data)
                    throw new Error("Erro ao carregar os dados");
                if (this.icon)
                    this.icon.remove();
                if (!this.alert)
                    return data;
                this.alert.textContent = "Exigências carregadas com sucesso";
                this.alert.classList.add("sucess");
                setTimeout(() => {
                    if (!this.alert)
                        return;
                    this.alert.textContent = "";
                    this.alert.classList.remove("sucess");
                }, 3000);
                return data;
            }
            catch (error) {
                console.log(error);
                if (this.icon)
                    this.icon.remove();
                if (!this.alert)
                    return null;
                this.alert.textContent = "Erro ao carregar os dados";
                this.alert.classList.add("error");
                setTimeout(() => {
                    if (!this.alert)
                        return;
                    this.alert.textContent = "";
                    this.alert.classList.remove("error");
                }, 3000);
                return null;
            }
        });
    }
    loadProtocols() {
        return __awaiter(this, void 0, void 0, function* () {
            const protocols = yield this.fetchProtocols();
            this.addProtocolsInTable(protocols);
            initAfterLoad();
        });
    }
    init() {
        if (this.url &&
            this.icon &&
            this.alert &&
            this.tablePublic &&
            this.tableDoc &&
            this.tableTitle &&
            this.tableDepositDefeated &&
            this.tableDefeated &&
            this.tableCompleted)
            this.loadProtocols();
        return this;
    }
}
