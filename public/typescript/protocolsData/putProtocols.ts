import type Exigencias from "../Exigencias";

export default async function putProtocols(
    url: string,
    data: Exigencias,
    messageSuccess: string,
    messageError: string
) : Promise<boolean> {
    const message = document.querySelector("[data-protocol='message']");    
    
    try {
        const response = await fetch(`${url}/exigencias`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error("Erro ao salvar o protocolo");

        if (!message) return true;
        message.textContent = messageSuccess;
        message.classList.add("show", "success");

        setTimeout(() => {
            message.textContent = "";
            message.classList.remove("show", "success");
        }, 3000);

        return true;
    } catch (error) {
        console.log(error);

        if (!message) return false;
        message.textContent = messageError;
        message.classList.add("show", "error");

        setTimeout(() => {
            message.textContent = "";
            message.classList.remove("show", "error");
        }, 3000);

        return false;
    }
}
