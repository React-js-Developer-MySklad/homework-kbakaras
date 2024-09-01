import {createContext} from "react";
import {ContractorProps} from "./contractor.props";

export const ContractorContext = createContext<ContractorProps | undefined>(undefined);
