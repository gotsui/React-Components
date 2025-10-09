"use client";

import { createContext } from "react";

import { TableContextValue } from "../hooks/useTable";

export const TableContext = createContext<TableContextValue | undefined>(undefined);