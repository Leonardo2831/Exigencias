export default class ClickOutside {
    constructor(element, dataValue, eventUser, callbackRemove) {
        this.element = element;
        this.html = document.documentElement;
        this.dataValue = dataValue;
        this.eventUser = eventUser;
        this.callbackRemove = callbackRemove;
        this.handleOutside = this.handleOutside.bind(this);
    }
    handleOutside(event) {
        var _a, _b;
        // Verifica se o elemento não contém o item clicado
        if (!((_a = this.element) === null || _a === void 0 ? void 0 : _a.contains(event.target))) {
            (_b = this.element) === null || _b === void 0 ? void 0 : _b.removeAttribute(this.dataValue);
            this.html.removeEventListener(this.eventUser, this.handleOutside);
            // O callback remove é para remover estilos ou algo do genero usado para o elemento aparecer na tela
            this.callbackRemove();
        }
    }
    removeEventClickOutside() {
        var _a;
        this.html.removeEventListener(this.eventUser, this.handleOutside);
        (_a = this.element) === null || _a === void 0 ? void 0 : _a.removeAttribute(this.dataValue);
    }
    addEventClickOutside() {
        var _a, _b;
        if (!((_a = this.element) === null || _a === void 0 ? void 0 : _a.hasAttribute(this.dataValue))) {
            setTimeout(() => {
                // adicionando evento no documento, mas por causa da fase de booble, coloca dentro do setTimeout
                this.html.addEventListener(this.eventUser, this.handleOutside);
            });
            // define o valor do atributo como vazio
            (_b = this.element) === null || _b === void 0 ? void 0 : _b.setAttribute(this.dataValue, "");
        }
    }
    init() {
        if (this.element) {
            this.addEventClickOutside();
        }
        return this;
    }
}
