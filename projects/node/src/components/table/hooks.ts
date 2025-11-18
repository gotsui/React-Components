"use client";

import { useContext } from "react";

import { RowsContext, RowsContextProps } from "./RowsContext";
import { ColumnDefsContext, ColumnDefsContextProps } from "./ColumnDefsContext";
import { FilterContext, FilterContextProps } from "./FilterContext";

export const useRows = (): RowsContextProps => {
    const context = useContext(RowsContext);

    if (!context) {
        throw new Error("useRows must be used within a RowsProvider");
    }

    return context;
};

export const useColumnDefs = (): ColumnDefsContextProps => {
    const context = useContext(ColumnDefsContext);

    if (!context) {
        throw new Error("useColumnDefs must be used within a ColumnDefsProvider");
    }

    return context;
};

export const useFilter = (): FilterContextProps => {
    const context = useContext(FilterContext);

    if (!context) {
        throw new Error("useFilter must be used within a FilterProvider");
    }

    return context;
};
