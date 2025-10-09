import Table from "./_features/components/Table";
import { ColumnDef, Row } from "./_features/types/table";

const TablePage = () => {
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

    return (
        <div className="container mx-auto p-4">
            <div className="h-40">
                <Table columnDefs={columnDefs} rows={rows} caption="test" />
            </div>
        </div>
    );
};

export default TablePage;