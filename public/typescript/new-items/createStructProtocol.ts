import Protocol from "../Protocol.js";

function formatDate(date: string){
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
}

export default function createStructProtocol(
    protocol: string,
    dateCadastro: string,
    dateEnvio: string,
    interessado: string,
    cpf: string,
    dateVencimento: string,
    deposito: string,
): HTMLElement {
    const row = document.createElement("tr");

    row.setAttribute("data-id", protocol);
    row.classList.add("table-row", deposito ? "row-deposit" : "");

    row.innerHTML = `
        <td class="table-cell">${protocol}</td>
        <td class="table-cell">${formatDate(dateCadastro)}</td>
        <td class="table-cell">${formatDate(dateEnvio)}</td>
        <td class="table-cell">${interessado}</td>
        <td class="table-cell">${cpf}</td>
        <td class="table-cell date-vencida">${formatDate(dateVencimento)}</td>
        <td class="table-cell ${!deposito ? "text-green-moss" : ""}">${deposito ? deposito : "-"}</td>
        <td class="table-cell">Vigente</td>
        <td data-menuProtocol="button" class="table-cell text-center">
            <div
                class="flex items-center gap-2 cursor-pointer *:size-2 *:rounded-full *:bg-green-moss"
            >
                <div></div>
                <div></div>
                <div></div>
            </div>
        </td>
    `;

    return row;
}
