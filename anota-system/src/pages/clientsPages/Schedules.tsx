import React, { useCallback, useContext, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Box, Button, Typography } from "@mui/material";
import ClientHeader from "../../components/header/clientHeader/ClientHeader";
import TimeSlots from "../../components/timeSlots/TimeSlots";
import ModalitiesGroups from "../../components/modalitiesGroups/ModalitiesGroups";
import DateButton from "../../components/dateButton/DateButton";
import { ClientReservationContext } from "../../context/ClientReservationProvider";
import { getAvailableSchedulesByCourtAndDate } from "../../api/ReservationsAPI";
import { ReservationTypes } from "../../types/generalTypes";
import { getScheduledRangeTime } from "../../utils/clientReservationUtil";
import { useNavigate } from "react-router-dom";

const Schedules = () => {
  const clientReservation = useContext(ClientReservationContext);
  const { selectedCourt, scheduledTime, onSelectScheduleTime } =
    clientReservation || {};
  const { name, courtId } = selectedCourt || {};
  const [date, setDate] = useState(dayjs());
  const [schedules, setSchedules] = useState<ReservationTypes[]>([]);
  const { initialTime, finalTime } =
    getScheduledRangeTime(scheduledTime?.time || []) || {};
  const navigate = useNavigate();

  const handleDateChange = (value: Dayjs | null) => {
    console.log(value);
    if (value) {
      setDate(value);
      onSelectScheduleTime &&
        onSelectScheduleTime({
          ...scheduledTime,
          date: value.format("YYYY-MM-DD"),
        });
    }
  };

  const onSelectSlots = (slot: ReservationTypes) => {
    const hasTime = scheduledTime?.time?.find(
      (value) => slot.start === value.start
    );

    if (hasTime && onSelectScheduleTime) {
      const slotsValue = scheduledTime?.time?.filter(
        (value) => slot.start !== value.start
      );
      onSelectScheduleTime({ ...scheduledTime, time: slotsValue || [] });
    } else {
      const slotsValue = scheduledTime?.time || [];
      slotsValue.push(slot);
      onSelectScheduleTime &&
        onSelectScheduleTime({
          ...scheduledTime,
          time: slotsValue || [],
        });
    }
  };

  const onSelectModality = (modality: number) => {
    onSelectScheduleTime &&
      onSelectScheduleTime({
        ...scheduledTime,
        modality,
      });
  };

  const hasTimeScheduled = scheduledTime?.time && scheduledTime.time.length > 0;
  const reservationFilled =
    scheduledTime?.date &&
    scheduledTime?.time &&
    scheduledTime.time.length > 0 &&
    scheduledTime?.modality !== undefined;

  useEffect(() => {
    const getAvailableSchedules = async () => {
      const schedulesData = await getAvailableSchedulesByCourtAndDate(
        date.format("YYYY-MM-DD"),
        courtId || 0
      );

      setSchedules(schedulesData);
    };

    getAvailableSchedules();
  }, [courtId, date]);

  const resetReservationData = useCallback(() => {
    onSelectScheduleTime &&
      onSelectScheduleTime({
        date: dayjs().format("YYYY-MM-DD"),
        time: [],
        modality: undefined,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!selectedCourt) navigate("/reservas");
  }, [navigate, selectedCourt]);

  useEffect(() => {
    resetReservationData();
  }, [resetReservationData]);

  return (
    <Box>
      <ClientHeader previewsPage="/reservas" />
      <Box sx={{ padding: "30px 40px", paddingBottom: "80px" }}>
        <Box margin="30px 0">
          <Typography
            sx={{ fontWeight: 600, letterSpacing: "0.2" }}
            fontSize="18px"
            color="#22303E"
          >
            {name}
          </Typography>
        </Box>
        <Box display="flex" margin="30px 0" gap="80px">
          <DateButton date={date} handleDateChange={handleDateChange} />
        </Box>
        <Box margin="30px 0">
          <Typography
            sx={{ fontWeight: 600, letterSpacing: "0.2" }}
            fontSize="16px"
            color="#22303E"
          >
            Escolha os Horários
          </Typography>
        </Box>
        <Box margin={{ md: "0 30px" }}>
          <Typography
            sx={{ fontWeight: 500, letterSpacing: "0.2" }}
            fontSize="16px"
            color="#22303E"
          >
            {hasTimeScheduled && (
              <>
                De {initialTime} às {finalTime}
              </>
            )}
          </Typography>
          <br />
          <TimeSlots
            slots={schedules}
            scheduledTime={scheduledTime?.time || []}
            onSelectSlots={onSelectSlots}
          />
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
        <Box margin={{ md: "0 30px" }}>
          <ModalitiesGroups
            onSelectModality={onSelectModality}
            modalitySelected={scheduledTime?.modality}
          />
        </Box>
        <Box sx={{ marginTop: { xs: "50px", md: "100px" } }}>
          <Button
            fullWidth
            variant="contained"
            disabled={!reservationFilled}
            sx={{
              padding: "12px",
              background: "#0C927D",
              "&.Mui-disabled": {
                color: "#fff",
                background: "#C4C4C4",
                cursor: "alias",
              },
              fontWeight: 550,
            }}
            onClick={() => navigate("/confirmacao")}
          >
            Prosseguir
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Schedules;
