"use client";

import Table from "@/components/table/Table";
import TableProvider from "@/components/table/TableProvider"
import { ColumnDef, Row } from "@/components/table/types";

const columnDefs: ColumnDef[] = [
    { label: "Make", field: "make", filter: true },
    { label: "Model", field: "model", filter: true },
    { label: "Price", field: "price", filter: true },
];

const rows: Row[] = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
];

const Template = () => {
    return (
        <TableProvider>
            <Table
                initialColumnDefs={columnDefs}
                initialRows={rows}
                caption="test"
            />
        </TableProvider>
    )
};

export default Template;