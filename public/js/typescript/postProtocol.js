var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default function postProtocol(newItem, urlPost, typeDocument, messageSucess, messageError) {
    return __awaiter(this, void 0, void 0, function* () {
        const message = document.querySelector("[data-protocol='message']");
        try {
            // 1. GET current data
            const getResponse = yield fetch(`${urlPost}/exigencias`);
            if (!getResponse.ok)
                throw new Error("Erro ao buscar dados atuais");
            const currentData = yield getResponse.json();
            const type = typeDocument;
            if (!type || !currentData[type]) {
                throw new Error("Tipo de documento inválido ou não encontrado");
            }
            if (newItem.deposito == "R$ 0,00" || newItem.deposito == "R$ 0,00")
                newItem.deposito = "";
            // 2. Append to correct array
            currentData[type].push(newItem);
            // 3. PUT updated data back
            const response = yield fetch(`${urlPost}/exigencias`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(currentData),
            });
            if (!response.ok)
                throw new Error("Erro ao salvar o protocolo");
            if (!message)
                return true;
            message.textContent = messageSucess;
            message.classList.add("show", "success");
            setTimeout(() => {
                message.textContent = "";
                message.classList.remove("show", "success");
            }, 3000);
            return true;
        }
        catch (error) {
            console.log(error);
            if (!message)
                return false;
            message.textContent = messageError;
            message.classList.add("show", "error");
            setTimeout(() => {
                message.textContent = "";
                message.classList.remove("show", "error");
            }, 3000);
            return false;
        }
    });
}
