"use client";

import TableBody from "./TableBody";
import TableHead from "./TableHead";
import { ColumnDef, Row } from "./types";
import "./style.css";

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
    return (
        <figure className="flex flex-col h-full w-full">
            {caption && (
                <figcaption className="pl-1 pb-1 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                    {caption}
                </figcaption>
            )}
            <div className="flex-1 whitespace-nowrap overflow-auto">
                <table className="table-auto border-separate border-spacing-0 border-b border-l w-full">
                    <TableHead initialColumnDefs={initialColumnDefs} />
                    <TableBody initialRows={initialRows} />
                </table>
            </div>
        </figure>
    );
};

export default Table;