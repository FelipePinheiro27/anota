import React, { useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TableSortLabel,
  useTheme,
} from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { ReservationScheduledResponse } from "../../../types/generalTypes";
import useIsMobile from "../../../hooks/useIsMobile";
import { modalitiesConstant } from "../../../constants/Global";

interface Column {
  id:
    | "client"
    | "clientPhone"
    | "courtName"
    | "modality"
    | "price"
    | "date"
    | "time"
    | "delete";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: readonly Column[] = [
  { id: "client", label: "Cliente", minWidth: 170 },
  { id: "clientPhone", label: "Número do Cliente", minWidth: 140 },
  { id: "courtName", label: "Quadra", minWidth: 170 },
  { id: "modality", label: "Modalidade", minWidth: 100 },
  { id: "price", label: "Valor", minWidth: 100 },
  { id: "date", label: "Data", minWidth: 100 },
  { id: "time", label: "Horário", minWidth: 140 },
  { id: "delete", label: "", minWidth: 30 },
];

type ReservationType = {
  id: string | number | undefined;
  client: string;
  clientPhone: string;
  courtName: string;
  modality: string;
  price: string;
  date: string;
  time: string;
  dateTime: Date;
  delete: any;
};

interface ReservationsTableProps {
  reservations: ReservationScheduledResponse[];
  onSelectReservation: (reservation?: string | number) => void;
}

const ReservationsTable = ({
  reservations,
  onSelectReservation,
}: ReservationsTableProps) => {
  const theme = useTheme();
  const isMobile = useIsMobile();
  const [orderBy, setOrderBy] = useState<keyof ReservationType>("dateTime");
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc");

  const reservationsParsed: ReservationType[] = reservations.map(
    (reservation) => {
      const date = new Date(reservation.createdDate);
      const endDate = new Date(reservation.endDate);
      const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`;

      const formattedTime = `${date.getHours()}:00 às ${endDate.getHours()}:00`;

      return {
        id: reservation.id,
        client: reservation.client,
        clientPhone: reservation.clientPhone.replace(
          /^(\d{2})(\d{5})(\d{4})$/,
          "($1) $2-$3"
        ),
        courtName: reservation.courtName,
        modality: modalitiesConstant[reservation.modality],
        price: `R$ ${reservation.price},00`,
        date: formattedDate,
        time: formattedTime,
        dateTime: date,
        delete: (
          <DeleteOutlinedIcon
            onClick={() => onSelectReservation(reservation.id)}
            sx={{
              fontSize: "24px",
              cursor: "pointer",
            }}
          />
        ),
      };
    }
  );

  const handleSort = (column: keyof ReservationType) => {
    const isAsc = orderBy === column && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    setOrderBy(column);
  };

  const sortedReservations = [...reservationsParsed].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return orderDirection === "asc" ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return orderDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <>
      {isMobile ? (
        <Box>
          {sortedReservations.map((reservation, index) => (
            <Paper
              key={index}
              sx={{
                marginBottom: 2,
                padding: 2,
                backgroundColor: theme.palette.background.default,
                color: "#22303E",
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="subtitle1">
                    <strong>Cliente:</strong> {reservation.client}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Telefone:</strong> {reservation.clientPhone}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Quadra:</strong> {reservation.courtName}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Modalidade:</strong> {reservation.modality}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Valor:</strong> {reservation.price}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Data:</strong> {reservation.date}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Horário:</strong> {reservation.time}
                  </Typography>
                </Box>
                <DeleteOutlinedIcon
                  onClick={() => {
                    onSelectReservation(reservation.id);
                  }}
                  sx={{
                    fontSize: "34px",
                    cursor: "pointer",
                  }}
                />
              </Box>
            </Paper>
          ))}
        </Box>
      ) : (
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
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={
                          orderBy === column.id ? orderDirection : "asc"
                        }
                        onClick={() => handleSort(column.id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedReservations.map((row, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </>
  );
};

export default ReservationsTable;
