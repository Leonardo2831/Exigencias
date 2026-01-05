var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default function deleteProtocol(rowTarget, url) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!rowTarget)
            return;
        const idProtocol = rowTarget.getAttribute("data-id");
        if (!idProtocol)
            return;
        const message = document.querySelector("[data-delete='alert']");
        if (!message)
            return;
        try {
            const getResponse = yield fetch(`${url}/exigencias`);
            if (!getResponse.ok)
                throw new Error("Erro ao buscar dados do servidor.");
            const data = yield getResponse.json();
            const keys = Object.keys(data);
            let found = false;
            keys.forEach((key) => {
                const list = data[key];
                const index = list.findIndex((p) => p.protocol === idProtocol);
                if (index !== -1) {
                    list.splice(index, 1);
                    found = true;
                }
            });
            if (found) {
                const updateResponse = yield fetch(`${url}/exigencias`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
                if (!updateResponse.ok)
                    throw new Error("Erro ao atualizar dados no servidor.");
                rowTarget.remove();
                message.textContent = "Protocolo deletado com sucesso.";
                message.classList.add("success");
                setTimeout(() => {
                    message.textContent = "";
                    message.classList.remove("success");
                }, 3000);
            }
            else {
                throw new Error("Protocolo não encontrado.");
            }
        }
        catch (error) {
            message.textContent = "Protocolo não encontrado.";
            message.classList.add("error");
            setTimeout(() => {
                message.textContent = "";
                message.classList.remove("error");
            }, 3000);
            console.error("Erro em deletar o protocolo:", error);
        }
    });
}
