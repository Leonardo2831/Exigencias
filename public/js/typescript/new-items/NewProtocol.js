var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import eventSelect from "../inputs/eventSelect.js";
import createStructProtocol from "../createStructProtocol.js";
export default class NewProtocol {
    constructor(form, protocol, typeDocument, dateCadastro, dateEnvio, interessado, cpf, dateVencimento, deposito, buttonAdd, urlPost) {
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
        var _a;
        const inputs = (_a = this.form) === null || _a === void 0 ? void 0 : _a.querySelectorAll("input");
        inputs === null || inputs === void 0 ? void 0 : inputs.forEach((input) => {
            if (input.value == "") {
                input.classList.add("invalid");
                input.addEventListener("focus", () => input.classList.remove("invalid"));
            }
        });
    }
    postProtocol() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            const message = document.querySelector("[data-protocol='message']");
            try {
                // 1. GET current data
                const getResponse = yield fetch(`${this.urlPost}/exigencias`);
                if (!getResponse.ok)
                    throw new Error("Erro ao buscar dados atuais");
                const currentData = yield getResponse.json();
                const type = (_a = this.typeDocument) === null || _a === void 0 ? void 0 : _a.value;
                if (!type || !currentData[type]) {
                    throw new Error("Tipo de documento inválido ou não encontrado");
                }
                // 2. Prepare new item
                const newItem = {
                    protocol: (_b = this.protocol) === null || _b === void 0 ? void 0 : _b.value,
                    dateCadastro: (_c = this.dateCadastro) === null || _c === void 0 ? void 0 : _c.value,
                    dateEnvio: (_d = this.dateEnvio) === null || _d === void 0 ? void 0 : _d.value,
                    interessado: (_e = this.interessado) === null || _e === void 0 ? void 0 : _e.value,
                    cpf: (_f = this.cpf) === null || _f === void 0 ? void 0 : _f.value,
                    dateVencimento: (_g = this.dateVencimento) === null || _g === void 0 ? void 0 : _g.value,
                    deposito: (_h = this.deposito) === null || _h === void 0 ? void 0 : _h.value,
                    status: "Vigente", // Adding default status as seen in json
                };
                // 3. Append to correct array
                currentData[type].push(newItem);
                // 4. PUT updated data back
                const response = yield fetch(`${this.urlPost}/exigencias`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(currentData),
                });
                if (!response.ok)
                    throw new Error("Erro ao salvar o protocolo");
                if (!message)
                    return true;
                message.textContent = "Protocolo salvo com sucesso";
                message.classList.add("show", "success");
                setTimeout(() => {
                    message.textContent = "";
                    message.classList.remove("show", "success");
                }, 3000);
                return true;
            }
            catch (error) {
                console.log(error);
                if (!message)
                    return false;
                message.textContent = "Erro ao salvar o protocolo";
                message.classList.add("show", "error");
                setTimeout(() => {
                    message.textContent = "";
                    message.classList.remove("show", "error");
                }, 3000);
                return false;
            }
        });
    }
    addProtocol(event) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
            event.preventDefault();
            if (!((_a = this.protocol) === null || _a === void 0 ? void 0 : _a.value) ||
                !((_b = this.dateCadastro) === null || _b === void 0 ? void 0 : _b.value) ||
                !((_c = this.dateEnvio) === null || _c === void 0 ? void 0 : _c.value) ||
                !((_d = this.interessado) === null || _d === void 0 ? void 0 : _d.value) ||
                !((_e = this.cpf) === null || _e === void 0 ? void 0 : _e.value) ||
                !((_f = this.dateVencimento) === null || _f === void 0 ? void 0 : _f.value)) {
                console.log((_g = this.protocol) === null || _g === void 0 ? void 0 : _g.value, (_h = this.dateCadastro) === null || _h === void 0 ? void 0 : _h.value, (_j = this.dateEnvio) === null || _j === void 0 ? void 0 : _j.value, (_k = this.interessado) === null || _k === void 0 ? void 0 : _k.value, (_l = this.cpf) === null || _l === void 0 ? void 0 : _l.value, (_m = this.dateVencimento) === null || _m === void 0 ? void 0 : _m.value);
                this.addClassInvalid();
                return;
            }
            if (!this.deposito || !this.typeDocument)
                return;
            const protocolRow = createStructProtocol((_o = this.protocol) === null || _o === void 0 ? void 0 : _o.value, (_p = this.dateCadastro) === null || _p === void 0 ? void 0 : _p.value, (_q = this.dateEnvio) === null || _q === void 0 ? void 0 : _q.value, (_r = this.interessado) === null || _r === void 0 ? void 0 : _r.value, (_s = this.cpf) === null || _s === void 0 ? void 0 : _s.value, (_t = this.dateVencimento) === null || _t === void 0 ? void 0 : _t.value, (_u = this.deposito) === null || _u === void 0 ? void 0 : _u.value, "Vigente");
            const protocolSaved = yield this.postProtocol();
            if (protocolSaved) {
                const table = document.querySelector(`[data-protocol='${(_v = this.typeDocument) === null || _v === void 0 ? void 0 : _v.value}']`);
                table === null || table === void 0 ? void 0 : table.appendChild(protocolRow);
            }
            (_w = this.form) === null || _w === void 0 ? void 0 : _w.reset();
        });
    }
    addEvents() {
        var _a, _b;
        eventSelect();
        (_a = this.buttonAdd) === null || _a === void 0 ? void 0 : _a.addEventListener("click", this.addProtocol);
        (_b = this.form) === null || _b === void 0 ? void 0 : _b.addEventListener("submit", this.addProtocol);
    }
    init() {
        if (this.typeDocument && this.buttonAdd && this.form)
            this.addEvents();
        return this;
    }
}
