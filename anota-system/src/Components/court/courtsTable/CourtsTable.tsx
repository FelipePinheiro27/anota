import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { CourtTypes } from "../../../types/generalTypes";
import DetailsCourt from "../detailsCourt/DetailsCourt";

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
  refetchCourts: () => Promise<void>;
}

const CourtsTable = ({ courts, refetchCourts }: CourtsTableProps) => {
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
                          <DetailsCourt
                            court={row as CourtTypes}
                            refetchCourts={refetchCourts}
                          />
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
