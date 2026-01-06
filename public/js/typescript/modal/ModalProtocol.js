import dayjs from "dayjs";
export default class ModalProtocol {
    constructor(buttonNew, modal, inputDataInvit, buttonClose, classViewModal) {
        this.buttonNew = document.querySelector(buttonNew);
        this.buttonClose = document.querySelector(buttonClose);
        this.modal = document.querySelector(modal);
        this.inputDataInvit = document.querySelector(inputDataInvit);
        this.classViewModal = classViewModal;
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    closeModal() {
        var _a;
        (_a = this.modal) === null || _a === void 0 ? void 0 : _a.classList.add(this.classViewModal);
    }
    newValueInput() {
        if (!this.inputDataInvit)
            return;
        const date = dayjs();
        const day = String(date.date()).padStart(2, "0");
        const month = String(date.month() + 1).padStart(2, "0");
        const year = String(date.year());
        this.inputDataInvit.value = `${year}-${month}-${day}`;
    }
    openModal() {
        if (this.inputDataInvit)
            this.newValueInput();
        if (!this.modal)
            return;
        this.modal.classList.remove(this.classViewModal);
    }
    addEvents() {
        var _a, _b;
        (_a = this.buttonNew) === null || _a === void 0 ? void 0 : _a.addEventListener("click", this.openModal);
        (_b = this.buttonClose) === null || _b === void 0 ? void 0 : _b.addEventListener("click", this.closeModal);
    }
    init() {
        if (this.buttonNew && this.modal && this.buttonClose)
            this.addEvents();
        return this;
    }
}
