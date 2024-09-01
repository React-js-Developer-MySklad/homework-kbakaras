import React from "react";
import {Contractor} from "../../types";
import {ContractorValidate} from "../../validation";
import {TextInput} from "../textInput/textInput";
import {Form, Field} from 'react-final-form';


interface ContractorDialogProps {
    data: Contractor
    onClose: () => void
    onCommit: (contractor: Contractor) => void
}

export const ContractorDialog: React.FC<ContractorDialogProps> = ({data, onClose, onCommit}) => {

    return (
        <Form onSubmit={onCommit}
              initialValues={data}
              render={({handleSubmit, submitting, pristine}) => (

                  <div className="fixed inset-0 flex items-center justify-center z-50">

                      {/* Затемнённый фон */}
                      <div className="fixed inset-0 bg-black bg-opacity-50"/>

                      <div
                          className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-4 w-full max-w-md max-h-full">

                          {/*Заголовок*/}
                          <div
                              className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Контрагент</h3>

                              <button type="button"
                                      onClick={onClose}
                                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg
                                       text-sm w-8 h-8 ms-auto inline-flex justify-center items-center
                                       dark:hover:bg-gray-600 dark:hover:text-white">
                                  <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none"
                                       viewBox="0 0 14 14">
                                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                  </svg>
                                  <span className="sr-only">Close modal</span>
                              </button>
                          </div>

                          <div className="relative p-4 w-full max-w-md max-h-full">

                              <div className="grid gap-4 mb-4">
                                  <Field name="Наименование" validate={ContractorValidate.Name}>{props =>
                                      <TextInput title="Наименование" {...props.input} error={props.meta.error}/>
                                  }</Field>
                                  <Field name="ИНН" validate={ContractorValidate.Inn}>{props =>
                                      <TextInput title="ИНН" {...props.input} error={props.meta.error}/>
                                  }</Field>
                                  <Field name="Адрес">{props =>
                                      <TextInput title="Адрес" {...props.input} error={props.meta.error}/>
                                  }</Field>
                                  <Field name="КПП" validate={ContractorValidate.Kpp}>{props =>
                                      <TextInput title="КПП" {...props.input} error={props.meta.error}/>
                                  }</Field>
                              </div>

                              {/*Кнопки*/}
                              <div className="flex items-center mt-6 space-x-4 rtl:space-x-reverse justify-end">
                                  <button type="submit"
                                          disabled={submitting || pristine}
                                          onClick={handleSubmit}
                                          className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800
                                           focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg
                                           text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
                                           dark:focus:ring-blue-800">
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
                  </div>

              )}/>);
}