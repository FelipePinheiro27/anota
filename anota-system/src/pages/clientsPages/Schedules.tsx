import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import { Box, Button, Typography } from "@mui/material";
import ClientHeader from "../../Components/header/clientHeader/ClientHeader";
import TimeSlots from "../../Components/timeSlots/TimeSlots";
import ModalitiesGroups from "../../Components/modalitiesGroups/ModalitiesGroups";
import DateButton from "../../Components/dateButton/DateButton";
import { ClientReservationContext } from "../../context/ClientReservationProvider";
import { getAvailableSchedulesByCourtAndDate } from "../../api/ReservationsAPI";
import { ModalityEnum, ReservationTypes } from "../../types/generalTypes";
import { getScheduledRangeTime } from "../../utils/clientReservationUtil";
import NoData from "../../Components/noData/NodaData";
import LoadingSpinner from "../../Components/loadingSpinner/LoadingSpinner";

const Schedules = () => {
  const clientReservation = useContext(ClientReservationContext);
  const { dynamicPath } = useParams();
  const { selectedCourt, scheduledTime, onSelectScheduleTime, company } =
    clientReservation || {};
  const { primaryColor, secondaryColor } = company || {};

  const [isLoading, setIsLoading] = useState(true);
  const { name, courtId, modality: modalityCourt } = selectedCourt || {};
  const [date, setDate] = useState(dayjs());
  const [schedules, setSchedules] = useState<ReservationTypes[]>([]);
  const { initialTime, finalTime } =
    getScheduledRangeTime(scheduledTime?.time || []) || {};
  const value =
    scheduledTime?.time?.reduce((acc, current) => {
      return acc + current.price;
    }, 0) ?? 0;
  const navigate = useNavigate();

  const handleDateChange = (value: Dayjs | null) => {
    if (value) {
      setDate(value);
      onSelectScheduleTime &&
        onSelectScheduleTime({
          modality: undefined,
          time: [],
          date: value.format("YYYY-MM-DD"),
        });
    }
  };

  const onSelectSlots = (slot: ReservationTypes) => {
    const hasTime = scheduledTime?.time?.find(
      (value) => slot.start === value.start
    );

    const scheduledTimeSlots = scheduledTime?.time;
    const lastScheduled =
      scheduledTimeSlots && scheduledTimeSlots[scheduledTimeSlots.length - 1];

    if (hasTime && onSelectScheduleTime) {
      if (lastScheduled?.start !== slot.start) return;

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

  const onSelectModality = (modality: ModalityEnum) => {
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
      setIsLoading(true);
      const schedulesData = await getAvailableSchedulesByCourtAndDate(
        date.format("YYYY-MM-DD"),
        courtId || 0
      );
      setIsLoading(false);
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
    if (!selectedCourt) navigate(`/${dynamicPath}/reservas`);
  }, [navigate, selectedCourt, dynamicPath]);

  useEffect(() => {
    resetReservationData();
  }, [resetReservationData]);

  if (isLoading)
    return (
      <Box>
        <ClientHeader previewsPage={`/${dynamicPath}/reservas`} />
        <Box
          sx={{
            padding: { xs: "30px 15px", md: "30px 40px" },
            paddingBottom: "80px",
          }}
        >
          <Box margin="30px 0">
            <Typography
              sx={{ fontWeight: 600, letterSpacing: "0.2" }}
              fontSize="18px"
              color="#22303E"
            >
              {name}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: 600, letterSpacing: "0.2" }}
              fontSize="16px"
              color="#22303E"
            >
              {schedules.length > 0 &&
                `Valor do horário: R$ ${schedules[0].price},00`}
            </Typography>
          </Box>
          <Box display="flex" margin="30px 0" gap="80px" marginBottom="120px">
            <DateButton date={date} handleDateChange={handleDateChange} />
          </Box>
          <LoadingSpinner color={primaryColor} />
        </Box>
      </Box>
    );

  if (schedules.length === 0) {
    return (
      <Box>
        <ClientHeader previewsPage={`/${dynamicPath}/reservas`} />
        <Box
          sx={{
            padding: { xs: "30px 15px", md: "30px 40px" },
            paddingBottom: "80px",
          }}
        >
          <Box margin="30px 0">
            <Typography
              sx={{ fontWeight: 600, letterSpacing: "0.2" }}
              fontSize="18px"
              color="#22303E"
            >
              {name}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: 600, letterSpacing: "0.2" }}
              fontSize="16px"
              color="#22303E"
            >
              {schedules.length > 0 &&
                `Valor do horário: R$ ${schedules[0].price},00`}
            </Typography>
          </Box>
          <Box display="flex" margin="30px 0" gap="80px">
            <DateButton date={date} handleDateChange={handleDateChange} />
          </Box>
          <NoData
            title="Sem Horários Disponíveis"
            description="Esta data não possui mais horários. Que tal um outro dia?"
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <ClientHeader previewsPage={`/${dynamicPath}/reservas`} />
      <Box
        sx={{
          padding: { xs: "30px 15px", md: "30px 40px" },
          paddingBottom: "80px",
        }}
      >
        <Box margin="30px 0">
          <Typography
            sx={{ fontWeight: 600, letterSpacing: "0.2" }}
            fontSize="18px"
            color="#22303E"
          >
            {name}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{ fontWeight: 600, letterSpacing: "0.2" }}
            fontSize="16px"
            color="#22303E"
          >
            {schedules.length > 0 &&
              `Valor do horário: R$ ${schedules[0].price},00`}
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
                {value > 0 && ` | Valor: R$ ${value},00`}
              </>
            )}
          </Typography>
          <br />
          <TimeSlots
            slots={schedules}
            scheduledTime={scheduledTime?.time || []}
            onSelectSlots={onSelectSlots}
            primaryColor={primaryColor || ""}
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
            primaryColor={primaryColor || ""}
            modalityCourt={modalityCourt}
          />
        </Box>
        <Box sx={{ marginTop: { xs: "50px", md: "100px" } }}>
          <Button
            fullWidth
            variant="contained"
            disabled={!reservationFilled}
            sx={{
              padding: "12px",
              background: secondaryColor,
              "&.Mui-disabled": {
                color: "#fff",
                background: "#C4C4C4",
                cursor: "alias",
              },
              fontWeight: 550,
            }}
            onClick={() => navigate(`/${dynamicPath}/confirmacao`)}
          >
            Prosseguir
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Schedules;
