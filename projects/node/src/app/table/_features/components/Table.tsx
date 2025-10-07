import crypto from 'node:crypto';

import { ColumnDefs, Row, RowData } from "../types/table";

type TableProps = {
    columnDefs: ColumnDefs;
    rowData: RowData;
    caption?: string;
};

const Table = ({
    columnDefs,
    rowData,
    caption,
}: TableProps) => {
    const identifiedRowData: [string, Row][] = rowData.map((row) => [crypto.randomUUID(), row]);

    return (
        <figure className="flex flex-col h-full">
            {caption && (
                <figcaption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                    {caption}
                </figcaption>
            )}
            <div className="flex-1 whitespace-nowrap overflow-auto border-t border-l">
                <table className="table-auto border-separate border-spacing-0">
                    <thead className="sticky top-0 z-10">
                        <tr className="bg-gray-200">
                            {columnDefs.map((def) => (
                                <th key={def.field} className="px-4 py-2 border-r border-b">
                                    {def.lable ?? def.field}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {identifiedRowData.map(([rowId, row]) => (
                            <tr key={rowId}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                {columnDefs.map((def) => (
                                    <td key={def.field} className="px-4 py-2 border-r border-b">
                                        {row[def.field]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </figure>
    );
};

export default Table;