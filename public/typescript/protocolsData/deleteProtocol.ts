import type Exigencias from "../Exigencias";
import type Protocol from "../Protocol";

export default async function deleteProtocol(rowTarget: HTMLElement, url: string) {
    if (!rowTarget) return;

    const idProtocol = rowTarget.getAttribute("data-id");
    if (!idProtocol) return;

    const message: HTMLElement | null = document.querySelector(
        "[data-delete='alert']"
    );
    if (!message) return;

    try {
        const getResponse: Response = await fetch(`${url}/exigencias`);
        if (!getResponse.ok)
            throw new Error("Erro ao buscar dados do servidor.");

        const data: Exigencias = await getResponse.json();
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

        if (found) {
            const updateResponse: Response = await fetch(
                `${url}/exigencias`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            if (!updateResponse.ok)
                throw new Error("Erro ao atualizar dados no servidor.");

            rowTarget.remove();

            message.textContent = "Protocolo deletado com sucesso.";
            message.classList.add("success");

            setTimeout(() => {
                message.textContent = "";
                message.classList.remove("success");
            }, 3000);
        } else {
            throw new Error("Protocolo não encontrado.");
        }
    } catch (error) {
        message.textContent = "Protocolo não encontrado.";
        message.classList.add("error");

        setTimeout(() => {
            message.textContent = "";
            message.classList.remove("error");
        }, 3000);

        console.error("Erro em deletar o protocolo:", error);
    }
}
