"use client";

import { useState } from "react";

import { ColumnDefsContext } from "./ColumnDefsContext";
import { ColumnDef } from "./types";

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