import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FilterListIcon from "@mui/icons-material/FilterList";
import DateButton from "../dateButton/DateButton";
import dayjs, { Dayjs } from "dayjs";
import {
  ReservationScheduledResponse,
  CourtTypes,
} from "../../types/generalTypes";
import {
  getReservationsByDate,
  removeReservation,
  markReservationAsPaid,
} from "../../api/ReservationsAPI";
import { getCourtsByCompany } from "../../api/CourtAPI";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import NoData from "../noData/NodaData";
import ScheduledHours from "../scheduledHours/ScheduledHours";
import ConfirmationDeleteModal from "../confirmationModal/ConfirmationDeleteModal";
import ReservationsTable from "../tables/reservationsTable/ReservationsTable";
import { Snackbar, Alert } from "@mui/material";
import useIsMobile from "../../hooks/useIsMobile";

const ReservationsTableData = () => {
  const [date, setDate] = useState(dayjs());
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [reservations, setReservations] = useState<
    ReservationScheduledResponse[]
  >([]);
  const [allReservations, setAllReservations] = useState<
    ReservationScheduledResponse[]
  >([]);
  const [reservationToRemove, setReservationToRemove] = useState<
    ReservationScheduledResponse | undefined
  >();
  const [isLoading, setIsLoading] = useState(true);
  const [calendarView, setCalendarView] = useState(true);
  const [companyId, setCompanyId] = useState<string | number>(0);
  const [courts, setCourts] = useState<CourtTypes[]>([]);
  const [selectedCourts, setSelectedCourts] = useState<string[]>([]);
  const [showCourtFilter, setShowCourtFilter] = useState(true);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    severity: "info",
  });

  const isMobile = useIsMobile();

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
    setAllReservations(reservationsData);
    setReservations(reservationsData);
  };

  const fetchCourts = async () => {
    const value = localStorage.getItem("userSession");
    const companyData: { companyId?: string | number } = JSON.parse(
      value || ""
    );
    const companyIdValue = companyData?.companyId || 0;

    const courtsData = await getCourtsByCompany(companyIdValue);
    setCourts(courtsData);
  };

  const handleCourtToggle = (courtName: string) => {
    setSelectedCourts((prev) => {
      if (prev.includes(courtName)) {
        return prev.filter((name) => name !== courtName);
      } else {
        return [...prev, courtName];
      }
    });
  };

  const handleSelectAll = () => {
    setSelectedCourts(courts.map((court) => court.name));
  };

  const filterReservationsByCourts = () => {
    if (selectedCourts.length === 0) {
      setReservations([]);
    } else {
      const filtered = allReservations.filter((reservation) =>
        selectedCourts.includes(reservation.courtName)
      );
      setReservations(filtered);
    }
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
      setAllReservations(
        allReservations.filter((res) => res.id !== reservationToRemove.id)
      );
      onCloseConfirmationModal();
    }
  };

  const onTogglePaid = async (id: string | number, currentPaid: boolean) => {
    try {
      await markReservationAsPaid(id, !currentPaid);
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, isPaid: !currentPaid } : r))
      );
      setAllReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, isPaid: !currentPaid } : r))
      );
      setSnackbar({
        open: true,
        message: !currentPaid
          ? "Reserva marcada como paga!"
          : "Reserva marcada como não paga!",
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
    fetchCourts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  useEffect(() => {
    if (courts.length > 0 && selectedCourts.length === 0) {
      setSelectedCourts(courts.map((court) => court.name));
    }
  }, [courts, selectedCourts.length]);

  useEffect(() => {
    filterReservationsByCourts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCourts, allReservations]);

  return (
    <>
      <Box
        display="flex"
        flexDirection={isMobile ? "column" : { xs: "column" }}
        justifyContent="space-between"
        textAlign={isMobile ? "left" : "center"}
        alignItems={isMobile ? "stretch" : "start"}
        sx={{ gap: isMobile ? 1.5 : 0, padding: isMobile ? "10px 8px" : 0 }}
      >
        <Typography
          sx={{ fontWeight: 600, letterSpacing: "0.2" }}
          fontSize={isMobile ? "16px" : "18px"}
          color="#22303E"
        >
          Agendamentos Realizados
        </Typography>
        <Box
          display="flex"
          width="100%"
          flexDirection={isMobile ? "column" : "row"}
          justifyContent="space-between"
          alignItems={isMobile ? "stretch" : "center"}
          sx={{ gap: isMobile ? 1.5 : 0 }}
        >
          <DateButton date={date} handleDateChange={handleDateChange} />
          <Box display="flex" gap={1} justifyContent={isMobile ? "flex-end" : undefined}>
            <Tooltip title="Filtrar por Quadras">
              <IconButton
                onClick={() => setShowCourtFilter(!showCourtFilter)}
                color={showCourtFilter ? "primary" : "default"}
                size={isMobile ? "small" : "medium"}
              >
                <FilterListIcon fontSize={isMobile ? "medium" : "large"} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Visão em Calendário">
              <IconButton
                onClick={() => setCalendarView(true)}
                color={calendarView ? "primary" : "default"}
                size={isMobile ? "small" : "medium"}
              >
                <CalendarMonthOutlinedIcon fontSize={isMobile ? "medium" : "large"} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Visão em Lista">
              <IconButton
                onClick={() => setCalendarView(false)}
                color={!calendarView ? "primary" : "default"}
                size={isMobile ? "small" : "medium"}
              >
                <FormatListBulletedIcon fontSize={isMobile ? "medium" : "large"} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>

      {showCourtFilter && (
        <Box sx={{ marginTop: isMobile ? 1 : 2, marginBottom: isMobile ? 1 : 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: isMobile ? "flex-start" : "space-between",
              alignItems: isMobile ? "stretch" : "center",
              marginBottom: 1,
              gap: isMobile ? 1 : 0,
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: isMobile ? "12px" : "14px",
                color: "#666",
              }}
            >
              Filtrar por Quadras:
            </Typography>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center", marginTop: isMobile ? 1 : 0 }}>
              {selectedCourts.length > 0 && (
                <Chip
                  label={`${selectedCourts.length} selecionada${selectedCourts.length > 1 ? "s" : ""}`}
                  size="small"
                  sx={{
                    backgroundColor: "#e3f2fd",
                    color: "#1976d2",
                    fontSize: isMobile ? "10px" : "11px",
                    height: isMobile ? "20px" : "24px",
                  }}
                />
              )}
              <Button
                size="small"
                variant="text"
                onClick={handleSelectAll}
                sx={{
                  fontSize: isMobile ? "11px" : "12px",
                  color: "#226FE2",
                  textTransform: "none",
                  fontWeight: 600,
                  minWidth: isMobile ? "auto" : undefined,
                  padding: isMobile ? "2px 8px" : undefined,
                  "&:hover": {
                    backgroundColor: "#f0f8ff",
                  },
                }}
              >
                Selecionar Todas
              </Button>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: isMobile ? 0.5 : 1 }}>
            {courts
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((court) => {
                const isSelected = selectedCourts.includes(court.name);
                return (
                  <Button
                    key={court.courtId}
                    variant={isSelected ? "contained" : "outlined"}
                    size="small"
                    onClick={() => handleCourtToggle(court.name)}
                    sx={{
                      borderRadius: "25px",
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: isMobile ? "11px" : "13px",
                      padding: isMobile ? "6px 10px" : "8px 20px",
                      minWidth: "auto",
                      border: isSelected ? "none" : "2px solid #e0e0e0",
                      backgroundColor: isSelected ? "#226FE2" : "#fafafa",
                      color: isSelected ? "#fff" : "#555",
                      boxShadow: isSelected
                        ? "0 2px 8px rgba(34, 111, 226, 0.3)"
                        : "none",
                      marginBottom: isMobile ? "4px" : 0,
                      "&:hover": {
                        backgroundColor: isSelected ? "#1A5ACB" : "#f0f0f0",
                        borderColor: isSelected ? "#1A5ACB" : "#d0d0d0",
                        transform: "translateY(-1px)",
                        boxShadow: isSelected
                          ? "0 4px 12px rgba(34, 111, 226, 0.4)"
                          : "0 2px 4px rgba(0,0,0,0.1)",
                      },
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    {court.name}
                  </Button>
                );
              })}
          </Box>
        </Box>
      )}

      {isLoading ? (
        <Box marginTop="180px">
          <LoadingSpinner />
        </Box>
      ) : selectedCourts.length === 0 ? (
        <NoData
          title="Selecione as Quadras"
          description="Selecione pelo menos uma quadra para visualizar os agendamentos"
        />
      ) : reservations.length === 0 ? (
        <NoData
          title="Sem Horários Reservados"
          description="Nenhuma reserva encontrada para as quadras selecionadas"
        />
      ) : (
        <Box sx={{ paddingTop: "30px" }}>
          {calendarView ? (
            <ScheduledHours
              reservations={reservations}
              setReservations={setReservations}
              displayedDate={date.toDate()}
              companyId={companyId}
              onReservationUpdate={fetchReservations}
              selectedCourts={selectedCourts}
              allCourts={courts}
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
