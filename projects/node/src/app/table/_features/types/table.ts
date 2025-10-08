export type ColumnDef = {
    field: string;
    label?: string;
    filter?: boolean;
    sortable?: boolean;
};

export type ColumnDefs = ColumnDef[];

export type Row = {
    [k: string]: boolean | number | string;
};

export type RowData = Row[];