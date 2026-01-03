import ClickOutside from "../ClickOutside.js";
import type Exigencias from "../Exigencias.js";
import type Protocol from "../Protocol.js";

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

    moveToCompleted(event: MouseEvent) {}

    moveToDefeatedDeposit(event: MouseEvent) {}

    moveToDefeated(event: MouseEvent) {}

    async deleteProtocol(event: MouseEvent): Promise<void> {
        event.stopPropagation();

        if (!this.rowTarget) return;

        const idProtocol = this.rowTarget.getAttribute("data-id");
        if (!idProtocol) return;

        const message: HTMLElement | null = document.querySelector(
            "[data-delete='alert']"
        );
        if (!message) return;

        try {
            const getResponse: Response = await fetch(`${this.url}/exigencias`);
            if (!getResponse.ok)
                throw new Error("Erro ao buscar dados do servidor.");

            const data: Exigencias = await getResponse.json();
            const keys = Object.keys(data) as Array<keyof Exigencias>;
            let found = false;

            keys.forEach((key: keyof Exigencias) => {
                const list = data[key];
                const index = list.findIndex(
                    (p: Protocol) => p.protocol === idProtocol
                );

                if (index !== -1) {
                    list.splice(index, 1);
                    found = true;
                }
            });

            if (found) {
                const updateResponse: Response = await fetch(
                    `${this.url}/exigencias`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    }
                );

                if (!updateResponse.ok)
                    throw new Error("Erro ao atualizar dados no servidor.");

                this.rowTarget.remove();

                message.textContent = "Protocolo deletado com sucesso.";
                message.classList.add("success");

                setTimeout(() => {
                    message.textContent = "";
                    message.classList.remove("success");
                }, 3000);
            } else {
                throw new Error("Protocolo não encontrado.");
            }
        } catch (error) {
            message.textContent = "Protocolo não encontrado.";
            message.classList.add("error");

            setTimeout(() => {
                message.textContent = "";
                message.classList.remove("error");
            }, 3000);

            console.error("Erro em deletar o protocolo:", error);
        }

        this.modal?.classList.remove(this.classActiveModal);
        this.clickOutside?.removeEventClickOutside();
        this.clickOutside = null;
        this.rowTarget = null;
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
