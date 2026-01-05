export default async function changeType(
    rowTarget: HTMLElement,
    url: string,
    idProtocol: string,
    type: string,
    messageSuccess: string,
    messageError: string
) {
    const message: HTMLElement | null = document.querySelector(
        "[data-delete='alert']"
    );
    if (!message) return;

    try {
        switch (type) { 
            case "depositDefeated": {

                break;
            }
            case "defeated": {

                break;
            }
            case "completed": {

            }
            default:{
                throw new Error("Tipo de protocolo inválido.");
                break; 
            }
        }

        rowTarget.remove();

        message.textContent = messageSuccess;
        message.classList.add("success");

        setTimeout(() => {
            message.textContent = "";
            message.classList.remove("success");
        }, 3000);
    } catch (error) {
        console.error("Erro em deletar o protocolo:", error);

        message.textContent = messageError;
        message.classList.add("error");

        setTimeout(() => {
            message.textContent = "";
            message.classList.remove("error");
        }, 3000);
    }
}
