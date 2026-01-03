import dayjs from "dayjs";
export default function verifyDefeated(dataProtocol) {
    const protocolsItems = document.querySelectorAll(dataProtocol);
    protocolsItems.forEach((protocol) => {
        const today = dayjs();
        const dateDefeated = protocol.getAttribute(dataProtocol) || "";
        const dateDefeatedDayjs = dayjs(dateDefeated);
        const hasDeposit = protocol.classList.contains("row-deposit");
        console.log(dateDefeatedDayjs.toDate(), today.toDate());
        if (dateDefeatedDayjs.isBefore(today) && hasDeposit) {
            protocol.classList.replace("row-deposit", "row-defeated");
        }
        else if (dateDefeatedDayjs.isBefore(today) && !hasDeposit) {
            protocol.classList.add("row-defeated");
        }
    });
}
