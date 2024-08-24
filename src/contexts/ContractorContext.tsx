import React, {createContext, useState, useEffect, ReactNode} from 'react';
import axios from 'axios';
import {Contractor, ContractorData} from '../types';
import {v4} from "uuid";

interface ContractorContextProps {
    contractors: Contractor[];
    addContractor: (newContractor: ContractorData) => void;
    updateContractor: (id: string, updatedContractor: ContractorData) => void;
    deleteContractor: (id: string) => void;
}

const api = axios.create({
    baseURL: 'http://localhost:3001/'
});

const ContractorContext = createContext<ContractorContextProps | undefined>(undefined);

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

    const addContractor = async (newContractor: ContractorData) => {
        try {
            const response: Axios.AxiosXHR<Contractor> = await api.post(`contractors`, {id: v4(), ...newContractor});
            setContractors([...contractors, response.data]);
        } catch (error) {
            console.error('Не удалось создать контрагента:', error);
        }
    };

    const updateContractor = async (id: string, updatedContractor: ContractorData) => {
        try {
            await api.put(`contractors/${id}`, {id : id, ...updatedContractor});
            setContractors(contractors.map(contractor => (contractor.id === id
                ? {id: id, ...updatedContractor}
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