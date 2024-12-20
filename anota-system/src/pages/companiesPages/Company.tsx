import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Header from "../../Components/header/Header";
import {
  getReservationsByDate,
  removeReservation,
} from "../../api/ReservationsAPI";
import dayjs, { Dayjs } from "dayjs";
import DateButton from "../../Components/dateButton/DateButton";
import { ReservationScheduledResponse } from "../../types/generalTypes";
import NoData from "../../Components/noData/NodaData";
import ScheduledHours from "../../Components/scheduledHours/ScheduledHours";
import ReservationsTable from "../../Components/tables/reservationsTable/ReservationsTable";
import LoadingSpinner from "../../Components/loadingSpinner/LoadingSpinner";
import ConfirmationDeleteModal from "../../Components/confirmationModal/ConfirmationDeleteModal";

const Company = () => {
  const [date, setDate] = useState(dayjs());
  const [reservations, setReservations] = useState<
    ReservationScheduledResponse[]
  >([]);
  const [reservationToRemove, setReservationToRemove] = useState<
    ReservationScheduledResponse | undefined
  >();
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [calendarView, setCalendarView] = useState(true);

  const onSelectReservation = (reservationId?: string | number) => {
    const reservationValue = reservations.find(
      (res) => res.id === reservationId
    );
    setReservationToRemove(reservationValue);
    setConfirmationModal(true);
  };

  const onCloseConfirmationModal = () => {
    setConfirmationModal(false);
  };

  const handleDateChange = (value: Dayjs | null) => {
    if (value) {
      setDate(value);
    }
  };

  const onRemoveReservation = async () => {
    if (reservationToRemove?.id) {
      await removeReservation(reservationToRemove.id);
      setReservations(
        reservations.filter((res) => res.id !== reservationToRemove.id)
      );
      onCloseConfirmationModal();
    }
  };

  useEffect(() => {
    const fetchReservations = async () => {
      setIsLoading(true);
      const value = localStorage.getItem("userSession");
      const companyData: { companyId?: string | number } = JSON.parse(
        value || ""
      );
      const reservationsData = await getReservationsByDate(
        companyData?.companyId || 0,
        date.format("YYYY-MM-DD")
      );
      setIsLoading(false);
      setReservations(reservationsData);
    };

    fetchReservations();
  }, [date]);

  return (
    <Box>
      <Header />
      <Box sx={{ padding: { xs: "30px 10px ", md: "30px 40px" } }}>
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
          <Box
            display="flex"
            width="100%"
            justifyContent="space-between"
            alignItems="center"
          >
            <DateButton date={date} handleDateChange={handleDateChange} />
            <Box display="flex" gap={1}>
              <Tooltip title="Visão em Calendário">
                <IconButton
                  onClick={() => setCalendarView(true)}
                  color={calendarView ? "primary" : "default"}
                >
                  <CalendarMonthOutlinedIcon fontSize="large" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Visão em Lista">
                <IconButton
                  onClick={() => setCalendarView(false)}
                  color={!calendarView ? "primary" : "default"}
                >
                  <FormatListBulletedIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
        {reservations.length === 0 ? (
          isLoading ? (
            <Box marginTop="180px">
              <LoadingSpinner />
            </Box>
          ) : (
            <NoData
              title="Sem Horários Reservados"
              description="Esta data não possui horários reservados"
            />
          )
        ) : (
          <Box sx={{ paddingTop: "30px" }}>
            {calendarView ? (
              <ScheduledHours reservations={reservations} />
            ) : (
              <ReservationsTable
                reservations={reservations}
                onSelectReservation={onSelectReservation}
              />
            )}
          </Box>
        )}
      </Box>
      <ConfirmationDeleteModal
        open={confirmationModal}
        closeModal={onCloseConfirmationModal}
        reservationToRemove={reservationToRemove}
        onRemoveReservation={onRemoveReservation}
      />
    </Box>
  );
};

export default Company;
