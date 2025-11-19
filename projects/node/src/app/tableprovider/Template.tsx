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
    const { setTableRows, createRowId } = useRows();

    const inputRenderer: CellRenderer = (params) => {
        return (
            <input
                className="inline-block size-full px-4 py-2 outline-none"
                value={String(params.value)}
                onChange={(e) => setTableRows(
                    (prev) => prev.map(
                        (tableRow) => tableRow.rowId === params.tableRow.rowId
                            ? {
                                ...tableRow,
                                row: {
                                    ...tableRow.row,
                                    [params.field]: e.target.value
                                },
                            }
                            : tableRow
                    )
                )}
            />
        );
    };

    const deleteRenderer: CellRenderer = (params) => {
        return (
            <button
                className={[
                    "px-4 py-2 text-red-500 cursor-pointer",
                    "hover:text-red-600 hover:underline",
                ].join(" ")}
                onClick={() => setTableRows(
                    (prev) => prev.filter(
                        (tableRow) => tableRow.rowId !== params.tableRow.rowId
                    )
                )}
            >
                削除
            </button>
        );
    };

    const columnDefs: ColumnDef[] = [
        { label: "Make", field: "make", filter: true },
        { label: "Model", field: "model", filter: true },
        { label: "Price", field: "price", filter: true, cellRenderer: inputRenderer},
        { label: "delete", field: "delete", cellRenderer: deleteRenderer},
    ];

    return (
        <div className="flex flex-col items-center p-4 space-y-4">
            <button
                className="self-start p-4 outline hover:bg-gray-100"
                onClick={() => setTableRows(
                    (prev) => prev.concat({ rowId: createRowId(), row: {} })
                )}
            >
                +
            </button>
            <Table
                initialColumnDefs={columnDefs}
                initialRows={initialRows}
                caption="test"
            />
        </div>
    )
};

export default Template;