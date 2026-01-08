var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import getProtocols from "../protocolsData/getProtocols.js";
import putProtocols from "../protocolsData/putProtocols.js";
import dayjs from "dayjs";
import verifyDefeated from "../verifyDefeated.js";
export default class Reingresso {
    constructor(datasetDefeated, url) {
        this.datasetDefeated = datasetDefeated;
        this.rowTarget = null;
        this.url = url;
        this.changeItemToInput = this.changeItemToInput.bind(this);
    }
    fetchDate(date) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.rowTarget)
                return;
            const id = this.rowTarget.getAttribute("data-id");
            if (!id)
                return;
            const data = yield getProtocols(this.url, "Dados atualizados com sucesso", "Erro ao atualizar dados");
            if (!data)
                return;
            // Find the protocol across all lists
            const lists = [
                "public",
                "doc",
                "depositDefeated",
                "defeated",
            ];
            let found = false;
            for (const list of lists) {
                const index = data[list].findIndex((item) => item.protocol === id);
                if (index !== -1) {
                    // Update date
                    data[list][index].dateVencimento = date;
                    found = true;
                    verifyDefeated('data-defeated');
                    break;
                }
            }
            if (found) {
                yield putProtocols(this.url, data, "Data atualizada com sucesso", "Erro ao atualizar data");
            }
        });
    }
    verifyItemReingresso(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const itemReingresso = event.target.closest(this.datasetDefeated);
            this.rowTarget = event.target.closest("tr");
            if (!itemReingresso || !itemReingresso.textContent)
                return;
            const [day, month, year] = itemReingresso.textContent.split("/");
            // Validate date using dayjs
            const dateObj = dayjs(`${year}-${month}-${day}`);
            if (!dateObj.isValid())
                return;
            const date = `${year}-${month}-${day}`;
            yield this.fetchDate(date);
        });
    }
    changeItemToInput(event) {
        var _a;
        const target = event.target;
        const itemReingresso = target.closest(this.datasetDefeated);
        if (!itemReingresso)
            return;
        const oldValue = ((_a = itemReingresso.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "";
        const input = document.createElement("input");
        input.value = oldValue;
        input.classList.add("w-full", "h-full", "bg-transparent", "outline-none", "text-center");
        itemReingresso.textContent = "";
        itemReingresso.appendChild(input);
        input.focus();
        input.addEventListener("blur", () => __awaiter(this, void 0, void 0, function* () {
            const newValue = input.value;
            itemReingresso.textContent = newValue;
            const [day, month, year] = newValue.split("/");
            const dateObj = dayjs(`${year}-${month}-${day}`);
            if (!dateObj.isValid()) {
                itemReingresso.classList.add("invalid");
                return;
            }
            itemReingresso.classList.remove("invalid");
            if (newValue !== oldValue) {
                this.rowTarget = itemReingresso.closest("tr");
                const date = `${year}-${month}-${day}`;
                yield this.fetchDate(date);
            }
        }));
    }
}
