export default function inputProtocol(dataInput) {
    const input = document.querySelector(dataInput);
    if (!input)
        return;
    input.maxLength = 6;
    input.addEventListener('input', () => {
        input.value = input.value.replace(/[^0-9]/g, '');
        console.log(input.value);
    });
}
