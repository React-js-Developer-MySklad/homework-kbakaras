import htmlApp from "./app.html";
import htmlModal from "./add-table-row-modal.html";
import './app.css'

document.getElementById('root').innerHTML = String(htmlApp);
document.getElementById('add-table-row-modal').innerHTML = String(htmlModal);

const contractors = [
    {
        "Наименование": "ООО Рога и Копыта",
        "ИНН": "7723931036",
        "Адрес": "contact@rogiikopyta.ru",
        "КПП": "772301001"
    },
    {
        "Наименование": "ООО Рога и Копыта 2",
        "ИНН": "7723931037",
        "Адрес": "contact@rogiikopyta2.ru",
        "КПП": "772301001"
    },
];

// Функция для генерации строки таблицы
function createTableRow(contractor) {
    return `
        <tr class="border-b dark:bg-gray-800 dark:border-gray-700">
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
                <button class="bg-red-500 px-3 py-1 text-white rounded delete-button" data-id="${contractor["ИНН"]}">Удалить</button>
            </td>
        </tr>
    `;
}

// Функция для заполнения таблицы данными
function populateTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = contractors.map(contractor => createTableRow(contractor, deleteTableRow)).join('');
}

// Функция для удаления строки по ИНН
function deleteTableRow(inn) {
    // Удаление контрагента из массива
    const index = contractors.findIndex(contractor => contractor["ИНН"] === inn);
    if (index !== -1) {
        contractors.splice(index, 1);
        populateTable();
    }
}


function handleDeleteButtonClick(event) {
    if (event.target.classList.contains('delete-button')) {
        deleteTableRow(String(event.target.getAttribute('data-id')))
    }
}


// Вызов функции для заполнения таблицы при загрузке страницы
document.addEventListener('DOMContentLoaded', populateTable);
document.getElementById('tableBody').addEventListener('click', handleDeleteButtonClick);
