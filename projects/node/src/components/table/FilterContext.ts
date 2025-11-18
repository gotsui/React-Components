"use client";

import { createContext } from "react";

export type FilterContextProps = {
    setColumnFilterMap: React.Dispatch<React.SetStateAction<Map<string, Set<string>>>>;
    getColumnFilterMap: () => Map<string, Set<string>>;
};

export const FilterContext = createContext<FilterContextProps | undefined>(undefined);