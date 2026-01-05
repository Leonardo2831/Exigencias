import type Exigencias from "../Exigencias";

export default async function getProtocols(
    urlGet: string,
    messageSuccess: string,
    messageError: string
): Promise<Exigencias | null> {
    const message = document.querySelector("[data-protocol='message']");

    try {
        const getResponse = await fetch(`${urlGet}/exigencias`);
        if (!getResponse.ok) throw new Error("Erro ao buscar dados atuais");

        const data = await getResponse.json();

        if (!message) return data;
        message.textContent = messageSuccess;
        message.classList.add("show", "success");

        setTimeout(() => {
            message.textContent = "";
            message.classList.remove("show", "success");
        }, 3000);

        return data;
    } catch (error) {
        console.log(error);

        if (!message) return null;
        message.textContent = messageError;
        message.classList.add("show", "error");

        setTimeout(() => {
            message.textContent = "";
            message.classList.remove("show", "error");
        }, 3000);

        return null;
    }
}
