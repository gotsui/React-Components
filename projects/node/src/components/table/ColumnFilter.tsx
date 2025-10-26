"use client";

import Checkbox from "./Checkbox";
import { useTable } from "./hooks";

type ColumnFilterProps = {
    field: string;
};

const ColumnFilter = ({
    field,
}: ColumnFilterProps) => {
    const { getColumnUniqueDataMap, setColumnFilterMap, getColumnFilterMap } = useTable();

    const uniqueData = getColumnUniqueDataMap().get(field) ?? new Set();
    const columnFilter = getColumnFilterMap().get(field) ?? new Set();

    const handleChangeAll = () => {
        setColumnFilterMap((prev) => new Map(prev).set(field, uniqueData));
    };

    const handleChangeItem = (id: string) => {
        setColumnFilterMap((prev) => {
            const fieldSet = new Set(prev.get(field));

            if (fieldSet && fieldSet.has(id)) {
                fieldSet.delete(id);
            } else {
                fieldSet.add(id);
            }

            return new Map(prev).set(field, fieldSet);
        });
    };

    return (
        <>
            <button
                type="button"
                className={[
                    "relative inline-flex items-center ml-2 hover:text-blue-600",
                    "filter-anchor",
                ].join(" ")}
                popoverTarget={`filter-${field}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-filter-icon lucide-list-filter">
                    <path d="M2 5h20" />
                    <path d="M6 12h12" />
                    <path d="M9 19h6" />
                </svg>
                {uniqueData.size !== columnFilter.size && (
                    <span className="top-[-3] start-2.5 absolute w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
                )}
            </button>
            <div
                id={`filter-${field}`}
                className={[
                    "absolute px-4 py-3 space-y-4 max-h-[50vh]",
                    "bg-white border border-slate-300 rounded-md shadow-sm",
                    "filter-popover",
                ].join(" ")}
                popover="auto"
            >
                <div className="border-b pb-2">
                    <Checkbox
                        id={`filter-list-all-${field}`}
                        label="すべて選択"
                        checked={uniqueData.size === columnFilter.size}
                        onChange={handleChangeAll}
                    />
                </div>
                {Array.from(uniqueData).sort().map((item) => (
                    <Checkbox
                        key={item}
                        id={`filter-list-${item}`}
                        label={String(item)}
                        checked={columnFilter.has(item)}
                        onChange={() => handleChangeItem(item)}
                    />
                ))}
            </div>
        </>
    );
};

export default ColumnFilter;