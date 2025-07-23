import React, { useMemo, useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  Snackbar,
  Alert,
  IconButton,
  Tooltip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import {
  ReservationScheduledResponse,
  CourtTypes,
} from "../../types/generalTypes";
import { modalitiesConstant } from "../../constants/Global";
import useIsMobile from "../../hooks/useIsMobile";
import {
  updateReservation,
  markReservationAsPaid,
} from "../../api/ReservationsAPI";
import { getCourtsByCompany } from "../../api/CourtAPI";

interface ScheduledHoursProps {
  reservations: ReservationScheduledResponse[];
  setReservations: React.Dispatch<
    React.SetStateAction<ReservationScheduledResponse[]>
  >;
  startHour?: number;
  endHour?: number;
  displayedDate: Date;
  companyId?: string | number;
  onReservationUpdate?: () => void;
  selectedCourts?: string[];
  allCourts?: CourtTypes[];
}

const ScheduledHours = ({
  reservations,
  setReservations,
  startHour = 12,
  endHour = 24,
  displayedDate,
  companyId,
  onReservationUpdate,
  selectedCourts,
  allCourts,
}: ScheduledHoursProps) => {
  const theme = useTheme();
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [courts, setCourts] = useState<CourtTypes[]>([]);
  const [draggedReservation, setDraggedReservation] =
    useState<ReservationScheduledResponse | null>(null);
  const [dragOverCourt, setDragOverCourt] = useState<string | null>(null);
  const [dragPosition, setDragPosition] = useState<{
    courtName: string;
    startRow: number;
    rowSpan: number;
  } | null>(null);
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    severity: "info",
  });

  const hasOnlyOneReservation = useMemo(() => {
    let qttResercedCourts = 0;
    let courtName = "";

    reservations.forEach((res) => {
      if (courtName !== "" && res.courtName !== courtName) qttResercedCourts++;

      if (courtName === "") {
        courtName = res.courtName;
        qttResercedCourts++;
      }
    });

    return qttResercedCourts === 1;
  }, [reservations]);

  const courtNames = useMemo(() => {
    if (selectedCourts && selectedCourts.length > 0) {
      return selectedCourts;
    } else if (allCourts && allCourts.length > 0) {
      return allCourts.map((court) => court.name);
    } else {
      return [];
    }
  }, [selectedCourts, allCourts]);

  const sortedCourtNames = useMemo(() => {
    return [...courtNames].sort((a, b) => a.localeCompare(b));
  }, [courtNames]);

  const colors = [
    "#369BE5",
    "#7986CB",
    theme.palette.error.light,
    theme.palette.warning.light,
    theme.palette.success.light,
  ];

  const getCourtColor = (index: number) => {
    if (index < 0) return "#369BE5";
    const color = colors[index % colors.length];
    return color || "#369BE5";
  };

  useEffect(() => {
    if (companyId) {
      getCourtsByCompany(companyId).then(setCourts);
    }
  }, [companyId]);

  const generateTimeBlocks = () => {
    const timeBlocks: string[] = [];
    for (let hour = startHour; hour < endHour; hour++) {
      timeBlocks.push(`${hour}:00`);
      timeBlocks.push(`${hour}:30`);
    }
    return timeBlocks;
  };

  const calculateGridRowSpan = (start: Date, end: Date) => {
    const startTotalMinutes = start.getHours() * 60 + start.getMinutes();
    const endTotalMinutes = end.getHours() * 60 + end.getMinutes();
    const durationMinutes = endTotalMinutes - startTotalMinutes;

    return Math.ceil(durationMinutes / 30);
  };

  const calculateGridRow = (time: Date) => {
    const totalMinutes = time.getHours() * 60 + time.getMinutes();
    const startMinutes = startHour * 60;
    const rowIndex = Math.floor((totalMinutes - startMinutes) / 30) + 1;

    return rowIndex;
  };

  const calculateRedLinePosition = () => {
    const now = currentTime;
    const totalMinutes = now.getHours() * 60 + now.getMinutes();
    const startMinutes = startHour * 60;
    const minutesFromStart = totalMinutes - startMinutes;
    const rowIndex = Math.floor(minutesFromStart / 30) + 1;
    const offsetPercentage = ((minutesFromStart % 30) / 30) * 100;
    return { rowIndex, offsetPercentage };
  };

  const { rowIndex: currentRow, offsetPercentage: currentMinutesOffset } =
    calculateRedLinePosition();

  const isCourtAvailable = (
    courtName: string,
    startDate: Date,
    endDate: Date,
    excludeReservationId?: string | number
  ) => {
    return !reservations.some(
      (reservation) =>
        reservation.courtName === courtName &&
        reservation.id !== excludeReservationId &&
        new Date(reservation.createdDate) < endDate &&
        new Date(reservation.endDate) > startDate
    );
  };

  const getCourtIdByName = (courtName: string) => {
    const court = courts.find((c) => c.name === courtName);
    return court?.courtId;
  };

  const formatTime = (date: Date) => {
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  const handleDragStart = (
    e: React.DragEvent,
    reservation: ReservationScheduledResponse
  ) => {
    setDraggedReservation(reservation);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, courtName: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverCourt(courtName);
    setMousePosition({ x: e.clientX, y: e.clientY });

    if (draggedReservation) {
      const startDate = new Date(draggedReservation.createdDate);
      const endDate = new Date(draggedReservation.endDate);
      const startRow = calculateGridRow(startDate);
      const rowSpan = calculateGridRowSpan(startDate, endDate);

      setDragPosition({
        courtName,
        startRow,
        rowSpan,
      });
    }
  };

  const handleDragLeave = () => {
    setDragOverCourt(null);
    setDragPosition(null);
    setMousePosition(null);
  };

  const handleDrop = async (e: React.DragEvent, targetCourtName: string) => {
    e.preventDefault();
    setDragOverCourt(null);
    setDragPosition(null);
    setMousePosition(null);

    if (!draggedReservation || !companyId) return;

    if (draggedReservation.courtName === targetCourtName) {
      setSnackbar({
        open: true,
        message: "Não é possível mover uma reserva para a mesma quadra",
        severity: "warning",
      });
      setDraggedReservation(null);
      return;
    }

    const targetCourtId = getCourtIdByName(targetCourtName);
    if (!targetCourtId) {
      setSnackbar({
        open: true,
        message: "Quadra de destino não encontrada",
        severity: "error",
      });
      return;
    }

    const startDate = new Date(draggedReservation.createdDate);
    const endDate = new Date(draggedReservation.endDate);

    const localStartDate = new Date(
      startDate.getTime() - startDate.getTimezoneOffset() * 60000
    );
    const localEndDate = new Date(
      endDate.getTime() - endDate.getTimezoneOffset() * 60000
    );

    if (
      !isCourtAvailable(
        targetCourtName,
        startDate,
        endDate,
        draggedReservation.id
      )
    ) {
      setSnackbar({
        open: true,
        message: "A quadra de destino não está disponível neste horário",
        severity: "error",
      });
      return;
    }

    const payload = {
      user_name: draggedReservation.client,
      user_phone: draggedReservation.clientPhone,
      court_id: Number(targetCourtId),
      price: draggedReservation.price,
      created_date: localStartDate.toISOString(),
      end_date: localEndDate.toISOString(),
      modality: draggedReservation.modality,
    };

    try {
      const result = await updateReservation(draggedReservation.id!, payload);
      console.log("Debug - Resultado da API:", result);

      setSnackbar({
        open: true,
        message: `Reserva movida com sucesso para ${targetCourtName}!`,
        severity: "success",
      });

      if (onReservationUpdate) {
        onReservationUpdate();
      }
    } catch (error) {
      console.error("Erro ao mover reserva:", error);
      setSnackbar({
        open: true,
        message: "Erro ao mover a reserva",
        severity: "error",
      });
    }

    setDraggedReservation(null);
  };

  const getDestinationTime = () => {
    if (!draggedReservation || !dragPosition) return null;

    const startDate = new Date(draggedReservation.createdDate);
    const endDate = new Date(draggedReservation.endDate);

    return {
      start: formatTime(startDate),
      end: formatTime(endDate),
    };
  };

  console.log(reservations);

  const handleTogglePaid = async (
    reservation: ReservationScheduledResponse
  ) => {
    if (reservation.id) {
      setReservations((prev) =>
        prev.map((r) =>
          r.id === reservation.id ? { ...r, isPaid: !reservation.isPaid } : r
        )
      );
    }
    try {
      await markReservationAsPaid(reservation.id!, !reservation.isPaid);
      setSnackbar({
        open: true,
        message: !reservation.isPaid
          ? "Reserva marcada como paga!"
          : "Reserva marcada como não paga!",
        severity: "success",
      });
      if (onReservationUpdate) onReservationUpdate();
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Erro ao atualizar status de pagamento.",
        severity: "error",
      });
      if (reservation.id) {
        setReservations((prev) =>
          prev.map((r) =>
            r.id === reservation.id ? { ...r, isPaid: reservation.isPaid } : r
          )
        );
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (containerRef.current && currentRow > 0) {
      const redLine = containerRef.current.querySelector(".red-line");
      if (redLine) {
        redLine.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [currentRow]);

  return (
    <>
      <Box
        ref={containerRef}
        sx={{
          display: "grid",
          width: "100%",
          textAlign: "left",
          gridTemplateColumns: `70px repeat(${sortedCourtNames.length}, ${
            isMobile && !hasOnlyOneReservation ? "155px" : "1fr"
          })`,
          overflowX: isMobile ? "scroll" : "",
          gridTemplateRows: `repeat(${(endHour - startHour) * 2}, 0.7fr)`,
          position: "relative",
          borderRadius: 1,
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
          marginTop: "-10px",
        }}
      >
        {generateTimeBlocks().map((timeBlock, index) => (
          <Box
            key={index}
            sx={{
              gridRow: index + 1,
              zIndex: 2,
              borderTop: `1px solid ${theme.palette.divider}`,
              display: "flex",
              alignItems: "start",
              justifyContent: "start",
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "14px",
                paddingLeft: "10px",
                marginTop: "-10px",
                paddingRight: "5px",
                background: "#fff",
                zIndex: 1,
              }}
            >
              {index !== 0 && timeBlock}
            </Typography>
          </Box>
        ))}

        {sortedCourtNames.map((court, index) => (
          <Box
            key={court}
            sx={{
              gridColumn: index + 2,
              gridRow: "1",
              textAlign: "center",
              padding: "3px",
              marginBottom: "10px",
              marginRight: "5px",
              height: "40%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: getCourtColor(index),
              borderBottom: `1px solid ${theme.palette.divider}`,
              borderLeft:
                index !== 0 ? `1px solid ${theme.palette.divider}` : "none",
              color: theme.palette.getContrastText(getCourtColor(index)),
            }}
          >
            <Typography variant={isMobile ? "subtitle2" : "subtitle1"}>
              {court}
            </Typography>
          </Box>
        ))}

        {sortedCourtNames.map((_, courtIndex) =>
          generateTimeBlocks().map((_, timeIndex) => (
            <Box
              key={`court-${courtIndex}-time-${timeIndex}`}
              sx={{
                gridColumn: courtIndex + 2,
                gridRow: timeIndex + 2,
                borderTop: `1px solid ${theme.palette.divider}`,
                position: "relative",
              }}
            />
          ))
        )}

        {currentRow > 0 &&
          currentRow <= (endHour - startHour) * 2 &&
          displayedDate.toDateString() === new Date().toDateString() && (
            <Box
              className="red-line"
              sx={{
                gridColumn: `1 / -1`,
                gridRow: currentRow,
                borderTop: `2px solid red`,
                position: "absolute",
                width: "100%",
                zIndex: 3,
                top: `${currentMinutesOffset / 10}%`,
              }}
            />
          )}

        {reservations.map((reservation, index) => {
          const startDate = new Date(reservation.createdDate);
          const endDate = new Date(reservation.endDate);
          const startRow = calculateGridRow(startDate);
          const rowSpan = calculateGridRowSpan(startDate, endDate);
          const courtIndex = sortedCourtNames.indexOf(reservation.courtName);

          if (
            startRow < 0 ||
            startRow >= (endHour - startHour) * 2 ||
            courtIndex === -1
          )
            return null;

          return (
            <Box
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, reservation)}
              sx={{
                gridColumn: courtIndex + 2,
                gridRow: `${startRow} / span ${rowSpan}`,
                position: "relative",
                padding: "10px",
                backgroundColor: getCourtColor(courtIndex),
                borderRadius: 1,
                marginBottom: "5px",
                marginRight: "5px",
                opacity: 0.95,
                color: theme.palette.getContrastText(getCourtColor(courtIndex)),
                zIndex: 1,
                cursor: "grab",
                border: reservation.isPaid ? `1px solid #4CAF50` : undefined,
                boxShadow: reservation.isPaid
                  ? `0 0 2px 2px #4CAF50`
                  : undefined,
                "&:hover": {
                  opacity: 1,
                  transform: "scale(1.02)",
                  transition: "all 0.2s ease",
                },
                "&:active": {
                  cursor: "grabbing",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body2">
                  <strong>Cliente:</strong> {reservation.client}
                </Typography>
                <Tooltip
                  title={reservation.isPaid ? "Pago" : "Marcar como pago"}
                >
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTogglePaid(reservation);
                    }}
                    sx={{
                      color: reservation.isPaid
                        ? theme.palette.success.dark
                        : theme.palette.text.secondary,
                    }}
                  >
                    {reservation.isPaid ? (
                      <CheckCircleIcon />
                    ) : (
                      <RadioButtonUncheckedIcon />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
              <Typography variant="body2">
                <strong>Valor:</strong> R$ {reservation.price},00 |{" "}
                {modalitiesConstant[reservation.modality || 0]}
              </Typography>
              <Typography variant="body2">
                <strong>Horário:</strong> {formatTime(startDate)} às{" "}
                {formatTime(endDate)}
              </Typography>
            </Box>
          );
        })}

        {sortedCourtNames.map((courtName, courtIndex) => (
          <Box
            key={`drop-${courtName}`}
            onDragOver={(e) => handleDragOver(e, courtName)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, courtName)}
            sx={{
              gridColumn: courtIndex + 2,
              gridRow: `2 / -1`,
              position: "relative",
              backgroundColor:
                dragOverCourt === courtName
                  ? "rgba(76, 175, 80, 0.1)"
                  : "transparent",
              border:
                dragOverCourt === courtName ? "2px dashed #4CAF50" : "none",
              transition: "all 0.2s ease",
              pointerEvents: draggedReservation ? "auto" : "none",
              "&:hover": draggedReservation
                ? {
                    backgroundColor: "rgba(76, 175, 80, 0.2)",
                    border: "2px dashed #4CAF50",
                  }
                : {},
            }}
          />
        ))}

        {draggedReservation && dragPosition && (
          <Box
            sx={{
              gridColumn: sortedCourtNames.indexOf(dragPosition.courtName) + 2,
              gridRow: `${dragPosition.startRow} / span ${dragPosition.rowSpan}`,
              position: "relative",
              padding: "10px",
              backgroundColor: "rgba(76, 175, 80, 0.8)",
              borderRadius: 1,
              marginBottom: "5px",
              marginRight: "5px",
              color: "white",
              zIndex: 10,
              border: "2px dashed #4CAF50",
              opacity: 0.8,
              pointerEvents: "none",
              animation: "pulse 1.5s infinite",
              "@keyframes pulse": {
                "0%": {
                  opacity: 0.8,
                  transform: "scale(1)",
                },
                "50%": {
                  opacity: 1,
                  transform: "scale(1.02)",
                },
                "100%": {
                  opacity: 0.8,
                  transform: "scale(1)",
                },
              },
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
              Movendo para: {dragPosition.courtName}
            </Typography>
            <Typography variant="body2">
              <strong>Cliente:</strong> {draggedReservation.client}
            </Typography>
            <Typography variant="body2">
              <strong>Horário:</strong> {getDestinationTime()?.start} às{" "}
              {getDestinationTime()?.end}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: "0.8rem", mt: 1, fontStyle: "italic" }}
            >
              Solte aqui para confirmar
            </Typography>
          </Box>
        )}

        {draggedReservation && dragPosition && (
          <>
            <Box
              sx={{
                gridColumn:
                  sortedCourtNames.indexOf(dragPosition.courtName) + 2,
                gridRow: dragPosition.startRow,
                position: "relative",
                zIndex: 15,
                pointerEvents: "none",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "-2px",
                  left: "0",
                  right: "0",
                  height: "4px",
                  backgroundColor: "#4CAF50",
                  borderRadius: "2px",
                  boxShadow: "0 0 8px rgba(76, 175, 80, 0.8)",
                }}
              />
              <Typography
                sx={{
                  position: "absolute",
                  top: "-25px",
                  left: "5px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  zIndex: 16,
                }}
              >
                {getDestinationTime()?.start}
              </Typography>
            </Box>

            <Box
              sx={{
                gridColumn:
                  sortedCourtNames.indexOf(dragPosition.courtName) + 2,
                gridRow: dragPosition.startRow + dragPosition.rowSpan - 1,
                position: "relative",
                zIndex: 15,
                pointerEvents: "none",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  bottom: "-2px",
                  left: "0",
                  right: "0",
                  height: "4px",
                  backgroundColor: "#4CAF50",
                  borderRadius: "2px",
                  boxShadow: "0 0 8px rgba(76, 175, 80, 0.8)",
                }}
              />
              <Typography
                sx={{
                  position: "absolute",
                  bottom: "-25px",
                  left: "5px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  zIndex: 16,
                }}
              >
                {getDestinationTime()?.end}
              </Typography>
            </Box>
          </>
        )}

        {draggedReservation && dragPosition && (
          <Box
            sx={{
              position: "fixed",
              top: "20px",
              right: "20px",
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              color: "white",
              padding: "15px",
              borderRadius: "8px",
              zIndex: 1000,
              minWidth: "280px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              border: "1px solid rgba(76, 175, 80, 0.5)",
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 1, fontWeight: "bold", color: "#4CAF50" }}
            >
              Movendo Reserva
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <strong>De:</strong> {draggedReservation.courtName}
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <strong>Para:</strong> {dragPosition.courtName}
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <strong>Horário:</strong> {getDestinationTime()?.start} -{" "}
              {getDestinationTime()?.end}
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <strong>Cliente:</strong> {draggedReservation.client}
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <strong>Modalidade:</strong>{" "}
              {modalitiesConstant[draggedReservation.modality || 0]}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.8rem",
                fontStyle: "italic",
                mt: 1,
                color: "#4CAF50",
              }}
            >
              Arraste para a quadra desejada
            </Typography>
          </Box>
        )}

        {draggedReservation && mousePosition && (
          <Box
            sx={{
              position: "fixed",
              left: mousePosition.x + 10,
              top: mousePosition.y - 40,
              backgroundColor: "rgba(76, 175, 80, 0.95)",
              color: "white",
              padding: "8px 12px",
              borderRadius: "6px",
              zIndex: 1001,
              fontSize: "0.875rem",
              fontWeight: "bold",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              pointerEvents: "none",
              whiteSpace: "nowrap",
            }}
          >
            {getDestinationTime()?.start} - {getDestinationTime()?.end}
          </Box>
        )}
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
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

export default ScheduledHours;
