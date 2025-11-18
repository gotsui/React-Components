"use client";

import { createContext, Dispatch, SetStateAction } from "react";

import { Row, TableRow } from "./types";

export type RowsContextProps = {
    setRows: (rows: Row[]) => void;
    setTableRows: Dispatch<SetStateAction<TableRow[]>>;
    getTableRows: () => TableRow[];
    createRowId: () => string;
};

export const RowsContext = createContext<RowsContextProps | undefined>(undefined);