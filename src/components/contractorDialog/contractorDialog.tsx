import React, {useCallback, useEffect, useState} from "react";
import {ContractorData} from "../../types";
import {TextInput} from "../textInput/textInput";

export type ContractorDataCommit = (contractor: ContractorData) => void;

export const newContractor: ContractorData = {
    "Наименование": "",
    "ИНН": "",
    "Адрес": "",
    "КПП": ""
};

export interface DialogState {
    data: ContractorData
    visible: boolean
    commit: ContractorDataCommit
}

export const dialogClosed: DialogState = {
    data: {...newContractor},
    visible: false,
    commit: undefined
}

interface ContractorDialogProps {
    state: DialogState
    onClose: () => void
}

export const ContractorDialog: React.FC<ContractorDialogProps> = ({state, onClose}) => {

    const [contractor, setContractor] = useState<ContractorData>(state.data);

    const handleCommit = useCallback(() => state.commit(contractor), [contractor]);

    useEffect(() => {
        setContractor(state.data);
    }, [state]);

    const onChangeName = useCallback((value: string) =>
        setContractor({...contractor, "Наименование": value}), [contractor]);
    const onChangeInn = useCallback((value: string) =>
        setContractor({...contractor, "ИНН": value}), [contractor]);
    const onChangeAddress = useCallback((value: string) =>
        setContractor({...contractor, "Адрес": value}), [contractor]);
    const onChangeKpp = useCallback((value: string) =>
        setContractor({...contractor, "КПП": value}), [contractor]);

    return !state.visible ? null :
        <div className="fixed inset-0 flex items-center justify-center z-50">

            {/* Затемнённый фон */}
            <div className="fixed inset-0 bg-black bg-opacity-50"/>

            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-4 w-full max-w-md max-h-full">

                {/*Заголовок*/}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Контрагент</h3>

                    <button type="button"
                            onClick={onClose}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg
                                       text-sm w-8 h-8 ms-auto inline-flex justify-center items-center
                                       dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>

                <div className="relative p-4 w-full max-w-md max-h-full">

                    <div className="grid gap-4 mb-4">
                        <TextInput title="Наименование" value={contractor["Наименование"]} onChange={onChangeName}/>
                        <TextInput title="ИНН" value={contractor["ИНН"]} onChange={onChangeInn}/>
                        <TextInput title="Адрес" value={contractor["Адрес"]} onChange={onChangeAddress}/>
                        <TextInput title="КПП" value={contractor["КПП"]} onChange={onChangeKpp}/>
                    </div>

                    {/*Кнопки*/}
                    <div className="flex items-center mt-6 space-x-4 rtl:space-x-reverse justify-end">
                        <button type="button"
                                onClick={handleCommit}
                                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800
                                           focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg
                                           text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
                                           dark:focus:ring-blue-800">
                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"/>
                            </svg>
                            Сохранить
                        </button>

                        <button type="button"
                                onClick={onClose}
                                className="py-2.5 px-5 ms-3 text-sm items-center font-medium text-gray-900
                                           focus:outline-none bg-white rounded-lg border border-gray-200
                                           hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4
                                           focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800
                                           dark:text-gray-400 dark:border-gray-600 dark:hover:text-white
                                           dark:hover:bg-gray-700">
                            Отменить
                        </button>
                    </div>

                </div>

            </div>
        </div>;
}