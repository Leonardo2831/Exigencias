import dayjs from "dayjs";

export default function verifyDefeated(dataProtocol: string) {
    const protocolsItems: NodeListOf<HTMLElement> = document.querySelectorAll(
        `[${dataProtocol}]`
    );

    if (!protocolsItems.length) return;

    protocolsItems.forEach((protocol: HTMLElement) => {
        const today = dayjs();

        const dateDefeated: string = protocol.getAttribute(dataProtocol) || "";

        if (!dateDefeated) return;

        const dateDefeatedDayjs: dayjs.Dayjs = dayjs(dateDefeated);
        const hasDeposit = protocol.classList.contains("row-deposit");

        if (today.isAfter(dateDefeatedDayjs, "day") && hasDeposit) {
            protocol.classList.replace("row-deposit", "row-defeated");
        } else if (today.isAfter(dateDefeatedDayjs, "day") && !hasDeposit) {
            if(!protocol.classList.contains("row-completed")) protocol.classList.add("row-defeated");
        }
    });
}
