"use client";

import { useTable } from "./hooks";

const TableBody = () => {
    const { getColumnDefs, getFilteredRows } = useTable();

    return (
        <tbody>
            {getFilteredRows().map((row, rowIndex) => (
                <tr key={rowIndex}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    {getColumnDefs().map((def) => (
                        <td
                            key={def.field}
                            className={[
                                "px-4 py-2 border-r text-xs",
                                `${rowIndex > 0 && "border-t"}`,
                            ].join(" ")}
                        >
                            {row[def.field]}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

export default TableBody;