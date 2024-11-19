import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

interface Column {
  id: "client" | "court" | "value" | "date" | "schedule";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "client", label: "Cliente", minWidth: 170 },
  { id: "court", label: "Quadra", minWidth: 170 },
  { id: "value", label: "Valor", minWidth: 170 },
  { id: "date", label: "Data", minWidth: 170 },
  { id: "schedule", label: "Horário", minWidth: 170 },
];

interface Data {
  client: string;
  court: string;
  value: string;
  date: string;
  schedule: string;
}

function createData(
  client: string,
  court: string,
  value: string,
  date: string,
  schedule: string
): Data {
  return { client, court, value, date, schedule };
}

const rows = [
  createData("Felipe", "1", "60", "17/10/2024", "10:00 às 12:00 "),
  createData("Luan", "1", "60", "17/10/2024", "10:00 às 12:00 "),
  createData("Felipe", "1", "60", "17/10/2024", "10:00 às 12:00 "),
  createData("Felipe", "1", "60", "17/10/2024", "10:00 às 12:00 "),
  createData("Felipe", "1", "60", "17/10/2024", "10:00 às 12:00 "),
  createData("Felipe", "1", "60", "17/10/2024", "10:00 às 12:00 "),
  createData("Felipe", "1", "60", "17/10/2024", "10:00 às 12:00 "),
  createData("Felipe", "1", "60", "17/10/2024", "10:00 às 12:00 "),
  createData("Felipe", "1", "60", "17/10/2024", "10:00 às 12:00 "),
  createData("Felipe", "1", "60", "17/10/2024", "10:00 às 12:00 "),
  createData("Felipe", "1", "60", "17/10/2024", "10:00 às 12:00 "),
  createData("Felipe", "1", "60", "17/10/2024", "10:00 às 12:00 "),
];

const ReservationsTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: 600 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
};

export default ReservationsTable;
