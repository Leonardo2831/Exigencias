export default function inputProtocol(dataInput: string) {
    const input : HTMLInputElement | null = document.querySelector(dataInput);

    if(!input) return;

    input.maxLength = 6;

    input.addEventListener('input', () => input.value = input.value.replace(/[^0-9]/g, ''));
}