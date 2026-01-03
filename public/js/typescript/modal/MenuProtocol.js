var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ClickOutside from "../ClickOutside.js";
export default class MenuProtocol {
    constructor(url, datasetProtocol, datasetButton, modal, sendDefeated, sendDefeatedDeposit, sendCompleted, deleteButton, classActiveModal) {
        this.url = url;
        this.datasetProtocol = datasetProtocol;
        this.datasetButton = datasetButton;
        this.modal = document.querySelector(modal);
        this.sendDefeated = document.querySelector(sendDefeated);
        this.sendDefeatedDeposit = document.querySelector(sendDefeatedDeposit);
        this.deleteButton = document.querySelector(deleteButton);
        this.sendCompleted = document.querySelector(sendCompleted);
        this.rowTarget = null;
        this.classActiveModal = classActiveModal;
        this.clickOutside = null;
        this.openModal = this.openModal.bind(this);
        this.moveToCompleted = this.moveToCompleted.bind(this);
        this.moveToDefeatedDeposit = this.moveToDefeatedDeposit.bind(this);
        this.moveToDefeated = this.moveToDefeated.bind(this);
        this.deleteProtocol = this.deleteProtocol.bind(this);
    }
    styleModal(event) {
        if (!this.modal)
            return;
        const position = {
            x: event.clientX,
            y: event.clientY,
        };
        this.modal.style.left = `${position.x - 220}px`;
        this.modal.style.top = `${position.y + 20}px`;
    }
    moveToCompleted(event) { }
    moveToDefeatedDeposit(event) { }
    moveToDefeated(event) { }
    deleteProtocol(event) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            event.stopPropagation();
            if (!this.rowTarget)
                return;
            const idProtocol = this.rowTarget.getAttribute("data-id");
            if (!idProtocol)
                return;
            const message = document.querySelector("[data-delete='alert']");
            if (!message)
                return;
            try {
                const getResponse = yield fetch(`${this.url}/exigencias`);
                if (!getResponse.ok)
                    throw new Error("Erro ao buscar dados do servidor.");
                const data = yield getResponse.json();
                const keys = Object.keys(data);
                let found = false;
                keys.forEach((key) => {
                    const list = data[key];
                    const index = list.findIndex((p) => p.protocol === idProtocol);
                    if (index !== -1) {
                        list.splice(index, 1);
                        found = true;
                    }
                });
                if (found) {
                    const updateResponse = yield fetch(`${this.url}/exigencias`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    });
                    if (!updateResponse.ok)
                        throw new Error("Erro ao atualizar dados no servidor.");
                    this.rowTarget.remove();
                    message.textContent = "Protocolo deletado com sucesso.";
                    message.classList.add("success");
                    setTimeout(() => {
                        message.textContent = "";
                        message.classList.remove("success");
                    }, 3000);
                }
                else {
                    throw new Error("Protocolo não encontrado.");
                }
            }
            catch (error) {
                message.textContent = "Protocolo não encontrado.";
                message.classList.add("error");
                setTimeout(() => {
                    message.textContent = "";
                    message.classList.remove("error");
                }, 3000);
                console.error("Erro em deletar o protocolo:", error);
            }
            (_a = this.modal) === null || _a === void 0 ? void 0 : _a.classList.remove(this.classActiveModal);
            (_b = this.clickOutside) === null || _b === void 0 ? void 0 : _b.removeEventClickOutside();
            this.clickOutside = null;
            this.rowTarget = null;
        });
    }
    removeEvents() { }
    addEvents() {
        if (this.sendCompleted)
            this.sendCompleted.addEventListener("click", this.moveToCompleted);
        if (this.sendDefeatedDeposit)
            this.sendDefeatedDeposit.addEventListener("click", this.moveToDefeatedDeposit);
        if (this.sendDefeated)
            this.sendDefeated.addEventListener("click", this.moveToDefeated);
        if (this.deleteButton)
            this.deleteButton.addEventListener("click", this.deleteProtocol);
    }
    openModal(event) {
        var _a;
        event.stopPropagation();
        this.rowTarget = event.target.closest(this.datasetProtocol);
        const buttonTarget = (_a = event.target) === null || _a === void 0 ? void 0 : _a.closest(this.datasetButton);
        if (!buttonTarget)
            return;
        if (!this.modal)
            return;
        this.modal.classList.add(this.classActiveModal);
        this.styleModal(event);
        this.clickOutside = new ClickOutside(this.modal, "data-outside", "click", () => {
            var _a, _b;
            (_a = this.modal) === null || _a === void 0 ? void 0 : _a.classList.remove(this.classActiveModal);
            (_b = this.clickOutside) === null || _b === void 0 ? void 0 : _b.removeEventClickOutside();
            this.clickOutside = null;
        }).init();
        this.addEvents();
    }
}
