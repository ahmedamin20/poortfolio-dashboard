import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";

// Define prop types
interface CustomTableProps<T> {
  buttons?: React.ReactNode[]; // Buttons will be an array of React elements
  title?: string;
  columns: TableColumn<T>[]; // Columns will be an array of TableColumn objects
  data: T[]; // Data will be an array of the generic type T
}

const CustomTable = <T,>({ buttons = [], title = '', columns, data }: CustomTableProps<T>) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <div>{buttons.map((button, index) => <span key={index}>{button}</span>)}</div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <DataTable
          columns={columns}
          data={data} // Your data goes here
          pagination
        />
      </div>
    </div>
  );
};

export default CustomTable;
