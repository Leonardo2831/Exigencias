var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default function putProtocols(url, data, messageSuccess, messageError) {
    return __awaiter(this, void 0, void 0, function* () {
        const message = document.querySelector("[data-protocol='message']");
        try {
            const response = yield fetch(`${url}/exigencias`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!response.ok)
                throw new Error("Erro ao salvar o protocolo");
            if (!message)
                return true;
            message.textContent = messageSuccess;
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
