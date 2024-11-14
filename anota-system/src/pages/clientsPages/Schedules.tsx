import { Box, Button, Typography } from "@mui/material";
import React from "react";
import ClientHeader from "../../components/header/clientHeader/ClientHeader";
import TimeSlots from "../../components/timeSlots/TimeSlots";
import DateButton from "../../components/dateButton/DateButton";
import GeneralButton from "../../components/buttons/generalButton/GeneralButton";

const Schedules = () => {
  return (
    <Box sx={{ padding: "30px 40px" }}>
      <ClientHeader />
      <Box margin="30px 0">
        <Typography
          sx={{ fontWeight: 600, letterSpacing: "0.2" }}
          fontSize="18px"
          color="#22303E"
        >
          Quadra 01
        </Typography>
      </Box>
      <Box display="flex" margin="30px 0" gap="80px">
        {/* <Button
          variant="contained"
          fullWidth
          sx={{
            padding: "12px",
            background: "#0C927D",
            fontWeight: 550,
          }}
          onClick={() => {}}
        >
          Hoje
        </Button> */}
        <GeneralButton text="HOJE" />
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
      <Box margin="0 30px" textAlign="center">
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
      <Box margin="30px 30px">
        <Button
          fullWidth
          disabled
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
      </Box>
    </Box>
  );
};

export default Schedules;
