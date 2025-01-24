import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { ReservationScheduledResponse } from "../../types/generalTypes";
import { modalitiesConstant } from "../../constants/Global";
import useIsMobile from "../../hooks/useIsMobile";

interface ScheduledHoursProps {
  reservations: ReservationScheduledResponse[];
  startHour?: number;
  endHour?: number;
}

const ScheduledHours = ({
  reservations,
  startHour = 12,
  endHour = 24,
}: ScheduledHoursProps) => {
  const theme = useTheme();
  const hasOnlyOneReservation = reservations.length === 1;
  const isMobile = useIsMobile();

  const courts = Array.from(
    new Set(reservations.map((reservation) => reservation.courtName))
  );

  const colors = [
    "#369BE5",
    "#7986CB",
    theme.palette.error.light,
    theme.palette.warning.light,
    theme.palette.success.light,
  ];

  const generateTimeBlocks = () => {
    const timeBlocks: string[] = [];
    for (let hour = startHour; hour < endHour; hour++) {
      timeBlocks.push(`${hour}:00`);
      timeBlocks.push(`${hour}:30`); // Adiciona o intervalo de 30 minutos
    }
    return timeBlocks;
  };

  const calculateGridRowSpan = (start: Date, end: Date) => {
    const startTotalMinutes = start.getHours() * 60 + start.getMinutes();
    const endTotalMinutes = end.getHours() * 60 + end.getMinutes();
    const durationMinutes = endTotalMinutes - startTotalMinutes;

    return Math.ceil(durationMinutes / 30);
  };

  const calculateGridRow = (time: Date) => {
    const totalMinutes = time.getHours() * 60 + time.getMinutes();
    const startMinutes = startHour * 60;
    const rowIndex = Math.floor((totalMinutes - startMinutes) / 30) + 1; // 30 minutos por linha
    return rowIndex;
  };

  return (
    <Box
      sx={{
        display: "grid",
        width: "100%",
        textAlign: "left",
        gridTemplateColumns: `70px repeat(${courts.length}, ${
          isMobile && !hasOnlyOneReservation ? "155px" : "1fr"
        })`,
        overflowX: isMobile ? "scroll" : "",
        gridTemplateRows: `repeat(${(endHour - startHour) * 2}, 0.7fr)`, // 2 linhas por hora (30min cada)
        position: "relative",
        borderRadius: 1,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {generateTimeBlocks().map((timeBlock, index) => (
        <Box
          key={index}
          sx={{
            gridRow: index + 1,
            zIndex: 2,
            borderTop: `1px solid ${theme.palette.divider}`,
            display: "flex",
            alignItems: "start",
            justifyContent: "start",
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "14px",
              paddingLeft: "10px",
              marginTop: "-10px",
              paddingRight: "5px",
              background: "#fff",
              zIndex: 1,
            }}
          >
            {timeBlock}
          </Typography>
        </Box>
      ))}

      {courts.map((court, index) => (
        <Box
          key={court}
          sx={{
            gridColumn: index + 2,
            gridRow: "1",
            textAlign: "center",
            padding: "3px",
            marginBottom: "10px",
            marginRight: "5px",
            height: "40%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors[index % colors.length],
            borderBottom: `1px solid ${theme.palette.divider}`,
            borderLeft:
              index !== 0 ? `1px solid ${theme.palette.divider}` : "none",
            color: theme.palette.getContrastText(colors[index % colors.length]),
          }}
        >
          <Typography variant={isMobile ? "subtitle2" : "subtitle1"}>
            {court}
          </Typography>
        </Box>
      ))}

      {courts.map((_, courtIndex) =>
        generateTimeBlocks().map((_, timeIndex) => (
          <Box
            key={`court-${courtIndex}-time-${timeIndex}`}
            sx={{
              gridColumn: courtIndex + 2,
              gridRow: timeIndex + 2,
              borderTop: `1px solid ${theme.palette.divider}`,
              position: "relative",
            }}
          />
        ))
      )}

      {reservations.map((reservation, index) => {
        const startDate = new Date(reservation.createdDate);
        const endDate = new Date(reservation.endDate);
        const startRow = calculateGridRow(startDate);
        const rowSpan = calculateGridRowSpan(startDate, endDate);
        const courtIndex = courts.indexOf(reservation.courtName);

        if (startRow < 0 || startRow >= (endHour - startHour) * 2) return null;

        return (
          <Box
            key={index}
            sx={{
              gridColumn: courtIndex + 2,
              gridRow: `${startRow} / span ${rowSpan}`,
              position: "relative",
              padding: "10px",
              backgroundColor: colors[courtIndex % colors.length],
              borderRadius: 1,
              marginBottom: "5px",
              marginRight: "5px",
              opacity: 0.9,
              color: theme.palette.getContrastText(
                colors[courtIndex % colors.length]
              ),
              zIndex: 1,
            }}
          >
            <Typography variant="body2">
              <strong>Cliente:</strong> {reservation.client}
            </Typography>
            <Typography variant="body2">
              <strong>Valor:</strong> R$ {reservation.price},00 |{" "}
              {modalitiesConstant[reservation.modality || 0]}
            </Typography>
            <Typography variant="body2">
              <strong>Horário:</strong> {startDate.getHours()}:
              {String(startDate.getMinutes()).padStart(2, "0")} às{" "}
              {endDate.getHours()}:
              {String(endDate.getMinutes()).padStart(2, "0")}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default ScheduledHours;
