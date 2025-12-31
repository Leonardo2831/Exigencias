export default class ValidateCPF {
    constructor(inputsCPF, classError) {
        this.eventBlur = (event) => {
            const input = event.currentTarget;
            if (input.textContent && input.textContent.length >= 11) {
                input.textContent = this.formatar(input.textContent);
            }
        };
        this.eventInput = (event) => {
            const input = event.currentTarget;
            input.classList.remove(this.classError);
            this.justNumbers(input);
            this.validateChange(input);
        };
        this.eventClick = (event) => {
            const input = event.currentTarget;
            input.textContent = this.clean(input.textContent || "");
        };
        this.inputsCPF = document.querySelectorAll(inputsCPF);
        this.classError = classError;
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
        if (input instanceof HTMLInputElement) {
            const cleaned = this.clean(input.value);
            if (input.value !== cleaned)
                input.value = cleaned;
        }
        if (input instanceof HTMLParagraphElement) {
            const content = input.textContent || "";
            const cleaned = this.clean(content);
            if (content !== cleaned)
                input.textContent = cleaned;
        }
    }
    validateChange(cpfElement) {
        let cpfSize = 0;
        if (cpfElement instanceof HTMLInputElement)
            cpfSize = cpfElement.value.length;
        else if (cpfElement instanceof HTMLParagraphElement)
            cpfSize = cpfElement.textContent.length;
        if (cpfSize >= 11) {
            if (cpfElement instanceof HTMLInputElement) {
                if (this.validate(cpfElement.value)) {
                    cpfElement.value = this.formatar(cpfElement.value);
                    cpfElement.classList.remove(this.classError);
                }
                else {
                    cpfElement.classList.add(this.classError);
                }
            }
            else if (cpfElement instanceof HTMLParagraphElement) {
                if (this.validate(cpfElement.textContent)) {
                    cpfElement.classList.remove(this.classError);
                }
                else {
                    cpfElement.classList.add(this.classError);
                }
            }
        }
    }
    addEvent() {
        this.inputsCPF.forEach((input) => {
            if (input instanceof HTMLInputElement) {
                input.oninput = this.eventInput;
            }
            else if (input instanceof HTMLParagraphElement) {
                input.onclick = this.eventClick;
                input.onblur = this.eventBlur;
            }
        });
    }
    init() {
        if (this.inputsCPF.length)
            this.addEvent();
        return this;
    }
}
