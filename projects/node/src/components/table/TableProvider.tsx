"use client";

import RowsProvider from "./RowsProvider";
import ColumnDefsProvider from "./ColumnDefsProvider";
import FilterProvider from "./FilterProvider";

type TableProviderProps = {
    children: React.ReactNode;
};

const TableProvider = ({
    children,
}: TableProviderProps) => {
    return (
        <RowsProvider>
            <ColumnDefsProvider>
                <FilterProvider>
                    {children}
                </FilterProvider>
            </ColumnDefsProvider>
        </RowsProvider>
    );
};

export default TableProvider;