export interface Contractor {
    id: string | undefined,
    "Наименование": string;
    "Адрес": string;
    "КПП": string;
    "ИНН": string
}

export const NewContractor = (): Contractor => {
    return {
        id: undefined,
        "Наименование": "",
        "ИНН": "",
        "Адрес": "",
        "КПП": ""
    }
};
