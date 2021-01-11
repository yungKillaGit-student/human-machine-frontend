import React, {
  useMemo,
  CSSProperties
} from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import MaterialTableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { TableBodyProps, TableStyle } from "./types";
import { fontSize } from "../../assets/themeConfig";

const border = "1px solid white";

const useStyles = (tableStyle?: TableStyle, areColumnsExist = true) => makeStyles((theme: Theme) => ({
  tableContainer: {
    height: "100%",
    borderTop: areColumnsExist ? "" : border,
    minHeight: tableStyle?.minHeight || "35vh",
    maxHeight: tableStyle?.maxHeight || "100%",
    width: tableStyle?.width || "100%",
    overflow: "hidden",
    overflowX: "auto",
    "-moz-user-select": "none",
    "-khtml-user-select": "none",
    "-webkit-user-select": "none",
    "-ms-user-select": "none",
    "user-select": "none"
  },
  hover: {
    "&:hover": {
      backgroundColor: "#CFDCEF !important"
    }
  },
  header: {
    backgroundColor: "#47c",
    position: "sticky",
    top: 0,
    zIndex: 1,
    alignSelf: "flex-start",
    "&>th": {
      color: "white"
    }
  },
  emptyRow: {
    display: "flex",
    flex: "1 0 auto",
    borderBottom: border
  },
  tableBody: {
    width: "100%",
    height: "100%",
    "&>tr:nth-child(even)": {
      backgroundColor: "#fff"
    },
    "&>tr:nth-child(odd)": {
      backgroundColor: "#ddf"
    }
  },
  table: {
    width: "100%",
    height: "100%",
    minHeight: tableStyle?.minHeight || "35vh",
    maxHeight: tableStyle?.maxHeight || "100%",
    borderLeft: border,
    borderRight: border,
    borderBottom: border
  },
  tableCell: {
    borderLeft: border,
    borderRight: border
  }
}));

function TableBody<T extends object = any> ({
  tableInstance,
  tableStyle,
  minRows,
  name
}: TableBodyProps<T>) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    columns
  } = tableInstance;

  const classes = useStyles(tableStyle, columns.length !== 0)();

  const emptyRows = useMemo(() => {
    if (minRows && minRows > rows.length) {
      const rowsArray = Array(minRows - rows.length).fill(null);
      return rowsArray.map((value, index) => (
        <TableRow className={classes.emptyRow} key={`empty-row-${index}`}>
          {
            columns.map(column => {
              const cellStyle: CSSProperties = {
                boxSizing: "border-box",
                flex: `${column.width} 0 auto`,
                width: column.width
              };
              return (
                <TableCell
                  size="medium"
                  style={cellStyle}
                  key={column.id}
                  classes={{ body: classes.tableCell }}
                />
              );
            })
          }
        </TableRow>
      ));
    }
    return null;
  }, [classes.emptyRow, classes.tableCell, columns, minRows, rows.length]);

  return (
    <TableContainer className={classes.tableContainer}>
      <Table {...getTableProps({ className: classes.table })}>
        <TableHead>
          {
            headerGroups.map(headerGroup => (
              // eslint-disable-next-line react/jsx-key
              <TableRow {...headerGroup.getHeaderGroupProps()} className={classes.header}>
                {
                  headerGroup.headers.map(column => {
                    const columnHeaderProps: any = column.getHeaderProps();
                    delete columnHeaderProps.title;
                    delete columnHeaderProps.style.cursor;

                    return (
                      <TableCell
                        {...columnHeaderProps}
                        size="small"
                        key={column.id}
                        classes={{ body: classes.tableCell, head: classes.tableCell }}
                      >
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          fontWeight="normal"
                          fontSize={fontSize}
                        >
                          {
                            column.render("Header")
                          }
                        </Box>
                      </TableCell>
                    );
                  })
                }
              </TableRow>
            ))
          }
        </TableHead>
        <MaterialTableBody {...getTableBodyProps({ className: classes.tableBody })}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              // eslint-disable-next-line react/jsx-key
              <TableRow className={classes.hover} {...row.getRowProps()}>
                {
                  row.cells.map(cell => {
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <TableCell
                        size="medium"
                        {...cell.getCellProps()}
                        classes={{ body: classes.tableCell }}
                      >
                        <Typography>
                          { cell.render("Cell") }
                        </Typography>
                      </TableCell>
                    );
                  })
                }
              </TableRow>
            );
          })}
          { emptyRows }
        </MaterialTableBody>
      </Table>
    </TableContainer>
  );
}

export default TableBody;
