import htmlDialog from './dialog.html';
import './dialog.css'
import { Modal } from 'flowbite';

const elementDialog = document.getElementById('contractors-dialog');
elementDialog.innerHTML = String(htmlDialog);

const elementCloseButton = document.getElementById('contractors-dialog-close');
const elementCancelButton = document.getElementById('contractors-dialog-cancel');
const elementCommitButton = document.getElementById('contractors-dialog-commit');

const elementNameField = document.getElementById("Наименование");
const elementInnField = document.getElementById("ИНН");
const elementAddressField = document.getElementById("Адрес");
const elementKppField = document.getElementById("КПП");

export const dialog = new Modal(elementDialog);
let commitCallback;


function handleCloseButton() {
    dialog.hide();
}

function handleCommitButton() {

    let contractor = {
        "Наименование": elementNameField.value,
        "ИНН": elementInnField.value,
        "Адрес": elementAddressField.value,
        "КПП": elementKppField.value
    }

    commitCallback(contractor);
    dialog.hide();
}

export function create(callBack) {

    elementNameField.value = "";
    elementInnField.value = "";
    elementAddressField.value = "";
    elementKppField.value = "";

    commitCallback = callBack;
    dialog.show();
}

export function edit(contractor, callBack) {

    elementNameField.value = contractor["Наименование"];
    elementInnField.value = contractor["ИНН"];
    elementAddressField.value = contractor["Адрес"];
    elementKppField.value = contractor["КПП"];

    commitCallback = callBack;
    dialog.show();
}

elementCloseButton.addEventListener('click', handleCloseButton);
elementCancelButton.addEventListener('click', handleCloseButton);
elementCommitButton.addEventListener('click', handleCommitButton);
