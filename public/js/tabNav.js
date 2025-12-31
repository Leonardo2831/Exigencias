export default class TabNav {
    constructor(listButtons, listTables, classActive, classTableActive) {
        this.listButtons = document.querySelectorAll(listButtons);
        this.listTables = document.querySelectorAll(listTables);
        this.classActive = classActive;
        this.classTableActive = classTableActive || 'hidden';
        this.setTargetActive = this.setTargetActive.bind(this);
    }
    navigationTab(index) {
        if (!this.listTables.length)
            return;
        if (this.classTableActive === 'hidden') {
            this.listTables.forEach((listTable) => {
                listTable.classList.add(this.classTableActive);
            });
            this.listTables[index].classList.remove(this.classTableActive);
        }
        else {
            this.listTables.forEach((listTable) => {
                listTable.classList.remove(this.classTableActive);
            });
            this.listTables[index].classList.add(this.classTableActive);
        }
    }
    setTargetActive(currentTarget, index) {
        this.listButtons.forEach((listButton) => {
            listButton.classList.remove(this.classActive);
        });
        this.navigationTab(index);
        currentTarget.classList.add(this.classActive);
    }
    addEventTabNav() {
        this.listButtons.forEach((listButton, index) => {
            listButton.addEventListener("click", (event) => {
                this.setTargetActive(event.currentTarget, index);
            });
        });
    }
    firstTab() {
        this.listButtons.forEach((listButton) => {
            listButton.classList.remove(this.classActive);
        });
        return this.listButtons[0];
    }
    init() {
        if (this.listButtons.length) {
            this.firstTab().classList.add(this.classActive);
            this.addEventTabNav();
        }
        return this;
    }
}
