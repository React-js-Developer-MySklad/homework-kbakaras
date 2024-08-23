import React, {useCallback, useContext, useState} from "react";
import {ContractorTable} from "../contractorTable/contractorTable"
import {ContractorDialog, DialogState, newContractor} from "../contractorDialog/contractorDialog"
import {ContractorData} from "../../types";
import {ContractorContext} from "../../contexts/ContractorContext";

export const App: React.FC = () => {

    const context = useContext(ContractorContext);

    const [dialogState, setDialogState] = useState<DialogState | undefined>(undefined);
    const closeDialog = useCallback(() => setDialogState(undefined), []);

    const deleteContractor = useCallback((id: string) => {
        context.deleteContractor(id);
    }, [context]);

    const editContractor = useCallback((id: string) => {
        let contractor = context.contractors.find(value => value.id === id);
        setDialogState({
            data: {...contractor},
            commit: (contractor: ContractorData) => {
                context.updateContractor(id, contractor);
                closeDialog();
            }
        });
    }, [context]);

    const addContractor = useCallback(() => {
        setDialogState({
            data: {...newContractor},
            commit: (contractor: ContractorData) => {
                context.addContractor(contractor);
                closeDialog();
            }
        });
    }, [context]);

    return (
        <>
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

            {dialogState !== undefined && <ContractorDialog state={dialogState} onClose={closeDialog}/>}

            <main>
                <ContractorTable tableData={context.contractors} onEdit={editContractor} onDelete={deleteContractor}/>
            </main>

            <footer
                className="fixed grid grid-cols-1 bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200
                           shadow md:grid md:items-center md:justify-between md:p-6 dark:bg-gray-800
                           dark:border-gray-600">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © 2007–2024 ООО «Логнекс».
                </span>
            </footer>
        </>
    );
}