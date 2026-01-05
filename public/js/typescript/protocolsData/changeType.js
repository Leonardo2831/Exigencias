var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default function changeType(rowTarget, url, idProtocol, type, messageSuccess, messageError) {
    return __awaiter(this, void 0, void 0, function* () {
        const message = document.querySelector("[data-delete='alert']");
        if (!message)
            return;
        try {
            switch (type) {
                case "depositDefeated": {
                    break;
                }
                case "defeated": {
                    break;
                }
                case "completed": {
                }
                default: {
                    throw new Error("Tipo de protocolo inválido.");
                    break;
                }
            }
            rowTarget.remove();
            message.textContent = messageSuccess;
            message.classList.add("success");
            setTimeout(() => {
                message.textContent = "";
                message.classList.remove("success");
            }, 3000);
        }
        catch (error) {
            console.error("Erro em deletar o protocolo:", error);
            message.textContent = messageError;
            message.classList.add("error");
            setTimeout(() => {
                message.textContent = "";
                message.classList.remove("error");
            }, 3000);
        }
    });
}
