import React, { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import ClientHeader from "../../components/header/clientHeader/ClientHeader";
import TimeSlots from "../../components/timeSlots/TimeSlots";
import ModalitiesGroups from "../../components/modalitiesGroups/ModalitiesGroups";
import DateButton from "../../components/dateButton/DateButton";
import { Link } from "react-router-dom";
import { ClientReservationContext } from "../../context/ClientReservationProvider";

const Schedules = () => {
  const clientReservation = useContext(ClientReservationContext);
  const { selectedCourt } = clientReservation || {};
  const { name } = selectedCourt || {};

  return (
    <Box>
      <ClientHeader previewsPage="/reservas" />
      <Box sx={{ padding: "30px 40px", paddingBottom: "80px" }}>
        <Box margin="30px 0">
          <Typography
            sx={{ fontWeight: 600, letterSpacing: "0.2" }}
            fontSize="18px"
            color="#22303E"
          >
            {name}
          </Typography>
        </Box>
        <Box display="flex" margin="30px 0" gap="80px">
          <DateButton />
        </Box>
        <Box margin="30px 0">
          <Typography
            sx={{ fontWeight: 600, letterSpacing: "0.2" }}
            fontSize="16px"
            color="#22303E"
          >
            Escolha os Horários
          </Typography>
        </Box>
        <Box margin="0 30px">
          <Typography
            sx={{ fontWeight: 500, letterSpacing: "0.2" }}
            fontSize="14px"
            color="#22303E"
          >
            De 18:00 às 20:00
          </Typography>
          <br />
          <TimeSlots />
        </Box>
        <br />
        <Box margin="20px 0">
          <Typography
            sx={{ fontWeight: 600, letterSpacing: "0.2" }}
            fontSize="16px"
            color="#22303E"
          >
            Escolha a Modalidade
          </Typography>
        </Box>
        <Box margin="0 30px">
          <ModalitiesGroups />
        </Box>
        <Box sx={{ marginTop: { xs: "50px", md: "100px" } }}>
          <Link
            to={"/confirmacao"}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Button
              fullWidth
              variant="contained"
              sx={{
                padding: "12px",
                background: "#0C927D",
                "&.Mui-disabled": {
                  color: "#fff",
                  background: "#C4C4C4",
                },
                fontWeight: 550,
              }}
              onClick={() => {}}
            >
              Prosseguir
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Schedules;
