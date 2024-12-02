import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { ReservationScheduledResponse } from "../../types/generalTypes";
import { modalitiesConstant } from "../../constants/Global";

interface ScheduledHoursProps {
  reservations: ReservationScheduledResponse[];
  startHour?: number;
  endHour?: number;
}

const ScheduledHours = ({
  reservations,
  startHour = 13,
  endHour = 23,
}: ScheduledHoursProps) => {
  const theme = useTheme();

  const generateTimeBlocks = () => {
    const timeBlocks = [];
    for (let hour = startHour; hour < endHour; hour++) {
      timeBlocks.push(`${hour}:00 - ${hour + 1}:00`);
    }
    return timeBlocks;
  };

  const getReservationBlock = (hour: string) => {
    const matchingReservation = reservations.filter((reservation) => {
      const startDate = new Date(reservation.createdDate);
      const endDate = new Date(reservation.endDate);
      const startHour = startDate.getHours();
      const endHour = endDate.getHours();
      return hour >= `${startHour}:00` && hour < `${endHour}:00`;
    });

    if (matchingReservation.length === 0) return null;

    return (
      <Box display="flex" gap="10px">
        {matchingReservation.map((res, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: theme.palette.primary.light,
              padding: 1,
              borderRadius: 1,
              color: theme.palette.primary.contrastText,
              fontSize: "10px",
            }}
          >
            <Typography variant="body2">
              <strong>Cliente:</strong> {res?.client}
            </Typography>
            <Typography variant="body2">
              <strong>Quadra:</strong> {res?.courtName}
            </Typography>
            <Typography variant="body2">
              <strong>Valor:</strong> {res?.price} |{" "}
              {modalitiesConstant[res?.modality || 0]}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 1,
        // maxWidth: 400,
        margin: "0 auto",
      }}
    >
      {generateTimeBlocks().map((timeBlock, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: `1px solid ${theme.palette.divider}`,
            padding: 1,
            backgroundColor: theme.palette.background.paper,
            borderRadius: 1,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {timeBlock}
          </Typography>
          {getReservationBlock(timeBlock) || (
            <Typography variant="body2" color="text.secondary">
              Disponível
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default ScheduledHours;
