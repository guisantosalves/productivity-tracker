import React from "react";
import { LoadingSpinner } from "./LoadingSpinner";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  className?: string;
  loading?: boolean;
}

export function Table<T extends object>({
  columns,
  data = [],
  emptyMessage = "Nenhum dado encontrado.",
  className = "",
  loading = false,
}: TableProps<T>) {
  const rows = data ?? [];
  const getNestedValue = (obj: unknown, path: string): unknown => {
    // entra ao máximo dentro do nested value
    // acc -> resultado | key -> valor curr do split
    // vai retornando até acabar as keys
    return path.split(".").reduce((acc, key) => {
      if (acc !== null && acc !== undefined && typeof acc === "object") {
        return (acc as Record<string, unknown>)[key];
      }
      return undefined;
    }, obj);
  };

  const getCellValue = (row: T, col: Column<T>): React.ReactNode => {
    if (col.render) return col.render(row);
    const value = getNestedValue(row, String(col.key));
    return value !== undefined && value !== null ? String(value) : "—";
  };

  return (
    <div className={`w-full overflow-x-auto rounded-lg border border-[var(--border)] ${className}`}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--border)] bg-[var(--card)]">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="px-4 py-3 text-left font-semibold text-[var(--muted-foreground)] tracking-wide"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center"
              >
                <div className="flex justify-center">
                  <LoadingSpinner size="md" />
                </div>
              </td>
            </tr>
          ) : rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center text-[var(--muted-foreground)]"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--card)] transition-colors"
              >
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-3">
                    {getCellValue(row, col)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
