import htmlTable from './table.html';
import './table.css'

const uuid = require('uuid');

const contractors = require('../contractors').contractors;
document.getElementById('contractors-table').innerHTML = String(htmlTable);

const dialog = require('../dialog/dialog');

// Функция для генерации строки таблицы
function createTableRow(contractor) {
    return `
        <tr class="table-row border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-amber-100"
            data-id="${contractor.id}">

            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                ${contractor["Наименование"]}
            </th>
            <td class="px-6 py-4">
                ${contractor["ИНН"]}
            </td>
            <td class="px-6 py-4">
                ${contractor["Адрес"]}
            </td>
            <td class="px-6 py-4">
                ${contractor["КПП"]}
            </td>
            <td class="px-6 py-4">
                <button class="delete-button bg-red-500 px-3 py-1 text-white rounded"
                        data-id="${contractor.id}">
                    Удалить
                </button>
            </td>
        </tr>
    `;
}

function populateTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = contractors.map(contractor => createTableRow(contractor, deleteTableRow)).join('');
}

function deleteTableRow(id) {
    const index = contractors.findIndex(contractor => contractor.id === id);
    if (index !== -1) {
        contractors.splice(index, 1);
        populateTable();
    }
}

export function addRow(contractor) {
    contractors.push({
        "Наименование": contractor["Наименование"],
        "ИНН": contractor["ИНН"],
        "Адрес": contractor["Адрес"],
        "КПП": contractor["КПП"],
        id: uuid.v4(),
    });
    populateTable();
}


function handleDeleteButtonClick(event) {
    if (event.target.classList.contains('delete-button')) {
        deleteTableRow(String(event.target.getAttribute('data-id')))
    }
}

function handleDoubleClick(event) {

    let target = event.target;
    while (target && target.tagName !== 'TR') {
        target = target.parentElement;
    }

    if (target.classList.contains('table-row')) {

        let contractorId = target.getAttribute('data-id');
        let contractor = contractors.find(value => value.id === contractorId);
        dialog.edit(contractor, edited => {
            contractor["Наименование"] = edited["Наименование"];
            contractor["ИНН"] = edited["ИНН"];
            contractor["Адрес"] = edited["Адрес"];
            contractor["КПП"] = edited["КПП"];
            populateTable();
        });
    }
}

// Вызов функции для заполнения таблицы при загрузке страницы
document.addEventListener('DOMContentLoaded', populateTable);
document.getElementById('tableBody').addEventListener('click', handleDeleteButtonClick);
document.getElementById('tableBody').addEventListener('dblclick', handleDoubleClick);

