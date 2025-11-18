"use client";

import Table from "@/components/table/Table";
import { CellRenderer, ColumnDef, Row } from "@/components/table/types";
import { useRows } from "@/components/table/hooks";

const initialRows: Row[] = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
];

const Template = () => {
    const { setTableRows } = useRows();

    const inputRenderer: CellRenderer = (params) => {
        return (
            <input
                className="inline-block size-full px-4 py-2 outline-none"
                value={String(params.value)}
                onChange={(e) => setTableRows(
                    (prev) => prev.map(
                        (tableRow) => tableRow.rowId === params.tableRow.rowId
                            ? { ...tableRow, row: { ...tableRow.row, [params.field]: e.target.value } }
                            : tableRow
                    )
                )}
            />
        );
    };

    const columnDefs: ColumnDef[] = [
        { label: "Make", field: "make", filter: true },
        { label: "Model", field: "model", filter: true },
        { label: "Price", field: "price", filter: true, cellRenderer: inputRenderer},
    ];

    return (
        <Table
            initialColumnDefs={columnDefs}
            initialRows={initialRows}
            caption="test"
        />
    )
};

export default Template;