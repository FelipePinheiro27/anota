import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import ClientHeader from "../../components/header/clientHeader/ClientHeader";
import TimeSlots from "../../components/timeSlots/TimeSlots";
import ScheduleDate from "../../components/scheduleDate/ScheduleDate";
import { DateButtonTypes } from "../../types/generalTypes";
import ModalitiesGroups from "../../components/modalitiesGroups/ModalitiesGroups";

const Schedules = () => {
  const [dateType, setDateType] = useState<DateButtonTypes>("today");

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
      <ScheduleDate dateType={dateType} setDateType={setDateType} />
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
      <Box margin="30px 0">
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
      </Box>
    </Box>
  );
};

export default Schedules;
