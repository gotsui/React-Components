"use client";

import { useContext } from "react";

import Checkbox from "@/components/forms/Checkbox";
import { TableContext } from "../contexts/TableContext";

type ColumnFilterProps = {
    field: string;
};

const ColumnFilter = ({
    field,
}: ColumnFilterProps) => {
    const context = useContext(TableContext);

    if (!context) {
        throw new Error("ColumnFilter must be used within a Table");
    }

    const { getColumnFilterItems, setColumnFilterItems } = context;

    const handleChangeAll = () => {
        const items = getColumnFilterItems(field);
        const isCheckedAll = !items.some((item) => !item.checked);
        setColumnFilterItems(field, items.map((item) => ({ ...item, checked: !isCheckedAll })));
    };

    const handleChangeItem = (id: string) => {
        setColumnFilterItems(field, getColumnFilterItems(field).map((item) => item.id === id ? { ...item, checked: !item.checked } : item));
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
                        checked={!getColumnFilterItems(field).some((item) => !item.checked)}
                        onChange={handleChangeAll}
                    />
                </div>
                {getColumnFilterItems(field).map((item) => (
                    <Checkbox
                        key={item.id}
                        id={`filter-list-${item.value}`}
                        label={String(item.value)}
                        checked={item.checked}
                        onChange={() => handleChangeItem(item.id)}
                    />
                ))}
            </div>
        </>
    );
};

export default ColumnFilter;