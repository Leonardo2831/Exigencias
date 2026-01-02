export default class StyleDeposit {
    private input: HTMLInputElement | null;

    constructor(input: string) {
        this.input = document.querySelector(input);
        this.styleValue = this.styleValue.bind(this);
    }

    formatValue(value: string | undefined): string {
        if(value?.length == 6) return "";

        const valueFormat = value?.replace(/\D/g, "") || "";
        const resultFormat = (Number(valueFormat) / 100).toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL",
            }
        );

        return resultFormat;
    }

    styleValue(): void {
        if (!this.input) return;

        // Check raw digits first
        const rawValue = this.input.value.replace(/\D/g, "");

        if (rawValue === "") {
            this.input.value = "";
            return;
        }

        this.input.value = this.formatValue(this.input.value);
    }

    addEvent() {
        this.input?.addEventListener("input", this.styleValue);
    }

    init() {
        if (this.input) this.addEvent();

        return this;
    }
}
