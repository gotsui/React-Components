import Table from "./_features/components/Table";

const TablePage = () => {
    const columnDefs = [
        {headerName: "Make", field: "make"},
        {headerName: "Model", field: "model"},
        {headerName: "Price", field: "price"}
    ];

    const rowData = [
        {make: "Toyota", model: "Celica", price: 35000},
        {make: "Ford", model: "Mondeo", price: 32000},
        {make: "Porsche", model: "Boxter", price: 72000}
    ];

    return (
        <div className="container mx-auto p-4">
            <div className="h-40">
                <Table columnDefs={columnDefs} rowData={rowData} caption="test" />
            </div>
        </div>
    );
};

export default TablePage;