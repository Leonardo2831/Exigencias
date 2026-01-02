export default async function postProtocol(
    newItem: any,
    urlPost: string,
    typeDocument: string,
    messageSucess: string,
    messageError: string
): Promise<boolean> {
    const message = document.querySelector("[data-protocol='message']");

    try {
        // 1. GET current data
        const getResponse = await fetch(`${urlPost}/exigencias`);
        if (!getResponse.ok) throw new Error("Erro ao buscar dados atuais");

        const currentData = await getResponse.json();
        const type = typeDocument;

        if (!type || !currentData[type]) {
            throw new Error("Tipo de documento inválido ou não encontrado");
        }

        if(newItem.deposito == "R$ 0,00" || newItem.deposito == "R$ 0,00") newItem.deposito = "";
        // 2. Append to correct array
        currentData[type].push(newItem);

        // 3. PUT updated data back
        const response = await fetch(`${urlPost}/exigencias`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(currentData),
        });

        if (!response.ok) throw new Error("Erro ao salvar o protocolo");

        if (!message) return true;
        message.textContent = messageSucess;
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
