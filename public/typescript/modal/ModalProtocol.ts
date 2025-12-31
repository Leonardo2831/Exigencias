export default class ModalProtocol {
    buttonNew: HTMLElement | null;
    buttonClose: HTMLElement | null;

    modal: HTMLElement | null;
    inputDataInvit: HTMLInputElement | null;

    classViewModal: string;

    constructor(
        buttonNew: string,
        modal: string,
        inputDataInvit: string,
        buttonClose: string,
        classViewModal: string
    ) {
        this.buttonNew = document.querySelector(buttonNew);
        this.buttonClose = document.querySelector(buttonClose);

        this.modal = document.querySelector(modal);
        this.inputDataInvit = document.querySelector(inputDataInvit);

        this.classViewModal = classViewModal;

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        this.modal?.classList.add(this.classViewModal);
    }

    newValueInput(): void {
        if (!this.inputDataInvit) return;
        
        const date = new Date();
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = String(date.getFullYear());

        this.inputDataInvit.value = `${year}-${month}-${day}`;
    }

    openModal(): void {
        if (this.inputDataInvit) this.newValueInput();

        if (!this.modal) return;
        this.modal.classList.remove(this.classViewModal);
    }

    addEvents() {
        this.buttonNew?.addEventListener("click", this.openModal);
        this.buttonClose?.addEventListener("click", this.closeModal);
    }

    init(): ModalProtocol {
        if (this.buttonNew && this.modal && this.buttonClose) this.addEvents();
        return this;
    }
}
