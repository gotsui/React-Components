"use client";

import { useRef, useState } from "react";
import { RowsContext } from "./RowsContext";
import { Row, TableRow } from "./types";

type RowsProviderProps = {
    children: React.ReactNode;
};

const RowsProvider = ({
    children,
}: RowsProviderProps) => {
    const [tableRows, setTableRows] = useState<TableRow[]>([]);

    const itemId = useRef(0);
    const createRowId = () => {
        return `row_${itemId.current++}`;
    };

    const getTableRows = (): TableRow[] => {
        return tableRows;
    };

    const setRows = (rows: Row[]) => {
        setTableRows(rows.map((row) => ({
            rowId: createRowId(),
            row,
        })));
    };

    const value = {
        setRows,
        setTableRows,
        getTableRows,
        createRowId,
    };

    return (
        <RowsContext value={value}>
            {children}
        </RowsContext>
    );
};

export default RowsProvider;