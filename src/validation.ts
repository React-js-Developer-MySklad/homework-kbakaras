export const ContractorValidate = {

    Name: (value: string): { message: string } | undefined => {
        return value === "" ? {message: "Заполните наименование контрагента"} : undefined;
    },

    Inn: (value: string): { message: string } | undefined => {

        if (!value) return {message: "Заполните ИНН контрагента"};

        if (!/^\d+$/.test(value)) {
            return {message: "ИНН должен содержать только цифры"};
        }

        if (value.length !== 10 && value.length !== 12) {
            return {message: "ИНН должен содержать 10 или 12 цифр"};
        }

        return undefined;
    },

    Kpp: (value: string): { message: string } | undefined => {

        if (!value) return {message: "Заполните КПП контрагента"};

        if (!/^\d+$/.test(value)) {
            return {message: "КПП должен содержать только цифры"};
        }

        if (value.length !== 9) {
            return {message: "КПП должен содержать 9 цифр"};
        }

        return undefined;
    }

}
