import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Header from "../../components/header/Header";
import ReservationsTable from "../../components/tables/reservationsTable/ReservationsTable";
import { getReservationsByDate } from "../../api/ReservationsAPI";
import dayjs, { Dayjs } from "dayjs";
import DateButton from "../../components/dateButton/DateButton";
import { ReservationScheduledResponse } from "../../types/generalTypes";

const Company = () => {
  const [date, setDate] = useState(dayjs());
  const [reservations, setReservations] = useState<
    ReservationScheduledResponse[]
  >([]);

  const handleDateChange = (value: Dayjs | null) => {
    if (value) {
      setDate(value);
    }
  };

  useEffect(() => {
    const fetchReservations = async () => {
      const reservationsData = await getReservationsByDate(
        date.format("YYYY-MM-DD")
      );
      setReservations(reservationsData);
    };

    fetchReservations();
  }, [date]);

  console.log(reservations);

  return (
    <Box>
      <Header />
      <Box sx={{ padding: { xs: "30px 10px", md: "30px 40px" } }}>
        <Box
          display="flex"
          flexDirection={{ xs: "column" }}
          justifyContent="space-between"
          textAlign="center"
          alignItems="start"
        >
          <Typography
            sx={{ fontWeight: 600, letterSpacing: "0.2" }}
            fontSize="18px"
            color="#22303E"
          >
            Agendamentos Realizados
          </Typography>
          <DateButton date={date} handleDateChange={handleDateChange} />
        </Box>
        <Box sx={{ paddingTop: "30px" }}>
          <ReservationsTable reservations={reservations} />
        </Box>
      </Box>
    </Box>
  );
};

export default Company;
