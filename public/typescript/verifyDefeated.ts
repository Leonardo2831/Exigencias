import dayjs from "dayjs";

export default function verifyDefeated(dataProtocol: string) {
    const protocolsItems: NodeListOf<HTMLElement> =
        document.querySelectorAll(dataProtocol);

    protocolsItems.forEach((protocol: HTMLElement) => {
        const today = dayjs();

        const dateDefeated: string = protocol.getAttribute(dataProtocol) || "";
        const dateDefeatedDayjs: dayjs.Dayjs = dayjs(dateDefeated);

        const hasDeposit = protocol.classList.contains("row-deposit");


        console.log(dateDefeatedDayjs.toDate(), today.toDate());
        
        if (dateDefeatedDayjs.isBefore(today) && hasDeposit) {
            protocol.classList.replace("row-deposit", "row-defeated");
        } else if (dateDefeatedDayjs.isBefore(today) && !hasDeposit) {
            protocol.classList.add("row-defeated");
        }
    });
}
