import React, {useCallback, useState} from "react";
import {StrictMode} from "react";
import {ContractorTable} from "../contractorTable/contractorTable"
import {ContractorDialog, ContractorDataCommit} from "../contractorDialog/contractorDialog"
import {ContractorData, Contractor} from "../../types";
import {v4} from "uuid";

const newContractor: ContractorData = {
    "Наименование": "",
    "ИНН": "",
    "Адрес": "",
    "КПП": ""
};

interface DialogState {
    data: ContractorData
    visible: boolean
    commit: ContractorDataCommit
}

const dialogClosed: DialogState = {
    data: {...newContractor},
    visible: false,
    commit: undefined
}

export const App: React.FC = () => {

    const [contractors, setContractors] = useState<Contractor[]>([
        {
            id: 'bf753d4e-d073-4848-8ac0-87fc9a490a7a',
            "Наименование": "ООО Рога и Копыта",
            "ИНН": "7723931036",
            "Адрес": "contact@rogiikopyta.ru",
            "КПП": "772301001"
        },
        {
            id: '9b2d3c57-f0d1-4b9d-b641-9194889f616d',
            "Наименование": "ООО Рога и Копыта 2",
            "ИНН": "7723931037",
            "Адрес": "contact@rogiikopyta2.ru",
            "КПП": "772301001"
        },
    ]);

    const [dialogState, setDialogState] = useState<DialogState>(dialogClosed);


    const closeDialog = useCallback(() => setDialogState(dialogClosed), []);

    const deleteContractor = useCallback((id: string) => {
        const index = contractors.findIndex(contractor => contractor.id === id);
        if (index !== -1) {
            setContractors(contractors.toSpliced(index, 1));
        }
    }, [contractors]);

    const editContractor = useCallback((id: string) => {
        let contractor = contractors.find(value => value.id === id);
        setDialogState({
            data: {...contractor},
            visible: true,
            commit: (contractor: ContractorData) => {
                setContractors(contractors.map(element => element["id"] === id
                    ? {"id": id, ...contractor}
                    : element));
                closeDialog();
            }
        });
    }, [contractors]);

    const addContractor = useCallback(() => {
        setDialogState({
            data: {...newContractor},
            visible: true,
            commit: (contractor: ContractorData) => {
                setContractors([...contractors, {id: v4(), ...contractor}]);
                closeDialog();
            }
        });
    }, [contractors]);

    return (
        <StrictMode>

            <header className="grid py-[12px] grid-cols-[1fr_auto]">
                <img src="/images/logo.svg" alt="МойСклад"/>

                <button id="contractor-add"
                        type="button"
                        onClick={addContractor}
                        className="h-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                                   focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center
                                   inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700
                                   dark:focus:ring-blue-800">

                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg"
                         width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path color="white" fillRule="evenodd"
                              d="M9 7V2.221a2 2 0 0 0-.5.365L4.586 6.5a2 2 0 0 0-.365.5H9Zm2 0V2h7a2 2 0 0 1 2 2v6.41A7.5 7.5 0 1 0 10.5 22H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Z"
                              clipRule="evenodd"/>
                        <path color="white" fillRule="evenodd"
                              d="M9 16a6 6 0 1 1 12 0 6 6 0 0 1-12 0Zm6-3a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1v-1a1 1 0 0 1 1-1Z"
                              clipRule="evenodd"/>
                    </svg>
                    Добавить
                </button>
            </header>

            <ContractorDialog data={dialogState.data}
                              visible={dialogState.visible}
                              onCommit={dialogState.commit}
                              onClose={closeDialog}/>

            <main>
                <ContractorTable tableData={contractors} onDelete={deleteContractor} onEdit={editContractor}/>
            </main>

            <footer
                className="fixed grid grid-cols-1 bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200
                           shadow md:grid md:items-center md:justify-between md:p-6 dark:bg-gray-800
                           dark:border-gray-600">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © 2007–2024 ООО «Логнекс».
                </span>
            </footer>

        </StrictMode>
    );
}