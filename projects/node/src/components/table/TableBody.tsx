"use client";

import { useEffect, useMemo } from "react";
import { useColumnDefs, useFilter, useRows } from "./hooks";
import { Row } from "./types";

type TableBodyProps = {
    initialRows?: Row[];
};

const TableBody = ({
    initialRows = [],
}: TableBodyProps) => {
    const { setRows, getTableRows } = useRows();
    const { getColumnDefs } = useColumnDefs();
    const { getColumnFilterMap } = useFilter();

    useEffect(() => {
        setRows(initialRows);
    }, []);

    // フィルター適用をフィルター設定時に限定
    const hiddenRowIds = useMemo(() => {
        return getTableRows().filter(
            (tableRow) => getColumnDefs().some(
                (def) => getColumnFilterMap().get(def.field)?.has(String(tableRow.row[def.field] ?? ""))
            )
        ).map(({ rowId }) => rowId);
    }, [getColumnDefs, getColumnFilterMap]);

    const filteredRows = getTableRows().filter(({ rowId }) => !hiddenRowIds.includes(rowId));

    return (
        <tbody>
            {filteredRows.map((tableRow) => (
                <tr
                    key={tableRow.rowId}
                    className={[
                        "group bg-white hover:bg-blue-50",
                        "dark:bg-gray-800",
                    ].join(" ")}
                >
                    {getColumnDefs().map((def, columnIndex) => (
                        <td
                            key={columnIndex}
                            className={[
                                "text-xs border-gray-400",
                                "border-b border-r",
                                "dark:border-gray-700",
                            ].join(" ")}
                        >
                            {def.cellRenderer ? (
                                def.cellRenderer({
                                    value: tableRow.row[def.field] ?? "",
                                    field: def.field,
                                    tableRow,
                                })
                            ) : (
                                <span className="block mx-4 my-2">
                                    {tableRow.row[def.field] ?? ""}
                                </span>
                            )}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

export default TableBody;