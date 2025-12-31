export default class ValidateCNPJ {
    constructor(inputs, classError) {
        this.inputs = document.querySelectorAll(inputs);
        this.classError = classError;
        this.eventInput = this.eventInput.bind(this);
    }
    clean(cnpj) {
        return cnpj.replace(/\D/g, "");
    }
    build(cnpj) {
        return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5");
    }
    formatar(cnpj) {
        const cnpjLimpo = this.clean(cnpj);
        return this.build(cnpjLimpo);
    }
    validateDigitVerifySecond(cnpj) {
        // Inicializa a soma dos produtos
        let sum = 0;
        // Peso inicial para o segundo dígito. A sequência é 6,5,4,3,2,9,8,7,6,5,4,3,2
        let pos = 6;
        for (let i = 0; i < 13; i++) {
            // Multiplica o dígito pelo peso atual
            sum += cnpj[i] * pos;
            // Decrementa o peso e reinicia para 9 se menor que 2
            pos--;
            if (pos < 2)
                pos = 9;
        }
        // Se o resto da divisão por 11 for < 2, o dígito é 0. Senão, 11 - resto.
        const result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        // Verifica se o cálculo bate com o segundo dígito verificador (índice 13)
        return cnpj[13] === result;
    }
    validateDigitVerifyFirst(cnpj) {
        let sum = 0;
        // Peso inicial para o primeiro dígito. A sequência é 5,4,3,2,9,8,7,6,5,4,3,2
        let pos = 5;
        for (let i = 0; i < 12; i++) {
            // Multiplica o dígito pelo peso atual
            sum += cnpj[i] * pos;
            // Decrementa o peso e reinicia para 9 se menor que 2
            pos--;
            if (pos < 2)
                pos = 9;
        }
        // Se o resto da divisão por 11 for < 2, o dígito é 0. Senão, 11 - resto.
        const result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        // Verifica se o cálculo bate com o primeiro dígito verificador (índice 12)
        return cnpj[12] === result;
    }
    verifyExistCnpj(cnpj) {
        const cnpjNumbers = cnpj
            .split("")
            .map((number) => parseInt(number));
        const allEqual = cnpjNumbers.every((number) => number === cnpjNumbers[0]);
        if (allEqual)
            return false;
        const cnpjFirstVerify = this.validateDigitVerifyFirst(cnpjNumbers);
        const cnpjSecondVerify = this.validateDigitVerifySecond(cnpjNumbers);
        return cnpjFirstVerify && cnpjSecondVerify;
    }
    validate(cnpj) {
        const cnpjFormatted = this.formatar(cnpj);
        const matchCnpj = cnpjFormatted.match(/\d{2}[.-]?\d{3}[.-]?\d{3}[/-]?\d{4}[.-]?\d{2}/g);
        const verifyCnpj = matchCnpj &&
            matchCnpj[0] == cnpjFormatted &&
            this.verifyExistCnpj(cnpj);
        return verifyCnpj;
    }
    validateChange(input) {
        input.classList.remove(this.classError);
        const cnpj = this.clean(input.value);
        if (cnpj.length >= 14) {
            console.log('entrou');
            if (this.validate(cnpj)) {
                input.value = this.formatar(cnpj);
                input.classList.remove(this.classError);
            }
            else {
                input.classList.add(this.classError);
            }
        }
    }
    justNumbers(input) {
        if (!input)
            return;
        const cleaned = this.clean(input.value);
        if (input.value !== cleaned)
            input.value = cleaned;
    }
    eventInput(event) {
        const input = event.currentTarget;
        const cleaned = this.clean(input.value);
        if (!input || cleaned.length <= 11)
            return;
        this.justNumbers(input);
        this.validateChange(input);
    }
    addEvent() {
        this.inputs.forEach((input) => {
            input.addEventListener("input", this.eventInput);
        });
    }
    init() {
        console.log(this.inputs);
        if (this.inputs.length)
            this.addEvent();
        return this;
    }
}
