import addEventsWindow from "../events-window/addEventsWindow";
import Search from "../inputs/Search";
import ValidateCNPJ from "../inputs/ValidateCNPJ";
import ValidateCPF from "../inputs/ValidateCPF";
import MenuProtocol from "../modal/MenuProtocol";
import NewProtocol from "../new-items/NewProtocol";
import TabNav from "../TabNav";
export default function initAfterLoad() {
    const searchProtocol = new Search('[data-search="table"]', '[data-search="input"]', "row-search", "show");
    searchProtocol.init();
    const tabNav = new TabNav("[data-buttonTabNav]", "[data-tableNav]", "active", "show");
    tabNav.init();
    const validateCpf = new ValidateCPF('[data-cpf="verify"]', "invalid");
    validateCpf.init();
    const validateCnpj = new ValidateCNPJ('[data-cnpj="verify"]', "invalid");
    validateCnpj.init();
    const newProtocol = new NewProtocol('[data-protocol="form"]', '[data-protocol="protocolo"]', '[data-protocol="typeDocument"]', '[data-protocol="dateCadastro"]', '[data-protocol="dateEnvio"]', '[data-protocol="interessado"]', '[data-protocol="cpf"]', '[data-protocol="dateVencimento"]', '[data-protocol="deposit"]', '[data-protocol="buttonAdd"]', "http://localhost:3000");
    newProtocol.init();
    const menuProtocol = new MenuProtocol('[data-menuProtocol="button"]', '[data-menuProtocol="modal"]', '[data-send="vencidos"]', '[data-send="depositos"]', '[data-send="concluidos"]', '[data-send="delete"]', "show");
    addEventsWindow(menuProtocol);
}
