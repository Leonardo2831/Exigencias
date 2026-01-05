var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import getProtocols from "./getProtocols.js";
import putProtocols from "./putProtocols.js";
export default function deleteProtocol(rowTarget, url, idProtocol, messageSuccess, messageError) {
    return __awaiter(this, void 0, void 0, function* () {
        const message = document.querySelector("[data-delete='alert']");
        if (!message)
            return;
        try {
            const data = yield getProtocols(url, messageSuccess, messageError);
            if (!data)
                throw new Error("Erro ao buscar dados do servidor.");
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
            if (!found)
                throw new Error(messageError);
            putProtocols(url, data, messageSuccess, messageError);
            rowTarget.remove();
            message.textContent = messageSuccess;
            message.classList.add("success");
            setTimeout(() => {
                message.textContent = "";
                message.classList.remove("success");
            }, 3000);
        }
        catch (error) {
            message.textContent = messageError;
            message.classList.add("error");
            setTimeout(() => {
                message.textContent = "";
                message.classList.remove("error");
            }, 3000);
            console.error("Erro em deletar o protocolo:", error);
        }
    });
}
