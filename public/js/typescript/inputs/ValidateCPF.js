export default class ValidateCPF {
    constructor(inputsCPF, classError) {
        this.eventInput = (event) => {
            const input = event.currentTarget;
            const cleaned = this.clean(input.value);
            if (!input || cleaned.length > 11)
                return;
            this.justNumbers(input);
            this.validateChange(input);
        };
        this.inputsCPF = document.querySelectorAll(inputsCPF);
        this.classError = classError;
        this.eventInput = this.eventInput.bind(this);
    }
    clean(cpf) {
        return cpf.replace(/\D/g, "");
    }
    build(cpf) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
    }
    formatar(cpf) {
        const cpfLimpo = this.clean(cpf);
        return this.build(cpfLimpo);
    }
    validateFirstNumber(cpf) {
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += cpf[i] * (10 - i);
        }
        const result = (sum * 10) % 11;
        if (result < 10)
            return cpf[9] == result;
        return cpf[9] == 0;
    }
    validateSecondNumber(cpf) {
        let sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += cpf[i] * (11 - i);
        }
        const result = (sum * 10) % 11;
        if (result < 10)
            return cpf[10] == result;
        return cpf[10] == 0;
    }
    verifyExistCPF(cpf) {
        const cpfBase = cpf.replace(/[.-]/g, "");
        const cpfNumbers = cpfBase
            .split("")
            .map((number) => parseInt(number));
        const allEqual = cpfNumbers.every((number) => number === cpfNumbers[0]);
        if (allEqual)
            return false;
        const validateFirst = this.validateFirstNumber(cpfNumbers);
        const validateSecond = this.validateSecondNumber(cpfNumbers);
        return validateFirst && validateSecond;
    }
    validate(cpf) {
        const cpfFormatted = this.formatar(cpf);
        const matchCpf = cpfFormatted.match(/(?:\d{3}[.-]?){3}\d{2}/g);
        const verifyCpf = matchCpf && matchCpf[0] == cpfFormatted && this.verifyExistCPF(cpf);
        return verifyCpf;
    }
    justNumbers(input) {
        if (!input)
            return;
        const cleaned = this.clean(input.value);
        if (input.value !== cleaned)
            input.value = cleaned;
    }
    validateChange(cpfElement) {
        cpfElement.classList.remove(this.classError);
        const cpfSize = cpfElement.value.length;
        if (cpfSize >= 11 && cpfSize < 14) {
            if (this.validate(cpfElement.value)) {
                cpfElement.value = this.formatar(cpfElement.value);
                cpfElement.classList.remove(this.classError);
            }
            else {
                cpfElement.classList.add(this.classError);
            }
        }
    }
    addEvent() {
        this.inputsCPF.forEach((input) => {
            input.addEventListener("input", this.eventInput);
        });
    }
    init() {
        if (this.inputsCPF.length)
            this.addEvent();
        return this;
    }
}
