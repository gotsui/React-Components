"use client";

import { useContext } from "react";

import { TableContext, TableContextProps } from "./TableContext";

export const useTable = (): TableContextProps => {
    const context = useContext(TableContext);

    if (!context) {
        throw new Error("useTable must be used within a TableProvider");
    }

    return context;
};