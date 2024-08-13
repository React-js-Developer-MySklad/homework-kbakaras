import htmlApp from "./app.html";
import './app.css'

document.getElementById('root').innerHTML = String(htmlApp);

const elementAddButton = document.getElementById("contractor-add");

const table = require('./contractors/table/table')
const dialog= require('./contractors/dialog/dialog');

elementAddButton.addEventListener('click', () => dialog.create(table.addRow));
