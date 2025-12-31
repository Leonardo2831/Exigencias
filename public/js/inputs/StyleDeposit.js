export default class StyleDeposit {
    constructor(input) {
        this.input = document.querySelector(input);
        this.styleValue = this.styleValue.bind(this);
    }
    formatValue(value) {
        const valueFormat = (value === null || value === void 0 ? void 0 : value.replace(/\D/g, "")) || "";
        const resultFormat = (Number(valueFormat) / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
        return resultFormat;
    }
    styleValue() {
        if (!this.input)
            return;
        // Check raw digits first
        const rawValue = this.input.value.replace(/\D/g, "");
        if (rawValue === "") {
            this.input.value = "";
            return;
        }
        this.input.value = this.formatValue(this.input.value);
    }
    addEvent() {
        var _a;
        (_a = this.input) === null || _a === void 0 ? void 0 : _a.addEventListener("input", this.styleValue);
    }
    init() {
        if (this.input)
            this.addEvent();
        return this;
    }
}
