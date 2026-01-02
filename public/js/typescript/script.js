import ModalProtocol from "./modal/ModalProtocol.js";
import StyleDeposit from "./inputs/StyleDeposit.js";
const modalProtocol = new ModalProtocol('[data-protocol="buttonNew"]', '[data-protocol="modal"]', '[data-protocol="dateEnvio"]', '[data-protocol="buttonClose"]', "hidden");
modalProtocol.init();
const styleDeposit = new StyleDeposit('[data-protocol="deposit"]');
styleDeposit.init();
