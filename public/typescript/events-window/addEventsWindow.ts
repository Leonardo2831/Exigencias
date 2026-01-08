import Reingresso from "../inputs/Reingresso.js";
import MenuProtocol from "../modal/MenuProtocol.js";

export default function addEventsWindow(menuProtocol: MenuProtocol, reingresso: Reingresso
){
    window.addEventListener('click', menuProtocol.openModal);  
    window.addEventListener('click', reingresso.changeItemToInput);
}