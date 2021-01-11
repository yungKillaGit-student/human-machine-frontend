import React, { useMemo } from "react";
import { ColumnConfig } from "../../../components/Table/types";
import Table from "../../../components/Table";

const DocumentsTable = () => {
  const columns: ColumnConfig[] = useMemo(() => {
    const result: ColumnConfig[] = [
      {
        key: "title",
        label: "Document"
      },
      {
        key: "day",
        label: "Day"
      },
      {
        key: "role.name",
        label: "For"
      }
    ];
    return result;
  }, []);

  return (
    <Table
      columns={columns}
      data={[]}
    />
  );
};

export default DocumentsTable;
