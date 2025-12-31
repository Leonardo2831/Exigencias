import type MenuProtocol from "../modal/MenuProtocol";

export default function addEventsWindow(menuProtocol: MenuProtocol){
    window.addEventListener('click', menuProtocol.openModal);  
}
