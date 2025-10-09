"use client";

import { useCallback, useState } from "react";

import { ColumnDef, Row } from "../types/table";

export type TableContextValue = {
    getColumnDefs: () => ColumnDef[];
    getRows: () => Row[];
    getFilteredRows: () => Row[];
    getColumnFilterItems: (field: string) => FilterItem[];
    setColumnFilterItems: (field: string, filterItems: FilterItem[]) => void;
};

type FilterItem = {
    id: string;
    value: string;
    checked: boolean;
};

type UseTableProps = {
    columnDefs: ColumnDef[];
    rows: Row[];
};

export const useTable = ({
    columnDefs,
    rows,
}: UseTableProps): TableContextValue => {
    const [filterItemsMap, setFilterItemsMap] = useState<Map<string, FilterItem[]>>(new Map(
        columnDefs.map((def) => [
            def.field,
            Array
                .from(new Set(rows.map((row) => String(row[def.field]))))
                .sort()
                .map((value, index) => ({ id: String(index), value, checked: true })),
        ])
    ));

    const filteredRows = rows.filter((row) => columnDefs.every((def) => filterItemsMap.get(def.field)?.find((item) => item.value === String(row[def.field]))?.checked));

    const setColumnFilterItems = useCallback((field: string, filterItems: FilterItem[]) => {
        setFilterItemsMap((prev) => new Map(prev).set(field, filterItems));
    }, []);

    const getColumnFilterItems = useCallback((field: string) => {
        return filterItemsMap.get(field) ?? [];
    }, [filterItemsMap]);

    const getColumnDefs = useCallback(() => {
        return columnDefs;
    }, []);

    const getRows = useCallback(() => {
        return rows;
    }, []);

    const getFilteredRows = useCallback(() => {
        return filteredRows;
    }, [filteredRows]);

    return { getColumnDefs, getRows, getFilteredRows, getColumnFilterItems, setColumnFilterItems };
};