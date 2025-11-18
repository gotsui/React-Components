"use client";

import { useState } from "react";

import { ColumnDef } from "./types";
import { ColumnDefsContext } from "./ColumnDefsContext";

type ColumnDefsProviderProps = {
    children: React.ReactNode;
};

const ColumnDefsProvider = ({
    children,
}: ColumnDefsProviderProps) => {
    const [columnDefs, setColumnDefs] = useState<ColumnDef[]>([]);

    const getColumnDefs = (): ColumnDef[] => {
        return columnDefs;
    };

    const value = {
        setColumnDefs,
        getColumnDefs,
    };

    return (
        <ColumnDefsContext value={value}>
            {children}
        </ColumnDefsContext>
    );
};

export default ColumnDefsProvider;