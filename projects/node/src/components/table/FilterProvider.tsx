"use client";

import { useState } from "react";

import { FilterContext } from "./FilterContext";

type FilterProviderProps = {
    children: React.ReactNode;
};

const FilterProvider = ({
    children,
}: FilterProviderProps) => {
    const [columnFilterMap, setColumnFilterMap] = useState<Map<string, Set<string>>>(new Map());

    const getColumnFilterMap = (): Map<string, Set<string>> => {
        return columnFilterMap;
    };

    const value = {
        setColumnFilterMap,
        getColumnFilterMap,
    };

    return (
        <FilterContext value={value}>
            {children}
        </FilterContext>
    );
};

export default FilterProvider;