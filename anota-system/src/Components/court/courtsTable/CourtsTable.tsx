import React from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { CourtTypes } from "../../../types/generalTypes";

interface Column {
  id: "name" | "description" | "detail";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: readonly Column[] = [
  { id: "name", label: "Nome", minWidth: 140 },
  { id: "description", label: "Descrição", minWidth: 140 },
  { id: "detail", label: "", minWidth: 100 },
];

interface CourtsTableProps {
  courts: CourtTypes[];
}

const CourtsTable = ({ courts }: CourtsTableProps) => {
  return (
    <Paper>
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
            {courts.map(
              (
                row: { [x: string]: any },
                index: React.Key | null | undefined
              ) => (
                <TableRow hover tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    if (column.id === "detail")
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{ color: "blue", cursor: "pointer" }}
                        >
                          <Button
                            variant="contained"
                            // fullWidth={isMobile}
                            sx={{
                              marginTop: { xs: "16px" },
                              padding: { xs: "12px 30px", md: "12px 30px" },
                              background: "#2AA137",
                              fontWeight: 600,
                              textTransform: "capitalize",
                            }}
                            onClick={() => {}}
                          >
                            Ver Detalhes
                          </Button>
                        </TableCell>
                      );

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CourtsTable;
