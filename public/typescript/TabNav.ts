export default class TabNav {
    private listButtons : NodeListOf<HTMLElement>;
    private listTables : NodeListOf<HTMLElement>;
    private classActive : string;
    private classTableActive : string;

    constructor(listButtons : string, listTables : string, classActive : string, classTableActive?: string){
        this.listButtons = document.querySelectorAll(listButtons);
        this.listTables = document.querySelectorAll(listTables);
        this.classActive = classActive;
        this.classTableActive = classTableActive || 'hidden';

        this.setTargetActive = this.setTargetActive.bind(this);
    }

    navigationTab(index : number) : void{  
        if(!this.listTables.length) return;
        
        if(this.classTableActive === 'hidden'){
            this.listTables.forEach((listTable) => {
                listTable.classList.add(this.classTableActive);
            });

            this.listTables[index].classList.remove(this.classTableActive);   
        } else {
            this.listTables.forEach((listTable) => {
                listTable.classList.remove(this.classTableActive);
            });

            this.listTables[index].classList.add(this.classTableActive);   
        }  
    }

    setTargetActive(currentTarget : HTMLElement, index : number){
        this.listButtons.forEach((listButton) => {
            listButton.classList.remove(this.classActive);
        });

        this.navigationTab(index);
        currentTarget.classList.add(this.classActive);
    }

    addEventTabNav(){
        this.listButtons.forEach((listButton : Element, index : number) => {
            listButton.addEventListener("click", (event : Event) => {
                this.setTargetActive(event.currentTarget as HTMLElement, index);
            });
        });
    }

    firstTab() : HTMLElement {
        this.listButtons.forEach((listButton) => {
            listButton.classList.remove(this.classActive);
        });
        return this.listButtons[0];
    }

    init() : TabNav {
        if(this.listButtons.length) {
            this.firstTab().classList.add(this.classActive);
            this.addEventTabNav();
        }

        return this;
    }
}