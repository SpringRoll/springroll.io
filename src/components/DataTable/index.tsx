import React from 'react';
import styles from './styles.module.scss';

interface Column {
  key: string;
  label: string;
}

export interface DataTableProps {
  columns: Column[];
  rows: Array<Record<string, any>>;
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
