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
export default function changeType(rowTarget, url, idProtocol, type, messageSuccess, messageError) {
    return __awaiter(this, void 0, void 0, function* () {
        const message = document.querySelector("[data-delete='alert']");
        if (!message)
            return;
        try {
            const data = yield getProtocols(url, messageSuccess, messageError);
            if (!data)
                return;
            let sourceList = null;
            for (const key of Object.keys(data)) {
                const list = data[key];
                if (Array.isArray(list)) {
                    if (list.find((protocolItem) => protocolItem.protocol === idProtocol)) {
                        sourceList = list;
                        break;
                    }
                }
            }
            if (!sourceList)
                return;
            const protocolIndex = sourceList.findIndex((protocolItem) => protocolItem.protocol === idProtocol);
            if (protocolIndex === -1)
                return;
            const protocolItem = sourceList[protocolIndex];
            let newStatus = "";
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
            if (Array.isArray(data[type])) {
                data[type].push(objectItemProtocol);
            }
            const success = yield putProtocols(url, data, messageSuccess, messageError);
            if (!success)
                return;
            rowTarget.remove();
            message.textContent = messageSuccess;
            message.classList.add("success");
            setTimeout(() => {
                message.textContent = "";
                message.classList.remove("success");
            }, 3000);
        }
        catch (error) {
            console.error("Erro em mudar o tipo do protocolo:", error);
            message.textContent = messageError;
            message.classList.add("error");
            setTimeout(() => {
                message.textContent = "";
                message.classList.remove("error");
            }, 3000);
        }
    });
}
