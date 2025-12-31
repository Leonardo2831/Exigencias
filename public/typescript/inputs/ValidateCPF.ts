export default class ValidateCPF {
    private inputsCPF: NodeListOf<HTMLInputElement>;
    private classError: string;

    constructor(inputsCPF: string, classError: string) {
        this.inputsCPF = document.querySelectorAll(inputsCPF);
        this.classError = classError;

        this.eventInput = this.eventInput.bind(this);
    }

    clean(cpf: string): string {
        return cpf.replace(/\D/g, "");
    }

    build(cpf: string): string {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
    }

    formatar(cpf: string): string {
        const cpfLimpo = this.clean(cpf);
        return this.build(cpfLimpo);
    }

    validateFirstNumber(cpf: number[]) {
        let sum = 0;

        for (let i = 0; i < 9; i++) {
            sum += cpf[i] * (10 - i);
        }

        const result = (sum * 10) % 11;

        if (result < 10) return cpf[9] == result;

        return cpf[9] == 0;
    }

    validateSecondNumber(cpf: number[]) {
        let sum = 0;

        for (let i = 0; i < 10; i++) {
            sum += cpf[i] * (11 - i);
        }

        const result = (sum * 10) % 11;

        if (result < 10) return cpf[10] == result;

        return cpf[10] == 0;
    }

    verifyExistCPF(cpf: string): boolean {
        const cpfBase = cpf.replace(/[.-]/g, "");

        const cpfNumbers: number[] = cpfBase
            .split("")
            .map((number) => parseInt(number));

        const allEqual: boolean = cpfNumbers.every(
            (number) => number === cpfNumbers[0]
        );
        if (allEqual) return false;

        const validateFirst: boolean = this.validateFirstNumber(cpfNumbers);
        const validateSecond: boolean = this.validateSecondNumber(cpfNumbers);

        return validateFirst && validateSecond;
    }

    validate(cpf: string): boolean | null {
        const cpfFormatted = this.formatar(cpf);
        const matchCpf = cpfFormatted.match(/(?:\d{3}[.-]?){3}\d{2}/g);

        const verifyCpf: boolean | null =
            matchCpf && matchCpf[0] == cpfFormatted && this.verifyExistCPF(cpf);

        return verifyCpf;
    }

    justNumbers(input: HTMLInputElement) {
        if (!input) return;

        const cleaned = this.clean(input.value);
        if (input.value !== cleaned) input.value = cleaned;
    }

    validateChange(cpfElement: HTMLInputElement) {
        cpfElement.classList.remove(this.classError);
        const cpfSize: number = cpfElement.value.length;

        if (cpfSize >= 11 && cpfSize < 14) {
            if (this.validate(cpfElement.value)) {
                cpfElement.value = this.formatar(cpfElement.value);
                cpfElement.classList.remove(this.classError);
            } else {
                cpfElement.classList.add(this.classError);
            }
        }
    }

    eventInput = (event: Event): void => {
        const input = event.currentTarget as HTMLInputElement;
        const cleaned = this.clean(input.value);

        if (!input || cleaned.length > 11) return;

        this.justNumbers(input);
        this.validateChange(input);
    };

    addEvent() {
        this.inputsCPF.forEach((input) => {
            input.addEventListener("input", this.eventInput);
        });
    }

    init(): ValidateCPF {
        if (this.inputsCPF.length) this.addEvent();

        return this;
    }
}