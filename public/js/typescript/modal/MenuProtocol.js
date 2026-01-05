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
import deleteProtocol from "../protocolsData/deleteProtocol.js";
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
        this.moveToCompletedEvent = this.moveToCompletedEvent.bind(this);
        this.moveToDefeatedDepositEvent = this.moveToDefeatedDepositEvent.bind(this);
        this.moveToDefeatedEvent = this.moveToDefeatedEvent.bind(this);
        this.deleteProtocolEvent = this.deleteProtocolEvent.bind(this);
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
    moveToCompletedEvent(event) { }
    moveToDefeatedDepositEvent(event) { }
    moveToDefeatedEvent(event) { }
    deleteProtocolEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            event.stopPropagation();
            if (!this.rowTarget || !this.url)
                return;
            deleteProtocol(this.rowTarget, this.url);
            (_a = this.modal) === null || _a === void 0 ? void 0 : _a.classList.remove(this.classActiveModal);
            (_b = this.clickOutside) === null || _b === void 0 ? void 0 : _b.removeEventClickOutside();
            this.clickOutside = null;
            this.rowTarget = null;
        });
    }
    addEvents() {
        if (this.sendCompleted)
            this.sendCompleted.addEventListener("click", this.moveToCompletedEvent);
        if (this.sendDefeatedDeposit)
            this.sendDefeatedDeposit.addEventListener("click", this.moveToDefeatedDepositEvent);
        if (this.sendDefeated)
            this.sendDefeated.addEventListener("click", this.moveToDefeatedEvent);
        if (this.deleteButton)
            this.deleteButton.addEventListener("click", this.deleteProtocolEvent);
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
