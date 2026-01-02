export default class Search {
    constructor(tablesItems, inputSearch, classSelected, classInfo) {
        this.tablesItems = document.querySelectorAll(tablesItems);
        // Tem que colocar o as porque o typescript entende como um HTMLElement
        this.inputSearch = document.querySelector(inputSearch);
        this.classSelected = classSelected;
        this.classInfo = classInfo;
        this.verifyKey = this.verifyKey.bind(this);
        this.removeSelected = this.removeSelected.bind(this);
        this.styledInfo = this.styledInfo.bind(this);
    }
    selectTableItems(row, inputValue) {
        row === null || row === void 0 ? void 0 : row.classList.remove(this.classSelected);
        const cols = row.querySelectorAll("td");
        cols.forEach((col) => {
            if (this.cleanString(col.textContent || "").includes(inputValue)) {
                row.classList.add(this.classSelected);
            }
        });
    }
    filterTableItems(inputValue) {
        this.tablesItems.forEach((table) => {
            const rows = table.querySelectorAll("tr");
            rows.forEach((row) => {
                this.selectTableItems(row, inputValue);
            });
        });
    }
    cleanString(text) {
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }
    cleanText(inputValue) {
        const cleanedValue = this.cleanString(inputValue);
        this.filterTableItems(cleanedValue);
    }
    verifyKey(event) {
        if (event.key === 'Enter') {
            if (this.inputSearch.value === "")
                return;
            this.cleanText(this.inputSearch.value.toLowerCase());
        }
    }
    removeSelected() {
        this.tablesItems.forEach((table) => {
            const rows = table.querySelectorAll("tr");
            rows.forEach((row) => {
                row.classList.remove(this.classSelected);
            });
        });
    }
    styledInfo() {
        var _a, _b, _c, _d;
        if (!this.inputSearch.classList.contains(this.classInfo) && this.inputSearch.value !== "") {
            (_b = (_a = this.inputSearch.parentElement) === null || _a === void 0 ? void 0 : _a.nextElementSibling) === null || _b === void 0 ? void 0 : _b.classList.add(this.classInfo);
        }
        else {
            (_d = (_c = this.inputSearch.parentElement) === null || _c === void 0 ? void 0 : _c.nextElementSibling) === null || _d === void 0 ? void 0 : _d.classList.remove(this.classInfo);
        }
    }
    addEventInput() {
        this.inputSearch.addEventListener('keydown', this.verifyKey);
        this.inputSearch.addEventListener('blur', this.removeSelected);
        this.inputSearch.addEventListener('focus', this.removeSelected);
        this.inputSearch.addEventListener('input', this.styledInfo);
    }
    init() {
        if (this.inputSearch)
            this.addEventInput();
        return this;
    }
}
