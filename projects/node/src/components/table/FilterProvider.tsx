"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { FilterContext } from "./FilterContext";
import { useColumnDefs, useRows } from "./hooks";
import { Row } from "./types";

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