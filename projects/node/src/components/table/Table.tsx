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
                <figcaption
                    className={[
                        "pl-1 pb-1 font-semibold bg-white",
                        "text-gray-900 text-lg text-left rtl:text-right",
                        "dark:text-white dark:bg-gray-800"
                    ].join(" ")}
                >
                    {caption}
                </figcaption>
            )}
            <div className="flex-1 flex flex-col overflow-hidden rounded-lg border border-gray-400">
                <div className="flex-1 whitespace-nowrap overflow-auto mb-[-1px] mr-[-1px]">
                    <table className="table-auto border-separate border-spacing-0 w-full">
                        <TableHead initialColumnDefs={initialColumnDefs} />
                        <TableBody initialRows={initialRows} />
                    </table>
                </div>
            </div>
        </figure>
    );
};

export default Table;