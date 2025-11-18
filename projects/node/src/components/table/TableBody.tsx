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
    const filteredRowIds = useMemo(() => {
        return getTableRows().filter(
            (tableRow) => getColumnDefs().every(
                (def) => !getColumnFilterMap().get(def.field)?.has(String(tableRow.row[def.field]))
            )
        ).map(({ rowId }) => rowId);
    }, [getColumnDefs, getColumnFilterMap]);

    const filteredRows = getTableRows().filter(({ rowId }) => filteredRowIds.includes(rowId));

    return (
        <tbody>
            {filteredRows.map((tableRow, rowIndex) => (
                <tr key={tableRow.rowId}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    {getColumnDefs().map((def, columnIndex) => (
                        <td
                            key={columnIndex}
                            className={[
                                "border-r text-xs",
                                `${rowIndex > 0 && "border-t"}`,
                            ].join(" ")}
                        >
                            {def.cellRenderer ? (
                                def.cellRenderer({
                                    value: tableRow.row[def.field],
                                    field: def.field,
                                    tableRow,
                                })
                            ) : (
                                <span className="block mx-4 my-2">
                                    {tableRow.row[def.field]}
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