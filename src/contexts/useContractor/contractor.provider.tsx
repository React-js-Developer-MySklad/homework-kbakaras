import React, {useState, useEffect, ReactNode} from 'react';
import axios from 'axios';
import {Contractor} from '../../types';
import {v4} from "uuid";
import { ContractorContext } from './contractor.context';


const api = axios.create({
    baseURL: 'http://localhost:3001/'
});


const ContractorProvider: React.FC<{ children: ReactNode }> = ({children}) => {

    const [contractors, setContractors] = useState<Contractor[]>([]);

    useEffect(() => {
        const fetchContractors = async () => {
            try {
                const response: Axios.AxiosXHR<Contractor[]> = await api.get(`contractors`);
                setContractors(response.data);
            } catch (error) {
                console.error('Не удалось получить список контрагентов:', error);
            }
        };

        fetchContractors().then(() => {
        });
    }, []);

    const addContractor = async (newContractor: Contractor) => {
        try {
            const response: Axios.AxiosXHR<Contractor> = await api.post(`contractors`, {id: v4(), ...newContractor});
            setContractors([...contractors, response.data]);
        } catch (error) {
            console.error('Не удалось создать контрагента:', error);
        }
    };

    const updateContractor = async (updatedContractor: Contractor) => {
        try {
            if (updatedContractor.id === undefined) {
                // noinspection ExceptionCaughtLocallyJS
                throw "У обновляемого контрагента должен быть идентификатор";
            }
            await api.put(`contractors/${updatedContractor.id}`, updatedContractor);
            setContractors(contractors.map(contractor => (contractor.id === updatedContractor.id
                ? updatedContractor
                : contractor)));
        } catch (error) {
            console.error('Не удалось обновить контрагента:', error);
        }
    };

    const deleteContractor = async (id: string) => {
        try {
            await api.delete(`contractors/${id}`);
            setContractors(contractors.filter(contractor => contractor.id !== id));
        } catch (error) {
            console.error('Не удалось удалить контрагента:', error);
        }
    };

    return (
        <ContractorContext.Provider value={{
            contractors,
            addContractor: addContractor,
            updateContractor: updateContractor,
            deleteContractor: deleteContractor
        }}>
            {children}
        </ContractorContext.Provider>
    );
};

export {ContractorContext, ContractorProvider};