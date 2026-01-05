import addEventsWindow from "../events-window/addEventsWindow.js";
import Search from "../inputs/Search.js";
import ValidateCNPJ from "../inputs/ValidateCNPJ.js";
import ValidateCPF from "../inputs/ValidateCPF.js";
import MenuProtocol from "../modal/MenuProtocol.js";
import NewProtocol from "../new-items/NewProtocol.js";
import TabNav from "../TabNav.js";
import verifyDefeated from "../verifyDefeated.js";

export default function initAfterLoad() {
    const searchProtocol = new Search(
        '[data-search="table"]',
        '[data-search="input"]',
        "row-search",
        "show"
    );
    searchProtocol.init();

    const tabNav = new TabNav(
        "[data-buttonTabNav]",
        "[data-tableNav]",
        "active",
        "show"
    );
    tabNav.init();

    const validateCpf = new ValidateCPF('[data-cpf="verify"]', "invalid");
    validateCpf.init();

    const validateCnpj = new ValidateCNPJ('[data-cnpj="verify"]', "invalid");
    validateCnpj.init();

    const newProtocol = new NewProtocol(
        '[data-protocol="form"]',
        '[data-protocol="protocolo"]',
        '[data-protocol="typeDocument"]',
        '[data-protocol="dateCadastro"]',
        '[data-protocol="dateEnvio"]',
        '[data-protocol="interessado"]',
        '[data-protocol="cpf"]',
        '[data-protocol="dateVencimento"]',
        '[data-protocol="deposit"]',
        '[data-protocol="buttonAdd"]',
        "http://localhost:3000"
    );
    newProtocol.init();

    const menuProtocol = new MenuProtocol(
        "http://localhost:3000",
        '[data-menuProtocol="row"]',
        '[data-menuProtocol="button"]',
        '[data-menuProtocol="modal"]',
        '[data-send="defeated"]',
        '[data-send="depositDefeated"]',
        '[data-send="completed"]',
        '[data-send="delete"]',
        "show"
    );
    addEventsWindow(menuProtocol);

    verifyDefeated("[data-defeated]");
}