import { JSX } from "react";

export type ColumnDef = {
    field: string;
    label?: string;
    filter?: boolean;
    sortable?: boolean;
    cellRenderer?: CellRenderer;
};

export type Row = {
    [k: string]: boolean | number | string | undefined;
};

export type TableRow = {
    rowId: string;
    row: Row;
};

export type CellRenderer = (props: CellProps) => JSX.Element;

export type CellProps = {
    value: boolean | number | string;
    field: string;
    tableRow: TableRow;
};