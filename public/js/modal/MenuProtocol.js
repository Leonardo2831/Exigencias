import ClickOutside from "../ClickOutside.js";
export default class MenuProtocol {
    constructor(datasetProtocol, modal, sendDefeated, sendDefeatedDeposit, deleteButton, sendCompleted, classActiveModal) {
        this.datasetProtocol = datasetProtocol;
        this.modal = document.querySelector(modal);
        this.sendDefeatedDeposit = document.querySelector(sendDefeatedDeposit);
        this.sendDefeated = document.querySelector(sendDefeated);
        this.sendCompleted = document.querySelector(sendCompleted);
        this.deleteButton = document.querySelector(deleteButton);
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
    moveToCompleted() { }
    moveToDefeatedDeposit() { }
    moveToDefeated() { }
    deleteProtocol(event) {
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
        const protocolTarget = (_a = event.target) === null || _a === void 0 ? void 0 : _a.closest(this.datasetProtocol);
        if (!protocolTarget)
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
