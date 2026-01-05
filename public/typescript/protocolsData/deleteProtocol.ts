import type Exigencias from "../Exigencias.js";
import type Protocol from "../Protocol.js";
import getProtocols from "./getProtocols.js";
import putProtocols from "./putProtocols.js";

export default async function deleteProtocol(
    rowTarget: HTMLElement,
    url: string,
    idProtocol: string,
    messageSuccess: string,
    messageError: string
) {
    const message: HTMLElement | null = document.querySelector(
        "[data-delete='alert']"
    );
    if (!message) return;

    try {
        const data: Exigencias | null = await getProtocols(
            url,
            messageSuccess,
            messageError
        );
        if (!data) throw new Error("Erro ao buscar dados do servidor.");

        const keys = Object.keys(data) as Array<keyof Exigencias>;
        let found = false;

        keys.forEach((key: keyof Exigencias) => {
            const list = data[key];
            const index = list.findIndex(
                (p: Protocol) => p.protocol === idProtocol
            );

            if (index !== -1) {
                list.splice(index, 1);
                found = true;
            }
        });

        if (!found) throw new Error(messageError);

        putProtocols(url, data, messageSuccess, messageError);

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
