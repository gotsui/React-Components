"use client";

import { useEffect } from "react";

import ColumnFilter from "./ColumnFilter";
import { useColumnDefs } from "./hooks";
import { ColumnDef } from "./types";

type TableHeadProps = {
    initialColumnDefs?: ColumnDef[];
};

const TableHead = ({
    initialColumnDefs = [],
}: TableHeadProps) => {
    const { setColumnDefs, getColumnDefs } = useColumnDefs();

    useEffect(() => {
        setColumnDefs(initialColumnDefs);
    }, []);

    return (
        <thead className="sticky top-0 z-10">
            <tr className="bg-gray-200">
                {getColumnDefs().map((def) => (
                    <th
                        key={def.field}
                        className={[
                            "px-4 py-2 text-xs",
                            "border-b border-r",
                            "border-gray-400",
                            "dark:border-gray-700",
                        ].join(" ")}
                    >
                        <div
                            className={[
                                "flex relative justify-between",
                                "filter-anchor-scope",
                            ].join(" ")}
                        >
                            {def.label ?? def.field}
                            {def.filter && (
                                <ColumnFilter field={def.field} />
                            )}
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHead;