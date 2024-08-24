import React from 'react';
import './style.css'
import {createRoot} from 'react-dom/client';
import {App} from './components/app/app'
import {StrictMode} from "react";
import {ContractorProvider} from "./contexts/ContractorContext";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ContractorProvider>
            <App/>
        </ContractorProvider>
    </StrictMode>
);
