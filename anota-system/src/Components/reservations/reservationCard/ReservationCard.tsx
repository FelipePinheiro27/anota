import React from "react";
import { Box, Typography } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { ReservationScheduledResponse } from "../../../types/generalTypes";
import {
  formatDate,
  formatTime,
  getDayOfWeek,
} from "../../../utils/generalUtil";

interface ReservationCardProps {
  reservation: ReservationScheduledResponse;
  onOpenModal: () => void;
  setReservationToRemove: React.Dispatch<
    React.SetStateAction<ReservationScheduledResponse | undefined>
  >;
}

const ReservationCard = ({
  reservation,
  onOpenModal,
  setReservationToRemove,
}: ReservationCardProps) => {
  const date = formatDate(reservation.createdDate);
  const dayOfWeek = getDayOfWeek(reservation.createdDate);
  const startTime = formatTime(reservation.createdDate);
  const endTime = formatTime(reservation.endDate);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      border="1px solid #CCCCCC"
      color="#22303E"
      height="110px"
    >
      <Box position="relative">
        <Box marginLeft={{ xs: "10px", md: "20px" }}>
          <Box position="absolute" top={-28} left={5}>
            <Typography fontSize={{ xs: "12px", md: "16px" }} fontWeight="600">
              {date}
            </Typography>
          </Box>
          <Typography fontSize={{ xs: "12px", md: "18px" }} fontWeight="600">
            {dayOfWeek}
          </Typography>
          <Typography fontSize={{ xs: "12px", md: "18px" }}>
            {startTime} às {endTime}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography
          sx={{ fontSize: { xs: "12px", md: "20px" } }}
          fontWeight={300}
        >
          Reserva para {reservation.courtName}
        </Typography>
        <Typography
          sx={{ fontSize: { xs: "12px", md: "20px" } }}
          fontWeight={300}
        >
          Valor: R$ {reservation.price},00
        </Typography>
      </Box>
      <Box marginRight={{ xs: "10px", md: "40px" }}>
        <DeleteOutlinedIcon
          onClick={() => {
            setReservationToRemove(reservation);
            onOpenModal();
          }}
          sx={{ fontSize: { xs: "22px", md: "34px" }, cursor: "pointer" }}
        />
      </Box>
    </Box>
  );
};

export default ReservationCard;
