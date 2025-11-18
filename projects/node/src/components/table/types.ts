import { JSX } from "react";

export type ColumnDef = {
    field: string;
    label?: string;
    filter?: boolean;
    sortable?: boolean;
    cellRenderer?: CellRenderer;
};

export type Row = {
    [k: string]: boolean | number | string;
};

export type TableRow = {
    rowId: string;
    row: Row;
};

export type CellRenderer = (props: CellProperties) => JSX.Element;

export type CellProperties = {
    value: boolean | number | string;
    field: string;
    tableRow: TableRow;
};