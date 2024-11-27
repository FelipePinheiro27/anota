import React from "react";
import { Box, Typography } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { ReservationScheduledResponse } from "../../../types/generalTypes";

interface ReservationCardProps {
  reservation: ReservationScheduledResponse;
  onOpenModal: () => void;
}

const ReservationCard = ({
  reservation,
  onOpenModal,
}: ReservationCardProps) => {
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
              {reservation.createdDate}
            </Typography>
          </Box>
          <Typography fontSize={{ xs: "12px", md: "18px" }} fontWeight="600">
            Segunda Feira
          </Typography>
          <Typography fontSize={{ xs: "12px", md: "18px" }}>
            18:00 às 19:00
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
          onClick={onOpenModal}
          sx={{ fontSize: { xs: "22px", md: "34px" }, cursor: "pointer" }}
        />
      </Box>
    </Box>
  );
};

export default ReservationCard;
