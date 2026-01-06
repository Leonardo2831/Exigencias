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
import changeType from "../protocolsData/changeType.js";
import deleteProtocol from "../protocolsData/deleteProtocol.js";
export default class MenuProtocol {
    constructor(url, datasetProtocol, datasetButton, modal, sendDefeated, sendDefeatedDeposit, sendCompleted, sendCopy, deleteButton, classActiveModal) {
        this.url = url;
        this.datasetProtocol = datasetProtocol;
        this.datasetButton = datasetButton;
        this.modal = document.querySelector(modal);
        this.sendDefeated = document.querySelector(sendDefeated);
        this.sendDefeatedDeposit = document.querySelector(sendDefeatedDeposit);
        this.deleteButton = document.querySelector(deleteButton);
        this.sendCompleted = document.querySelector(sendCompleted);
        this.sendCopy = document.querySelector(sendCopy);
        this.rowTarget = null;
        this.classActiveModal = classActiveModal;
        this.clickOutside = null;
        this.openModal = this.openModal.bind(this);
        this.moveToChoicedOption = this.moveToChoicedOption.bind(this);
        this.deleteProtocolEvent = this.deleteProtocolEvent.bind(this);
        this.copyProtocol = this.copyProtocol.bind(this);
    }
    styleModal(event) {
        if (!this.modal)
            return;
        const position = {
            x: event.pageX,
            y: event.pageY,
        };
        const heightModal = this.modal.offsetHeight;
        if (event.clientY + heightModal > window.innerHeight) {
            this.modal.style.left = `${position.x - 220}px`;
            this.modal.style.top = `${position.y - heightModal - 10}px`;
        }
        else {
            this.modal.style.left = `${position.x - 220}px`;
            this.modal.style.top = `${position.y + 20}px`;
        }
    }
    removeEvents() {
        var _a, _b;
        (_a = this.modal) === null || _a === void 0 ? void 0 : _a.classList.remove(this.classActiveModal);
        (_b = this.clickOutside) === null || _b === void 0 ? void 0 : _b.removeEventClickOutside();
        this.clickOutside = null;
        this.rowTarget = null;
    }
    copyProtocol(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.stopPropagation();
            if (!this.rowTarget || !this.url)
                return;
            const valuesClipboard = [];
            Array.from(this.rowTarget.children).forEach((child) => {
                var _a;
                valuesClipboard.push(((_a = child.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "");
            });
            // \t = tab
            yield navigator.clipboard.writeText(valuesClipboard.join("\t"));
            this.removeEvents();
        });
    }
    moveToChoicedOption(event) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            event.stopPropagation();
            const type = (_a = event.target
                .closest("[data-send]")) === null || _a === void 0 ? void 0 : _a.getAttribute("data-send");
            if (!this.rowTarget || !this.url || !type)
                return;
            const idProtocol = this.rowTarget.getAttribute("data-id");
            if (!idProtocol)
                return;
            const messageSuccess = "Protocolo movido para vencidos com sucesso.";
            const messageError = "Protocolo não encontrado.";
            yield changeType(this.rowTarget, this.url, idProtocol, type, messageSuccess, messageError);
            this.removeEvents();
        });
    }
    deleteProtocolEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.stopPropagation();
            if (!this.rowTarget || !this.url)
                return;
            const idProtocol = this.rowTarget.getAttribute("data-id");
            if (!idProtocol)
                return;
            const messageSuccess = "Protocolo deletado com sucesso.";
            const messageError = "Protocolo não encontrado.";
            yield deleteProtocol(this.rowTarget, this.url, idProtocol, messageSuccess, messageError);
            this.removeEvents();
        });
    }
    addEvents() {
        if (this.sendCompleted)
            this.sendCompleted.addEventListener("click", this.moveToChoicedOption);
        if (this.sendDefeatedDeposit)
            this.sendDefeatedDeposit.addEventListener("click", this.moveToChoicedOption);
        if (this.sendDefeated)
            this.sendDefeated.addEventListener("click", this.moveToChoicedOption);
        if (this.deleteButton)
            this.deleteButton.addEventListener("click", this.deleteProtocolEvent);
        if (this.sendCopy)
            this.sendCopy.addEventListener("click", this.copyProtocol);
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
