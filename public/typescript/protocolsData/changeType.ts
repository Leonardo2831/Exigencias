import type Exigencias from "../Exigencias.js";
import type Protocol from "../Protocol.js";
import getProtocols from "./getProtocols.js";
import putProtocols from "./putProtocols.js";

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
        const data: Exigencias | null = await getProtocols(url, messageSuccess, messageError);

        if (!data) return;

        let sourceList: Protocol[] | null | undefined = null;

        for (const key of Object.keys(data)) {
            const list = data[key as keyof Exigencias];

            if (Array.isArray(list)) {
                if (list.find((protocolItem: Protocol) => protocolItem.protocol === idProtocol)) {
                    sourceList = list;
                    break;
                }
            }
        }

        if (!sourceList) return;

        const protocolIndex: number = sourceList.findIndex(
            (protocolItem: Protocol) => protocolItem.protocol === idProtocol
        );

        if (protocolIndex === -1) return;

        const protocolItem = sourceList[protocolIndex];

        let newStatus: string = "";
        switch (type) {
            case "completed": {
                newStatus = "Concluído";
                break;
            }
            case "defeated": {
                newStatus = "Vencido";
                break;
            }
            case "depositDefeated": {
                newStatus = "Depósito Vencido";
                break;
            }
            default: {
                newStatus = "Cancelado";
                break;
            }
        }

        const objectItemProtocol = {
            protocol: protocolItem.protocol,
            dateCadastro: protocolItem.dateCadastro,
            dateEnvio: protocolItem.dateEnvio,
            interessado: protocolItem.interessado,
            cpf: protocolItem.cpf,
            dateVencimento: protocolItem.dateVencimento,
            deposito: protocolItem.deposito,
            status: newStatus,
        };

        sourceList.splice(protocolIndex, 1);

        if (Array.isArray(data[type as keyof Exigencias])) {
            (data[type as keyof Exigencias] as Protocol[]).push(
                objectItemProtocol
            );
        }

        const success = await putProtocols(
            url,
            data,
            messageSuccess,
            messageError
        );

        if(!success) return;

        rowTarget.remove();
        message.textContent = messageSuccess;
        message.classList.add("success");

        setTimeout(() => {
            message.textContent = "";
            message.classList.remove("success");
        }, 3000);
    } catch (error) {
        console.error("Erro em mudar o tipo do protocolo:", error);

        message.textContent = messageError;
        message.classList.add("error");

        setTimeout(() => {
            message.textContent = "";
            message.classList.remove("error");
        }, 3000);
    }
}
