"use client";

import Table from "@/components/table/Table";
import { CellRenderer, ColumnDef, Row } from "@/components/table/types";
import { useRows } from "@/components/table/hooks";

const initialRows: Row[] = [
    { field: "id", label: "フローID" },
    { field: "name", label: "フロー名", filter: true },
    { field: "createdAt", label: "作成日" },
    { field: "updatedAt", label: "更新日" },
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
                                    [params.field]: e.target.value,
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

    const checkboxRenderer: CellRenderer = (params) => {
        const checked = typeof params.value === "boolean" ? params.value : false;

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setTableRows(
                (prev) => prev.map(
                    (tableRow) => tableRow.rowId === params.tableRow.rowId
                        ? {
                            ...tableRow,
                            row: {
                                ...tableRow.row,
                                [params.field]: e.target.checked,
                            }
                        }
                        : tableRow
                )
            );
        };

        return (
            <label className="flex items-center gap-4 p-2 cursor-pointer">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                    className="size-4 accent-cyan-300 rounded-lg"
                />
                <span className="">
                    {checked ? "あり" : "なし"}
                </span>
            </label>
        );
    };

    const columnDefs: ColumnDef[] = [
        { field: "field", label: "カラム名" },
        { field: "label", label: "ラベル", cellRenderer: inputRenderer },
        { field: "filter", label: "フィルター", cellRenderer: checkboxRenderer },
        { field: "delete", label: "削除", cellRenderer: deleteRenderer },
    ];

    return (
        <div className="flex flex-col h-screen w-screen space-y-4 p-4">
            <button
                className="self-start p-4 outline hover:bg-gray-100"
                onClick={() => setTableRows(
                    (prev) => prev.concat({ rowId: createRowId(), row: {} })
                )}
            >
                +
            </button>
            <div className="flex-1 max-h-70">
                <Table
                    initialColumnDefs={columnDefs}
                    initialRows={initialRows}
                    caption="test"
                />
            </div>
        </div>
    )
};

export default Template;