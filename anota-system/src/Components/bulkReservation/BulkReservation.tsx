import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import InputMask from "react-input-mask";
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  OutlinedInput,
  Box,
  Button,
  TextField,
  FormLabel,
} from "@mui/material";
import {
  BulkReservationPayloadType,
  CourtTypes,
  ModalityEnum,
  ReservationTypes,
  ScheduledTimeTypes,
} from "../../types/generalTypes";
import DateButton from "../dateButton/DateButton";
import {
  bulkReservation,
  createReservation,
  getAvailableSchedulesByCourtAndDate,
} from "../../api/ReservationsAPI";
import NoData from "../noData/NodaData";
import {
  getScheduledRangeTime,
  parseReservationDataToPayload,
} from "../../utils/clientReservationUtil";
import TimeSlots from "../timeSlots/TimeSlots";
import ModalitiesGroups from "../modalitiesGroups/ModalitiesGroups";
import PeriodToReserve from "../periodToReserve/PeriodToReserve";
import { daysOfWeek } from "../../constants/Global";
import { FormDataType } from "../../pages/clientsPages/Confirmation";
import ConfirmationModal from "../confirmationModal/ConfirmationModal";
import { activeItemType } from "../header/Header";

interface BulkReservationProps {
  courts: CourtTypes[];
  setActiveItem: React.Dispatch<React.SetStateAction<activeItemType>>;
}

const text = "Reservas realizadas com sucesso!";

