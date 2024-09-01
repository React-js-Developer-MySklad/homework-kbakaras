import {useContext} from "react";
import {ContractorContext} from "./contractor.context";

export const useContractor = () => {

    const context = useContext(ContractorContext);
    if (context === null) {
        throw Error('useContractor hook outside ContractorProvider')
    }

    return context;
}