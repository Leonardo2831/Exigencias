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
import getProtocols from "../protocolsData/getProtocols.js";
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
                    const row = createStructProtocol(protocolObject.protocol, protocolObject.dateCadastro, protocolObject.dateEnvio, protocolObject.interessado, protocolObject.cpf, protocolObject.dateVencimento, protocolObject.deposito, protocolObject.state);
                    table.appendChild(row);
                });
            }
        });
    }
    fetchProtocols() {
        return __awaiter(this, void 0, void 0, function* () {
            const messageSuccess = "Exigências carregadas com sucesso";
            const messageError = "Erro ao carregar os dados";
            const data = yield getProtocols(this.url, messageSuccess, messageError);
            if (this.icon)
                this.icon.remove();
            if (!data)
                return null;
            return data;
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
