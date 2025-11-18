"use client";

import { createContext } from "react";

import { ColumnDef } from "./types";

export type ColumnDefsContextProps = {
    setColumnDefs: React.Dispatch<React.SetStateAction<ColumnDef[]>>;
    getColumnDefs: () => ColumnDef[];
};

export const ColumnDefsContext = createContext<ColumnDefsContextProps | undefined>(undefined);