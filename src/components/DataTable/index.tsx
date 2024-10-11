import React from 'react';
import styles from './styles.module.scss';


// A table column
export interface Column {
  key: string;
  label: string;
}
// A table row
export interface Row {
  key: string;
  value: string | number;
}
// A collection of table columns and rows
export interface DataTableProps {
  columns: Column[];
  rows: Row[];
}

/**
 * DataTable - A component that takes in column definitions and row data to render an output table
 * @param DataTableProps - Column and row data
 * @returns JSX.Element
 */
export default function DataTable({ columns, rows }: DataTableProps): JSX.Element {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.dataTable}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td key={column.key}>{row[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
