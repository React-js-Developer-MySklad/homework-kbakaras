import {Contractor} from "../../types";

export type ContractorProps = {
    contractors: Contractor[];
    addContractor: (newContractor: Contractor) => void;
    updateContractor: (updatedContractor: Contractor) => void;
    deleteContractor: (id: string) => void;
}
