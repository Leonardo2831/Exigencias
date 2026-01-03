import ModalProtocol from "./modal/ModalProtocol.js";
import StyleDeposit from "./inputs/StyleDeposit.js";
import LoadProtocols from "./load/LoadProtocols.js";
import dayjs from "./dayjs.js";

console.log(dayjs().format("DD/MM/YYYY"));

const modalProtocol = new ModalProtocol(
    '[data-protocol="buttonNew"]',
    '[data-protocol="modal"]',
    '[data-protocol="dateEnvio"]',
    '[data-protocol="buttonClose"]',
    "hidden"
);
modalProtocol.init();

const styleDeposit = new StyleDeposit('[data-protocol="deposit"]');
styleDeposit.init();

const loadProtocols = new LoadProtocols(
    "http://localhost:3000",
    '[data-load="icon"]',
    '[data-load="alert"]',
    '[data-load="public"]',
    '[data-load="doc"]',
    '[data-load="title"]',
    '[data-load="depositDefeated"]',
    '[data-load="defeated"]',
    '[data-load="completed"]'
);
loadProtocols.init();