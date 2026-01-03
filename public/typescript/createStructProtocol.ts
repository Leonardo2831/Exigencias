function formatDate(date: string) {
    const [year, month, day] = date.split("-");
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
    state: string
): HTMLElement {
    const row = document.createElement("tr");

    row.setAttribute("data-id", protocol);
    row.setAttribute("data-menuProtocol", "row");
    row.classList.add("table-row");

    const hasDeposit = deposito && deposito !== "R$ 0,00";
    if (hasDeposit) row.classList.add("row-deposit");

    row.innerHTML = `
        <td class="table-cell">${protocol}</td>
        <td class="table-cell">${formatDate(dateCadastro)}</td>
        <td class="table-cell">${formatDate(dateEnvio)}</td>
        <td class="table-cell">${interessado}</td>
        <td class="table-cell">${cpf}</td>
        <td class="table-cell">${formatDate(dateVencimento)}</td>
        <td class="table-cell ${!hasDeposit ? "text-green-moss" : ""}">${
        hasDeposit ? deposito : "-"
    }</td>
        <td class="table-cell">${state}</td>
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
