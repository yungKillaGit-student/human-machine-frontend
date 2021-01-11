import React, { useMemo } from "react";
import { useFlexLayout, useTable } from "react-table";
import { TableProps } from "./types";
import TableBody from "./TableBody";

const defaultCellRenderer = ({ value }: any) => value;

function Table<T extends object = any> ({
  columns,
  data,
  defaultColumn,
  style,
  minRows = 9,
  name
}: TableProps<T>) {
  const [tableColumns, hiddenColumns] = useMemo(() => {
    const visibleColumns: any[] = [];
    const hiddenColumns: string[] = [];
    columns.forEach(x => {
      if (x.isHidden) {
        hiddenColumns.push(x.key);
      }
      else {
        const column: any = {
          accessor: x.accessorFunction ?? x.key as keyof T,
          Header: x.headerRenderer ?? x.label,
          Cell: x.cellRenderer ?? defaultCellRenderer,
          disableSortBy: x.sortable ?? false
        };
        if (x.width) {
          column.width = x.width;
        }
        visibleColumns.push(column);
      }
    });
    return [visibleColumns, hiddenColumns];
  }, [columns]);

  const tableInstance = useTable<T>(
    {
      columns: tableColumns,
      data,
      defaultColumn,
      disableSortRemove: true,
      autoResetSortBy: !!(data && data.length),
      initialState: {
        hiddenColumns
      }
    },
    useFlexLayout
  );

  return (
    <TableBody
      tableInstance={tableInstance}
      tableStyle={style}
      minRows={minRows}
      name={name}
    />
  );
}

export default Table;
