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
  markReservationAsPaid,
} from "../../api/ReservationsAPI";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import NoData from "../noData/NodaData";
import ScheduledHours from "../scheduledHours/ScheduledHours";
import ConfirmationDeleteModal from "../confirmationModal/ConfirmationDeleteModal";
import ReservationsTable from "../tables/reservationsTable/ReservationsTable";
import { Snackbar, Alert } from "@mui/material";

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
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    severity: "info",
  });

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

  const onTogglePaid = async (id: string | number, currentPaid: boolean) => {
    try {
      await markReservationAsPaid(id, !currentPaid);
      setReservations((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, isPaid: !currentPaid } : r
        )
      );
      setSnackbar({
        open: true,
        message: !currentPaid ? "Reserva marcada como paga!" : "Reserva marcada como não paga!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Erro ao atualizar status de pagamento.",
        severity: "error",
      });
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
              setReservations={setReservations}
              displayedDate={date.toDate()}
              companyId={companyId}
              onReservationUpdate={fetchReservations}
            />
          ) : (
            <ReservationsTable
              reservations={reservations}
              onSelectReservation={onSelectReservation}
              onTogglePaid={onTogglePaid}
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
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ReservationsTableData;
