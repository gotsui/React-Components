"use client";

import React, { useEffect, useMemo, useState } from "react";

import { TableContext } from "./TableContext";
import { ColumnDef, Row } from "./types";

import "./table.css";

type TableProviderProps = {
    children: React.ReactNode;
};

const TableProvider = ({
    children,
}: TableProviderProps) => {
    const [columnDefs, setColumnDefs] = useState<ColumnDef[]>([]);
    const [rows, setRows] = useState<Row[]>([]);
    const [columnFilterMap, setColumnFilterMap] = useState<Map<string, Set<string>>>(new Map());

    const columnUniqueDataMap = useMemo(() => {
        return new Map(
            columnDefs.map((def) => [
                def.field,
                new Set(rows.map((row) => String(row[def.field]))),
            ])
        );
    }, [rows]);

    useEffect(() => {
        setColumnFilterMap(columnUniqueDataMap);
    }, [columnUniqueDataMap]);

    const filteredRows = rows.filter(
        (row) => columnDefs.every(
            (def) => columnFilterMap.get(def.field)?.has(String(row[def.field]))
        )
    );

    const getColumnDefs = (): ColumnDef[] => {
        return columnDefs;
    };

    const getRows = (): Row[] => {
        return rows;
    };

    const getColumnFilterMap = (): Map<string, Set<string>> => {
        return columnFilterMap;
    };

    const getColumnUniqueDataMap = (): Map<string, Set<string>> => {
        return columnUniqueDataMap;
    };

    const getFilteredRows = (): Row[] => {
        return filteredRows;
    };

    const value = {
        setColumnDefs,
        getColumnDefs,
        setRows,
        getRows,
        getColumnUniqueDataMap,
        setColumnFilterMap,
        getColumnFilterMap,
        getFilteredRows,
    };

    return (
        <TableContext value={value}>
            {children}
        </TableContext>
    );
};

export default TableProvider;