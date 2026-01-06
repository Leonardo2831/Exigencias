export default class Search {
    private tablesItems: NodeListOf<HTMLTableElement>;
    private inputSearch: HTMLInputElement;
    private classSelected: string;
    private classInfo: string;

    constructor(
        tablesItems: string,
        inputSearch: string,
        classSelected: string,
        classInfo: string
    ) {
        this.tablesItems = document.querySelectorAll(tablesItems);
        // Tem que colocar o as porque o typescript entende como um HTMLElement
        this.inputSearch = document.querySelector(
            inputSearch
        ) as HTMLInputElement;
        this.classSelected = classSelected;
        this.classInfo = classInfo;

        this.verifyKey = this.verifyKey.bind(this);
        this.removeSelected = this.removeSelected.bind(this);
        this.styledInfo = this.styledInfo.bind(this);
    }

    selectTableItems(row: HTMLElement, inputValue: string) {
        row?.classList.remove(this.classSelected);

        const cols = row.querySelectorAll("td");

        cols.forEach((col) => {
            if (this.cleanString(col.textContent || "").includes(inputValue)) {
                row.classList.add(this.classSelected);
            }
        });
    }

    filterTableItems(inputValue: string) {
        this.tablesItems.forEach((table) => {
            const rows = table.querySelectorAll("tr");
            rows.forEach((row) => {
                this.selectTableItems(row, inputValue);
            });
        });
    }

    cleanString(text: string): string {
        return text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[.-]/g, "")
            .toLowerCase();
    }

    cleanText(inputValue: string) {
        const cleanedValue = this.cleanString(inputValue);
        this.filterTableItems(cleanedValue);
    }

    verifyKey(event: KeyboardEvent) {
        if (event.key === "Enter") {
            if (this.inputSearch.value === "") return;

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
        if (
            !this.inputSearch.classList.contains(this.classInfo) &&
            this.inputSearch.value !== ""
        ) {
            this.inputSearch.parentElement?.nextElementSibling?.classList.add(
                this.classInfo
            );
        } else {
            this.inputSearch.parentElement?.nextElementSibling?.classList.remove(
                this.classInfo
            );
        }
    }

    addEventInput() {
        this.inputSearch.addEventListener("keydown", this.verifyKey);
        this.inputSearch.addEventListener("blur", this.removeSelected);
        this.inputSearch.addEventListener("focus", this.removeSelected);
        this.inputSearch.addEventListener("input", this.styledInfo);
    }

    init(): Search {
        if (this.inputSearch) this.addEventInput();

        return this;
    }
}