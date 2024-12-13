import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputMask from "react-input-mask";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import ClientHeader from "../../Components/header/clientHeader/ClientHeader";
import ConfirmationModal from "../../Components/confirmationModal/ConfirmationModal";
import { ClientReservationContext } from "../../context/ClientReservationProvider";
import { parseReservationDataToPayload } from "../../utils/clientReservationUtil";
import { createReservation } from "../../api/ReservationsAPI";

const daysOfWeek = [
  "Domingo",
  "Segunda Feira",
  "Terça Feira",
  "Quarta Feira",
  "Quinta Feira",
  "Sexta Feira",
  "Sábado",
];

export type FormDataType = {
  phoneNumer: string;
  clientName: string;
};

const Confirmation = () => {
  const [open, setOpen] = useState(false);
  const { dynamicPath } = useParams();
  const navigate = useNavigate();
  const clientReservation = useContext(ClientReservationContext);
  const { selectedCourt, scheduledTime, company } = clientReservation || {};
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    phoneNumer: localStorage.getItem("clientPhone") || "",
    clientName: localStorage.getItem("clientName") || "",
  });
  const { secondaryColor } = company || {};
  const value =
    scheduledTime?.time?.reduce((acc, current) => {
      return acc + current.price;
    }, 0) ?? 0;

  const onChangeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((form) => ({
      ...form,
      phoneNumer: event.target.value,
    }));
  };

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((form) => ({
      ...form,
      clientName: event.target.value,
    }));
  };

  const isValidPhoneNumber = (phoneNumber: string) => {
    const numericPhone = phoneNumber.replace(/\D/g, "");

    if (numericPhone.length !== 11) return false;

    const ddd = numericPhone.substring(0, 2);
    const mainNumber = numericPhone.substring(2);

    if (!/^[1-9][1-9]$/.test(ddd)) return false;

    if (!/^9/.test(mainNumber)) return false;

    return true;
  };

  const isDisabled =
    formData.clientName === "" ||
    !isValidPhoneNumber(formData.phoneNumer) ||
    isSubmitting;

  const date = useMemo(
    () => new Date(scheduledTime?.date || ""),
    [scheduledTime?.date]
  );

  const onCloseModal = () => {
    setOpen(false);
    navigate(`/${dynamicPath}`);
  };

  const onSubmitReservation = async () => {
    setIsSubmitting(true);
    const reservationData = parseReservationDataToPayload(
      formData,
      selectedCourt,
      scheduledTime,
      value
    );

    localStorage.setItem("clientName", formData.clientName);
    localStorage.setItem("clientPhone", formData.phoneNumer);

    const reservationCompleted = await createReservation(reservationData);
    setOpen(reservationCompleted);
  };

  useEffect(() => {
    if (!selectedCourt || !date || !scheduledTime?.time) {
      navigate(`/${dynamicPath}/reservas`);
    }
  }, [date, navigate, scheduledTime, selectedCourt, dynamicPath]);

  return (
    <Box>
      <ClientHeader previewsPage={`/${dynamicPath}/horarios`} />
      <Box sx={{ padding: { xs: "30px 15px", md: "30px 40px" } }}>
        <Box margin="30px 0">
          <Typography
            sx={{ fontWeight: 600, letterSpacing: "0.2" }}
            fontSize="18px"
            color="#22303E"
          >
            {selectedCourt?.name}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{ fontWeight: 500, letterSpacing: "0.2" }}
            fontSize="16px"
            color="#22303E"
          >
            {daysOfWeek[date.getDay()]},{" "}
            {date.toLocaleDateString("pt-BR", { timeZone: "UTC" })} de{" "}
            {scheduledTime?.time && scheduledTime?.time[0]?.start} às{" "}
            {scheduledTime?.time &&
              scheduledTime?.time[scheduledTime.time.length - 1].end}
          </Typography>
        </Box>
        <Box margin="10px 0">
          <Typography
            sx={{ letterSpacing: "0.2" }}
            fontSize="16px"
            fontWeight={600}
            color="#22303E"
          >
            Valor: R$ {value},00
          </Typography>
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
              value={formData.clientName}
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
              value={formData.phoneNumer}
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
        <Box sx={{ marginTop: { xs: "100px", md: "200px" } }}>
          <Button
            fullWidth
            variant="contained"
            disabled={isDisabled}
            sx={{
              padding: "12px",
              background: secondaryColor,
              "&.Mui-disabled": {
                color: "#fff",
                background: "#C4C4C4",
              },
              fontWeight: 550,
            }}
            onClick={onSubmitReservation}
          >
            Confirmar Reserva
          </Button>
        </Box>
      </Box>
      <ConfirmationModal open={open} closeModal={onCloseModal} />
    </Box>
  );
};

export default Confirmation;
