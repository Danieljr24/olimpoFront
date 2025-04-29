// Importing React and the DataTable component from react-data-table-component
import React from 'react';
import DataTable from 'react-data-table-component';


// Defining the props for the DataTable Base component
interface DataTableBaseProps<T> {
    columns: any[]; // Setting up columns for the table, replace 'any' with a specific type if known
    data: T[]; // Array of objects to display in the table
    filterFunction?: (data: T[]) => T[]; // Optional function to filter the data
    pagination?: boolean; // Optional flag to enable/disable pagination
    responsive?: boolean; // Optional flag to enable/disable responsiveness
}

// Options for DataTable
const paginationOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };

// Defining the DataTable Base Component
const DataTableBase = <T extends {}>({ columns, data, filterFunction, pagination, responsive }: DataTableBaseProps<T>) => {
    // Applying filter function to data if provided
    const filteredData = filterFunction ? filterFunction(data) : data;

    // Rendering the DataTable component with the provided props
    return (
        <DataTable
            columns={columns} // Column configuration
            data={filteredData} // Filtered data to display
            pagination={pagination} // Pagination settings
            responsive={responsive} // Responsive Settings
            noDataComponent="No hay datos para mostrar" // configuration message when there is no data to display
            paginationComponentOptions={paginationOptions} // pagination options settings
            paginationRowsPerPageOptions={[8, 15, 25, 50]} // configuration options for numbers of rows to display
            paginationPerPage={8} // configuration number of rows to display when initializing the dataTable
        />
    );
};

// Exporting the DataTableBase component as the default export
export default DataTableBase;