const BulkReservation = ({ courts, setActiveItem }: BulkReservationProps) => {
  const [selectedCourt, setSelectedCourt] = useState<CourtTypes>();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [schedules, setSchedules] = useState<ReservationTypes[]>([]);
  const [timeSelected, setTimeSelected] = useState<ReservationTypes[]>([]);
  const [period, setPeriod] = useState<number | undefined>();
  const [modality, setModaliy] = useState<ModalityEnum | undefined>();
  const [clientName, setClientName] = useState("");
  const [phoneNumer, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCourtChange = (event: SelectChangeEvent<CourtTypes>) => {
    const courtId = event.target.value;

    setSelectedCourt(courts.find((ct) => ct.courtId === courtId));
  };

  const handleDateChange = (value: Dayjs | null) => {
    if (value) {
      setDate(value);
    }
  };

  const handleChangePeriod = (value?: number) => {
    if (value || value === 0) setPeriod(value);
  };

  const onSelectModality = (modality: ModalityEnum) => {
    setModaliy(modality);
  };

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClientName(event.target.value);
  };

  const onChangeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };

  const value =
    timeSelected.reduce((acc, current) => {
      return acc + current.price;
    }, 0) ?? 0;

  const hasTimeScheduled = timeSelected && timeSelected.length > 0;
  const { initialTime, finalTime } =
    getScheduledRangeTime(timeSelected || []) || {};

  const onSelectSlots = (slot: ReservationTypes) => {
    setTimeSelected((prevSelected) => {
      const isSlotSelected = prevSelected.some((s) => s.start === slot.start);

      const lastScheduled =
        prevSelected && prevSelected[prevSelected.length - 1];

      if (isSlotSelected) {
        if (lastScheduled?.start !== slot.start) return prevSelected;

        return prevSelected.filter((s) => s.start !== slot.start);
      } else {
        return [...prevSelected, slot].sort((a, b) =>
          a.start.localeCompare(b.start)
        );
      }
    });
  };

  useEffect(() => {
    const getAvailableSchedules = async () => {
      cleanAllInputs();
      const value = localStorage.getItem("userSession");
      const companyData: { companyId?: string | number } = value
        ? JSON.parse(value)
        : {};
      const minutes = companyData?.companyId === 3 ? 30 : 60;
      const dateValue = date
        ? date.format("YYYY-MM-DD")
        : dayjs().format("YYYY-MM-DD");

      const schedulesData = await getAvailableSchedulesByCourtAndDate(
        dateValue,
        selectedCourt?.courtId || 0,
        minutes
      );
      setSchedules(schedulesData);
    };

    if (date && selectedCourt) getAvailableSchedules();
  }, [date, selectedCourt]);

  const cleanAllInputs = () => {
    setModaliy(undefined);
    setTimeSelected([]);
    setPeriod(undefined);
  };

  const onCreateBulkReservation = async () => {
    setIsSubmitting(true);
    if (period === 0) {
      const formData: FormDataType = { clientName, phoneNumer };
      const dateValue = date
        ? date.format("YYYY-MM-DD")
        : dayjs().format("YYYY-MM-DD");
      const scheduledTime: ScheduledTimeTypes = {
        time: timeSelected,
        date: dateValue,
        modality,
      };
      const reservationData = parseReservationDataToPayload(
        formData,
        selectedCourt,
        scheduledTime,
        value
      );

      const response = await createReservation(reservationData);
      setIsSubmitting(false);
      setOpen(response);
    } else {
      const dateValue = date
        ? date.format("YYYY-MM-DD")
        : dayjs().format("YYYY-MM-DD");

      const payload: BulkReservationPayloadType = {
        user_name: clientName,
        user_phone: phoneNumer.replace(/\D/g, ""),
        court_id: Number(selectedCourt?.courtId),
        price: value,
        startDate: `${dateValue}T00:00:00`,
        startTime: timeSelected[0].start + ":00",
        endTime: timeSelected[timeSelected.length - 1].end + ":00",
        durationMonths: period || 1,
        modality: modality || 0,
      };

      const response = await bulkReservation(payload);
      setIsSubmitting(false);
      setOpen(response);
    }
  };

  const onCloseModal = () => {
    setOpen(false);
    setActiveItem("Agendamentos");
  };

  const hasPeriod = period || period === 0;
  const hasModality = modality || modality === 0;

  const reservationFilled =
    hasPeriod && hasTimeScheduled && hasModality && clientName && phoneNumer;

  return (
    <div>
      <Typography
        sx={{
          fontWeight: 600,
          letterSpacing: "0.2",
          marginTop: "30px",
          marginBottom: "7px",
        }}
        fontSize="14px"
        color="#22303E"
      >
        Escolha a Quadra que Deseja Reservar
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: "30px" }}>
        <FormControl fullWidth sx={{ marginTop: "9px", width: "30%" }}>
          <InputLabel id="court-select-label">Quadra</InputLabel>
          <Select
            labelId="court-select-label"
            value={selectedCourt}
            onChange={handleCourtChange}
            input={<OutlinedInput label="Quadra" />}
          >
            {courts.map((court) => (
              <MenuItem key={court.courtId} value={court.courtId}>
                {court.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <DateButton date={date} handleDateChange={handleDateChange} />
      </Box>

      <Box>
        {schedules.length === 0 ? (
          <NoData
            title="Sem Horários Disponíveis"
            description="Esta data não possui mais horários. Que tal um outro dia?"
          />
        ) : (
          <>
            <Box margin="30px 0">
              <Typography
                sx={{ fontWeight: 600, letterSpacing: "0.2" }}
                fontSize="14px"
                color="#22303E"
              >
                Selecione a Duração da Reserva (Fixar Horário)
              </Typography>
              {period && date ? (
                <Box margin="0 5px">
                  <Typography
                    sx={{ fontWeight: 500, letterSpacing: "0.2" }}
                    fontSize="14px"
                    color="#22303E"
                  >
                    Toda {daysOfWeek[date.day()]} durante {period} mês
                  </Typography>
                </Box>
              ) : (
                <></>
              )}
              <PeriodToReserve period={period} onChange={handleChangePeriod} />
            </Box>
            <Box>
              <Typography
                sx={{ fontWeight: 600, letterSpacing: "0.2" }}
                fontSize="14px"
                color="#22303E"
              >
                Escolha os Horários
              </Typography>
            </Box>
            <Box margin="0 5px">
              <Typography
                sx={{ fontWeight: 500, letterSpacing: "0.2" }}
                fontSize="14px"
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
                scheduledTime={timeSelected || []}
                onSelectSlots={onSelectSlots}
                primaryColor="#226FE2"
              />
            </Box>
            <Box margin="30px 5px">
              <ModalitiesGroups
                onSelectModality={onSelectModality}
                modalitySelected={modality}
                primaryColor="#226FE2"
                modalityCourt={selectedCourt?.modality}
              />
            </Box>
            <Box marginTop="40px">
              <FormControl sx={{ width: { xs: "100%", md: "50%" } }}>
                <FormLabel>Nome do Responsável</FormLabel>
                <TextField
                  id="name"
                  type="text"
                  fullWidth
                  name="name"
                  onChange={onChangeName}
                  value={clientName}
                  placeholder=""
                  variant="outlined"
                />
              </FormControl>
            </Box>
            <Box marginTop="20px">
              <FormControl sx={{ width: { xs: "80%", md: "30%" } }}>
                <FormLabel>Número de Contato</FormLabel>
                <InputMask
                  mask="(99) 99999-9999"
                  maskChar="_"
                  value={phoneNumer}
                  onChange={onChangeNumber}
                >
                  {(inputProps: any) => (
                    <TextField
                      {...inputProps}
                      id="number"
                      type="text"
                      fullWidth
                      name="number"
                      placeholder=""
                      variant="outlined"
                    />
                  )}
                </InputMask>
              </FormControl>
            </Box>
            <Box sx={{ marginTop: { xs: "50px", md: "100px" } }}>
              <Button
                fullWidth
                variant="contained"
                disabled={!reservationFilled || isSubmitting}
                sx={{
                  padding: "12px",
                  background: "#226FE2",
                  "&.Mui-disabled": {
                    color: "#fff",
                    background: "#C4C4C4",
                    cursor: "alias",
                  },
                  fontWeight: 550,
                }}
                onClick={onCreateBulkReservation}
              >
                {isSubmitting ? <>Aguarde...</> : <>Fazer Reserva</>}
              </Button>
            </Box>
          </>
        )}
      </Box>

      <ConfirmationModal
        open={open}
        closeModal={onCloseModal}
        title="Tudo certo!"
        description={text}
      />
    </div>
  );
};

export default BulkReservation;
