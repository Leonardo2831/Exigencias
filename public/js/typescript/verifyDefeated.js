import dayjs from "dayjs";
export default function verifyDefeated(dataProtocol) {
    const protocolsItems = document.querySelectorAll(`[${dataProtocol}]`);
    if (!protocolsItems.length)
        return;
    protocolsItems.forEach((protocol) => {
        const today = dayjs();
        const dateDefeated = protocol.getAttribute(dataProtocol) || "";
        if (!dateDefeated)
            return;
        const dateDefeatedDayjs = dayjs(dateDefeated);
        const hasDeposit = protocol.classList.contains("row-deposit");
        if (today.isAfter(dateDefeatedDayjs, "day") && hasDeposit) {
            protocol.classList.replace("row-deposit", "row-defeated");
        }
        else if (today.isAfter(dateDefeatedDayjs, "day") && !hasDeposit) {
            if (!protocol.classList.contains("row-completed"))
                protocol.classList.add("row-defeated");
        }
    });
}
