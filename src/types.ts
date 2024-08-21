export interface ContractorData { "Наименование": string; "Адрес": string; "КПП": string; "ИНН": string }
export type Contractor = { id: string } & ContractorData;
