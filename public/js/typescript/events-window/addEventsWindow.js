export default function addEventsWindow(menuProtocol, reingresso) {
    window.addEventListener('click', menuProtocol.openModal);
    window.addEventListener('click', reingresso.changeItemToInput);
}
