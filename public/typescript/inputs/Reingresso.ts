import getProtocols from "../protocolsData/getProtocols.js";
import putProtocols from "../protocolsData/putProtocols.js";
import dayjs from "dayjs";
import type Exigencias from "../Exigencias";

export default class Reingresso {
    datasetDefeated: string;
    rowTarget: HTMLElement | null;
    url: string;

    constructor(datasetDefeated: string, url: string) {
        this.datasetDefeated = datasetDefeated;
        this.rowTarget = null;
        this.url = url;

        this.changeItemToInput = this.changeItemToInput.bind(this);
    }

    async fetchDate(date: string) {
        if (!this.rowTarget) return;

        const id = this.rowTarget.getAttribute("data-id");
        if (!id) return;

        const data: Exigencias | null = await getProtocols(
            this.url,
            "Dados atualizados com sucesso",
            "Erro ao atualizar dados"
        );
        if (!data) return;

        // Find the protocol across all lists
        const lists: (keyof Exigencias)[] = [
            "public",
            "doc",
            "depositDefeated",
            "defeated",
        ];
        let found = false;

        for (const list of lists) {
            const index = data[list].findIndex((item) => item.protocol === id);

            if (index !== -1) {
                // Update date
                data[list][index].dateVencimento = date;
                found = true;
                break;
            }
        }

        if (found) {
            await putProtocols(
                this.url,
                data,
                "Data atualizada com sucesso",
                "Erro ao atualizar data"
            );
        }
    }

    async verifyItemReingresso(event: Event) {
        const itemReingresso = (event.target as HTMLElement).closest(
            this.datasetDefeated
        );
        this.rowTarget = (event.target as HTMLElement).closest("tr");

        console.log("houve mudança", this.rowTarget);

        if (!itemReingresso || !itemReingresso.textContent) return;

        const [day, month, year] = itemReingresso.textContent.split("/");

        // Validate date using dayjs
        const dateObj: dayjs.Dayjs = dayjs(`${year}-${month}-${day}`);
        if (!dateObj.isValid()) return;

        const date = `${year}-${month}-${day}`;

        await this.fetchDate(date);
    }

    changeItemToInput(event: MouseEvent) {
        const target = event.target as HTMLElement;
        const itemReingresso = target.closest(this.datasetDefeated);

        if (!itemReingresso) return;

        const oldValue = itemReingresso.textContent?.trim() || "";

        const input = document.createElement("input");
        input.value = oldValue;
        input.classList.add(
            "w-full",
            "h-full",
            "bg-transparent",
            "outline-none",
            "text-center"
        );

        itemReingresso.textContent = "";
        itemReingresso.appendChild(input);
        input.focus();

        input.addEventListener("blur", async () => {
            const newValue = input.value;
            itemReingresso.textContent = newValue;

            if (newValue !== oldValue) {
                this.rowTarget = itemReingresso.closest("tr");
                console.log("houve mudança", this.rowTarget);

                const [day, month, year] = newValue.split("/");
                const dateObj = dayjs(`${year}-${month}-${day}`);

                if (dateObj.isValid()) {
                    const date = `${year}-${month}-${day}`;
                    await this.fetchDate(date);
                }
            }
        });
    }
}