"use client";

import Checkbox from "./Checkbox";
import FilterSvg from "./FilterSvg";
import { useFilter, useRows } from "./hooks";

type ColumnFilterProps = {
    field: string;
};

const ColumnFilter = ({
    field,
}: ColumnFilterProps) => {
    const { getTableRows } = useRows();
    const { setColumnFilterMap, getColumnFilterMap } = useFilter();

    const uniqueData = new Set(getTableRows().map((tableRow) => String(tableRow.row[field] ?? "")));
    const columnFilter = getColumnFilterMap().get(field) ?? new Set();

    const handleChangeAll = () => {
        setColumnFilterMap(
            (prev) => new Map(prev).set(field, columnFilter.size === 0 ? uniqueData : new Set())
        );
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
                    "relative inline-flex items-center ml-2",
                    "hover:text-blue-600 focus:ring-0 focus:outline-none",
                    "filter-anchor",
                ].join(" ")}
                popoverTarget={`filter-${field}`}
            >
                <FilterSvg size={15} />
                {columnFilter.size !== 0 && (
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
                        checked={columnFilter.size === 0}
                        onChange={handleChangeAll}
                    />
                </div>
                {Array.from(uniqueData).sort().map((item) => (
                    <Checkbox
                        key={item}
                        id={`filter-list-${item}`}
                        label={String(item)}
                        checked={!columnFilter.has(item)}
                        onChange={() => handleChangeItem(item)}
                    />
                ))}
            </div>
        </>
    );
};

export default ColumnFilter;