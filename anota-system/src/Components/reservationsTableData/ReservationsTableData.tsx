import React, { useEffect, useState } from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import DateButton from "../dateButton/DateButton";
import dayjs, { Dayjs } from "dayjs";
import { ReservationScheduledResponse } from "../../types/generalTypes";
import {
  getReservationsByDate,
  removeReservation,
} from "../../api/ReservationsAPI";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import NoData from "../noData/NodaData";
import ScheduledHours from "../scheduledHours/ScheduledHours";
import ConfirmationDeleteModal from "../confirmationModal/ConfirmationDeleteModal";
import ReservationsTable from "../tables/reservationsTable/ReservationsTable";

const ReservationsTableData = () => {
  const [date, setDate] = useState(dayjs());
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [reservations, setReservations] = useState<
    ReservationScheduledResponse[]
  >([]);
  const [reservationToRemove, setReservationToRemove] = useState<
    ReservationScheduledResponse | undefined
  >();
  const [isLoading, setIsLoading] = useState(true);
  const [calendarView, setCalendarView] = useState(true);
  const [companyId, setCompanyId] = useState<string | number>(0);

  const handleDateChange = (value: Dayjs | null) => {
    if (value) {
      setDate(value);
    }
  };

  const fetchReservations = async () => {
    setIsLoading(true);
    const value = localStorage.getItem("userSession");
    const companyData: { companyId?: string | number } = JSON.parse(
      value || ""
    );
    const companyIdValue = companyData?.companyId || 0;
    setCompanyId(companyIdValue);
    
    const reservationsData = await getReservationsByDate(
      companyIdValue,
      date.format("YYYY-MM-DD")
    );
    setIsLoading(false);
    setReservations(reservationsData);
  };

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
    fetchReservations();
  }, [date]);

  return (
    <>
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
            <ScheduledHours
              reservations={reservations}
              displayedDate={date.toDate()}
              companyId={companyId}
              onReservationUpdate={fetchReservations}
            />
          ) : (
            <ReservationsTable
              reservations={reservations}
              onSelectReservation={onSelectReservation}
            />
          )}
        </Box>
      )}
      <ConfirmationDeleteModal
        open={confirmationModal}
        closeModal={onCloseConfirmationModal}
        reservationToRemove={reservationToRemove}
        onRemoveReservation={onRemoveReservation}
      />
    </>
  );
};

export default ReservationsTableData;
