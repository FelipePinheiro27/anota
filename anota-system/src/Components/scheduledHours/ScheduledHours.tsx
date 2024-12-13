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
  startHour = 13,
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
    const timeBlocks = [""];
    for (let hour = startHour; hour < endHour; hour++) {
      timeBlocks.push(`${hour}:00`);
    }
    return timeBlocks;
  };

  const calculateGridRowSpan = (start: Date, end: Date) => {
    const startHour = start.getHours();
    const endHour = end.getHours();
    return endHour - startHour;
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
        gridTemplateRows: `repeat(${endHour - startHour}, 0.7fr)`,
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
        const startHourIdx = startDate.getHours() - startHour;
        const courtIndex = courts.indexOf(reservation.courtName);

        if (startHourIdx < 0 || startHourIdx >= endHour - startHour)
          return null;

        return (
          <Box
            key={index}
            sx={{
              gridColumn: courtIndex + 2,
              gridRow: `${startHourIdx + 2} / span ${calculateGridRowSpan(
                startDate,
                endDate
              )}`,
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
              <strong>Horário:</strong> {startDate.getHours()}:00 às{" "}
              {endDate.getHours()}:00
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default ScheduledHours;
