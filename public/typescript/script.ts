import Search from "./inputs/Search.js";
import TabNav from "./TabNav.js";
import ModalProtocol from "./modal/ModalProtocol.js";
import NewProtocol from "./modal/NewProtocol.js";
import ValidateCPF from "./inputs/ValidateCPF.js";
import StyleDeposit from "./inputs/StyleDeposit.js";
import ValidateCNPJ from "./inputs/ValidateCNPJ.js";

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

const modalProtocol = new ModalProtocol(
    '[data-protocol="buttonNew"]',
    '[data-protocol="modal"]',
    '[data-protocol="dateEnvio"]',
    '[data-protocol="buttonClose"]',
    "hidden"
);
modalProtocol.init();

const styleDeposit = new StyleDeposit(
    '[data-protocol="deposit"]'
);
styleDeposit.init();

const validateCpf = new ValidateCPF(
    '[data-cpf="verify"]',
    "invalid"
);
validateCpf.init();

const validateCnpj = new ValidateCNPJ(
    '[data-cnpj="verify"]',
    "invalid"
);
validateCnpj.init();

const newProtocol = new NewProtocol(
    '[data-protocol="protocolo"]',
    '[data-protocol="typeDocument"]',
    '[data-protocol="dataCadastro"]',
    '[data-protocol="dataEnvio"]',
    '[data-protocol="interessado"]',
    '[data-protocol="cpf"]',
    '[data-protocol="dateVencimento"]',
    '[data-protocol="deposito"]',
    '[data-protocol="buttonAdd"]'
);
newProtocol.init();