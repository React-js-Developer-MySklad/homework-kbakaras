import React, {memo} from "react";
import {Contractor} from "../../types";

interface ContractorTableProps {
    tableData: Contractor[],
    onDelete: (id: string) => void,
    onEdit: (id: string) => void
}

export const ContractorTable: React.FC<ContractorTableProps> = memo(
    ({tableData, onDelete, onEdit}) => {

        const listItems = tableData.map(contractor =>
            <tr key={contractor.id}
                onDoubleClick={() => onEdit(contractor.id)}
                className="table-row border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-amber-100">

                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {contractor["Наименование"]}
                </th>
                <td className="px-6 py-4">
                    {contractor["ИНН"]}
                </td>
                <td className="px-6 py-4">
                    {contractor["Адрес"]}
                </td>
                <td className="px-6 py-4">
                    {contractor["КПП"]}
                </td>
                <td className="px-6 py-4">
                    <button className="delete-button bg-red-500 px-3 py-1 text-white rounded"
                            onClick={() => onDelete(contractor.id)}>
                        Удалить
                    </button>
                </td>
            </tr>
        );

        return (
            <div id="contractors-table" className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Наименование</th>
                        <th scope="col" className="px-6 py-3">ИНН</th>
                        <th scope="col" className="px-6 py-3">Адрес</th>
                        <th scope="col" className="px-6 py-3">КПП</th>
                        <th scope="col" className="px-6 py-3"></th>
                    </tr>
                    </thead>
                    <tbody id="tableBody">
                    {listItems}
                    </tbody>
                </table>
            </div>
        );
    });