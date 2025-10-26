"use client";

import { createContext, Dispatch, SetStateAction } from "react";
import { ColumnDef, Row } from "./types";

export type TableContextProps = {
    setColumnDefs: Dispatch<SetStateAction<ColumnDef[]>>;
    getColumnDefs: () => ColumnDef[];
    setRows: Dispatch<SetStateAction<Row[]>>;
    getRows: () => Row[];
    getColumnUniqueDataMap: () => Map<string, Set<string>>;
    setColumnFilterMap: Dispatch<SetStateAction<Map<string, Set<string>>>>;
    getColumnFilterMap: () => Map<string, Set<string>>;
    getFilteredRows: () => Row[];
};

export const TableContext = createContext<TableContextProps | undefined>(undefined);