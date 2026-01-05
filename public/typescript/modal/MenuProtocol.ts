import ClickOutside from "../ClickOutside.js";
import changeType from "../protocolsData/changeType.js";
import deleteProtocol from "../protocolsData/deleteProtocol.js";

export default class MenuProtocol {
    private url: string;
    datasetProtocol: string;
    datasetButton: string;

    modal: HTMLElement | null;

    sendDefeatedDeposit: HTMLElement | null;
    sendDefeated: HTMLElement | null;
    sendCompleted: HTMLElement | null;
    deleteButton: HTMLElement | null;

    rowTarget: HTMLTableRowElement | null;

    classActiveModal: string;

    clickOutside: ClickOutside | null;

    constructor(
        url: string,
        datasetProtocol: string,
        datasetButton: string,
        modal: string,
        sendDefeated: string,
        sendDefeatedDeposit: string,
        sendCompleted: string,
        deleteButton: string,
        classActiveModal: string
    ) {
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
        this.moveToDefeatedDepositEvent =
            this.moveToDefeatedDepositEvent.bind(this);
        this.moveToDefeatedEvent = this.moveToDefeatedEvent.bind(this);
        this.deleteProtocolEvent = this.deleteProtocolEvent.bind(this);
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

    removeEvents() {
        this.modal?.classList.remove(this.classActiveModal);
        this.clickOutside?.removeEventClickOutside();
        this.clickOutside = null;
        this.rowTarget = null;
    }

    async moveToCompletedEvent(event: MouseEvent) {
        event.stopPropagation();

        if (!this.rowTarget || !this.url) return;

        const idProtocol = this.rowTarget.getAttribute("data-id");
        if (!idProtocol) return;

        const messageSuccess = "Protocolo movido para completos com sucesso.";
        const messageError = "Protocolo não encontrado.";

        this.removeEvents();
    }

    async moveToDefeatedDepositEvent(event: MouseEvent) {
        event.stopPropagation();

        if (!this.rowTarget || !this.url) return;

        const idProtocol = this.rowTarget.getAttribute("data-id");
        if (!idProtocol) return;

        const messageSuccess =
            "Protocolo movido para vencidos com depósito prévio com sucesso.";
        const messageError = "Protocolo não encontrado.";

        this.removeEvents();
    }

    async moveToDefeatedEvent(event: MouseEvent) {
        event.stopPropagation();

        if (!this.rowTarget || !this.url) return;

        const idProtocol = this.rowTarget.getAttribute("data-id");
        if (!idProtocol) return;

        const messageSuccess = "Protocolo movido para vencidos com sucesso.";
        const messageError = "Protocolo não encontrado.";

        await changeType(this.rowTarget, this.url, idProtocol, "vencidos", messageSuccess, messageError);

        this.removeEvents();
    }

    async deleteProtocolEvent(event: MouseEvent): Promise<void> {
        event.stopPropagation();

        if (!this.rowTarget || !this.url) return;

        const idProtocol = this.rowTarget.getAttribute("data-id");
        if (!idProtocol) return;

        const messageSuccess = "Protocolo deletado com sucesso.";
        const messageError = "Protocolo não encontrado.";

        await deleteProtocol(
            this.rowTarget,
            this.url,
            idProtocol,
            messageSuccess,
            messageError
        );

        this.removeEvents();
    }

    addEvents(): void {
        if (this.sendCompleted)
            this.sendCompleted.addEventListener(
                "click",
                this.moveToCompletedEvent
            );
        if (this.sendDefeatedDeposit)
            this.sendDefeatedDeposit.addEventListener(
                "click",
                this.moveToDefeatedDepositEvent
            );
        if (this.sendDefeated)
            this.sendDefeated.addEventListener(
                "click",
                this.moveToDefeatedEvent
            );
        if (this.deleteButton)
            this.deleteButton.addEventListener(
                "click",
                this.deleteProtocolEvent
            );
    }

    openModal(event: MouseEvent): void {
        event.stopPropagation();

        this.rowTarget = (event.target as HTMLElement).closest(
            this.datasetProtocol
        );
        const buttonTarget: HTMLElement | null = (
            event.target as HTMLElement
        )?.closest(this.datasetButton);

        if (!buttonTarget) return;

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
