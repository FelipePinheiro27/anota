import {
  Box,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import ClientHeader from "../../components/header/clientHeader/ClientHeader";
import ReservationCard from "../../components/reservations/reservationCard/ReservationCard";
import useIsMobile from "../../hooks/useIsMobile";

const MyReservations = () => {
  const isMobile = useIsMobile();
  return (
    <Box>
      <ClientHeader previewsPage="/" />

      <Box sx={{ padding: { xs: "10px 10px", md: "30px 40px" } }}>
        <Box margin={"30px 0"}>
          <Typography
            sx={{ fontWeight: 600, letterSpacing: "0.2" }}
            fontSize="18px"
            color="#22303E"
          >
            Meus Agendamentos
          </Typography>
        </Box>
        <Box
          marginTop="40px"
          display={{ xs: "block", md: "flex" }}
          alignItems="end"
          gap="50px"
        >
          <FormControl sx={{ width: { xs: "100%", md: "40%" } }}>
            <FormLabel>Código da Reserva ou Número do Responsável </FormLabel>
            <TextField
              id="cod"
              type="text"
              fullWidth
              name="cod"
              placeholder=""
              variant="outlined"
            />
          </FormControl>
          <Button
            variant="contained"
            fullWidth={isMobile}
            sx={{
              marginTop: { xs: "16px" },
              padding: { xs: "12px 30px", md: "16px 48px" },
              background: "#E45609",
              fontWeight: 600,
            }}
            onClick={() => {}}
          >
            Buscar
          </Button>
        </Box>
        <Box marginTop="40px">
          <ReservationCard />
        </Box>
      </Box>
    </Box>
  );
};

export default MyReservations;
