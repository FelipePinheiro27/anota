import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Header from "../../Components/header/Header";
import { getReservationsByDate } from "../../api/ReservationsAPI";
import dayjs, { Dayjs } from "dayjs";
import DateButton from "../../Components/dateButton/DateButton";
import { ReservationScheduledResponse } from "../../types/generalTypes";
import NoData from "../../Components/noData/NodaData";
import ScheduledHours from "../../Components/scheduledHours/ScheduledHours";

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
      const value = localStorage.getItem("userSession");
      const companyData: { companyId?: string | number } = JSON.parse(
        value || ""
      );
      const reservationsData = await getReservationsByDate(
        companyData?.companyId || 0,
        date.format("YYYY-MM-DD")
      );
      setReservations(reservationsData);
    };

    fetchReservations();
  }, [date]);

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
        {reservations.length === 0 ? (
          <NoData
            title="Sem Horários Reservados"
            description="Esta data não possui horários reservados"
          />
        ) : (
          <Box sx={{ paddingTop: "30px" }}>
            <ScheduledHours reservations={reservations} />
            {/* <ReservationsTable reservations={reservations} /> */}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Company;
