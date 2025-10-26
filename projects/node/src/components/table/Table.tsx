"use client";

import { useEffect } from "react";
import ColumnFilter from "./ColumnFilter";
import { useTable } from "./hooks";
import TableBody from "./TableBody";
import { ColumnDef, Row } from "./types";

type TableProps = {
    initialColumnDefs?: ColumnDef[];
    initialRows?: Row[];
    caption?: string;
};

const Table = ({
    initialColumnDefs,
    initialRows,
    caption
}: TableProps) => {
    const { setColumnDefs, getColumnDefs, setRows } = useTable();

    useEffect(() => {
        setColumnDefs(initialColumnDefs ?? []);
        setRows(initialRows ?? []);
    }, []);

    return (
        <figure className="flex flex-col h-full w-full">
            {caption && (
                <figcaption className="pl-1 pb-1 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                    {caption}
                </figcaption>
            )}
            <div className="flex-1 whitespace-nowrap overflow-auto">
                <table className="table-auto border-separate border-spacing-0 border-b border-l w-full">
                    <thead className="sticky top-0 z-10">
                        <tr className="bg-gray-200">
                            {getColumnDefs().map((def) => (
                                <th key={def.field} className="px-4 py-2 border-t border-r border-b text-xs">
                                    <div className="flex relative justify-between filter-anchor-scope">
                                        {def.label ?? def.field}
                                        {def.filter && (
                                            <ColumnFilter field={def.field} />
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <TableBody />
                </table>
            </div>
        </figure>
    );
};

export default Table;