import React from "react";
import { Box, Typography } from "@mui/material";
import Header from "../../components/header/Header";
import ReservationsTable from "../../components/tables/reservationsTable/ReservationsTable";
import DateRangeButton from "../../components/dateButton/dateRangeButton/DateRangeButton";

const Company = () => {
  return (
    <Box>
      <Header />
      <Box sx={{ padding: "30px 40px" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            sx={{ fontWeight: 600, letterSpacing: "0.2" }}
            fontSize="18px"
            color="#22303E"
          >
            Agendamentos Realizados
          </Typography>
          <DateRangeButton />
        </Box>
        <Box sx={{ paddingTop: "30px" }}>
          <ReservationsTable />
        </Box>
      </Box>
    </Box>
  );
};

export default Company;
