import { ReactNode } from "react";
import { TableInstance } from "react-table";

export interface CellRendererProps<T = Record<string, any>> {
  row: CellModel<T>;
  column: {
    Header: string;
    id: string;
  };
  value: string;
  data: T[];
  id: string | number;
}

export interface CellModel<T = Record<string, any>> {
  id: number | string;
  index: number;
  original: T;
}

export interface TableStyle {
  minHeight?: number | string;
  maxHeight?: number | string;
  width?: string;
}

export interface ColumnConfig<T = Record<string, any>> {
  key: string;
  label?: string;
  sortable?: boolean;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  cellRenderer?(props: CellRendererProps<T>): ReactNode;
  headerRenderer?(props: CellRendererProps<T>): ReactNode;
  isHidden?: boolean;
  meta?: any;
  accessorFunction?(originalRow: T): any;
}

export interface TableProps<T extends object = any> {
  columns: ColumnConfig[];
  data: T[];
  defaultColumn?: {
    minWidth?: number;
    width?: number;
    maxWidth?: number;
  };
  minRows?: number;
  style?: TableStyle;
  name?: string;
}

export interface TableBodyProps<T extends object = any> {
  tableInstance: TableInstance<T>;
  tableStyle?: TableStyle;
  minRows?: number;
  name?: string;
}
