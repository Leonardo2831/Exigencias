import ClickOutside from "../ClickOutside.js";

export default class MenuProtocol {
    private datasetProtocol: string;

    private modal: HTMLElement | null;

    private sendDefeatedDeposit: HTMLElement | null;
    private sendDefeated: HTMLElement | null;
    private sendCompleted: HTMLElement | null;
    private deleteButton: HTMLElement | null;

    private classActiveModal: string;

    private clickOutside: ClickOutside | null;

    constructor(
        datasetProtocol: string,
        modal: string,
        sendDefeated: string,
        sendDefeatedDeposit: string,
        deleteButton: string,
        sendCompleted: string,
        classActiveModal: string
    ) {
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

    styleModal(event: MouseEvent): void {
        if (!this.modal) return;

        const position = {
            x: event.clientX,
            y: event.clientY,
        };

        this.modal.style.left = `${position.x - 220}px`;
        this.modal.style.top = `${position.y + 20}px`;
    }

    moveToCompleted() {}

    moveToDefeatedDeposit() {}

    moveToDefeated() {}

    deleteProtocol(event: MouseEvent) {
        
    }

    removeEvents() {}

    addEvents(): void {
        if (this.sendCompleted)
            this.sendCompleted.addEventListener("click", this.moveToCompleted);
        if (this.sendDefeatedDeposit)
            this.sendDefeatedDeposit.addEventListener(
                "click",
                this.moveToDefeatedDeposit
            );
        if (this.sendDefeated)
            this.sendDefeated.addEventListener("click", this.moveToDefeated);
        if (this.deleteButton)
            this.deleteButton.addEventListener("click", this.deleteProtocol);
    }

    openModal(event: MouseEvent): void {
        event.stopPropagation();

        const protocolTarget: HTMLElement | null = (
            event.target as HTMLElement
        )?.closest(this.datasetProtocol);
        if (!protocolTarget) return;

        if (!this.modal) return;

        this.modal.classList.add(this.classActiveModal);
        this.styleModal(event);

        this.clickOutside = new ClickOutside(
            this.modal,
            "data-outside",
            "click",
            () => {
                this.modal?.classList.remove(this.classActiveModal);
                this.clickOutside?.removeEventClickOutside();
                this.clickOutside = null;
            }
        ).init();

        this.addEvents();
    }
}
