import React, { useMemo, useEffect, useRef, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { ReservationScheduledResponse } from "../../types/generalTypes";
import { modalitiesConstant } from "../../constants/Global";
import useIsMobile from "../../hooks/useIsMobile";

interface ScheduledHoursProps {
  reservations: ReservationScheduledResponse[];
  startHour?: number;
  endHour?: number;
  displayedDate: Date;
}

const ScheduledHours = ({
  reservations,
  startHour = 12,
  endHour = 24,
  displayedDate,
}: ScheduledHoursProps) => {
  const theme = useTheme();
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

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

  const courts = Array.from(
    new Set(reservations.map((reservation) => reservation.courtName))
  );

  const colors = [
    "#369BE5",
    "#7986CB",
    theme.palette.error.light,
    theme.palette.warning.light,
    theme.palette.success.light,
  ];

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
    <Box
      ref={containerRef}
      sx={{
        display: "grid",
        width: "100%",
        textAlign: "left",
        gridTemplateColumns: `70px repeat(${courts.length}, ${
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

      {courts.map((court, index) => (
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
            backgroundColor: colors[index % colors.length],
            borderBottom: `1px solid ${theme.palette.divider}`,
            borderLeft:
              index !== 0 ? `1px solid ${theme.palette.divider}` : "none",
            color: theme.palette.getContrastText(colors[index % colors.length]),
          }}
        >
          <Typography variant={isMobile ? "subtitle2" : "subtitle1"}>
            {court}
          </Typography>
        </Box>
      ))}

      {courts.map((_, courtIndex) =>
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
        const courtIndex = courts.indexOf(reservation.courtName);

        if (startRow < 0 || startRow >= (endHour - startHour) * 2) return null;

        return (
          <Box
            key={index}
            sx={{
              gridColumn: courtIndex + 2,
              gridRow: `${startRow} / span ${rowSpan}`,
              position: "relative",
              padding: "10px",
              backgroundColor: colors[courtIndex % colors.length],
              borderRadius: 1,
              marginBottom: "5px",
              marginRight: "5px",
              opacity: 0.9,
              color: theme.palette.getContrastText(
                colors[courtIndex % colors.length]
              ),
              zIndex: 1,
            }}
          >
            <Typography variant="body2">
              <strong>Cliente:</strong> {reservation.client}
            </Typography>
            <Typography variant="body2">
              <strong>Valor:</strong> R$ {reservation.price},00 |{" "}
              {modalitiesConstant[reservation.modality || 0]}
            </Typography>
            <Typography variant="body2">
              <strong>Horário:</strong> {startDate.getHours()}:
              {String(startDate.getMinutes()).padStart(2, "0")} às{" "}
              {endDate.getHours()}:
              {String(endDate.getMinutes()).padStart(2, "0")}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default ScheduledHours;
