import type Protocol from "./Protocol";

export default interface Exigencias {
    public: Array<Protocol>,
    doc: Array<Protocol>,
    title: Array<Protocol>,
    depositDefeated: Array<Protocol>,
    defeated: Array<Protocol>,
    completed: Array<Protocol>
}