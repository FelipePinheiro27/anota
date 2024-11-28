import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import ClientHeader from "../../Components/header/clientHeader/ClientHeader";
import ReservationCard from "../../Components/reservations/reservationCard/ReservationCard";
import useIsMobile from "../../hooks/useIsMobile";
import ConfirmationDeleteModal from "../../Components/confirmationModal/ConfirmationDeleteModal";
import { useParams } from "react-router-dom";
import {
  getMyReservations,
  removeReservation,
} from "../../api/ReservationsAPI";
import { ReservationScheduledResponse } from "../../types/generalTypes";

const MyReservations = () => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [reservationToRemove, setReservationToRemove] = useState<
    string | number | undefined
  >();
  const [reservationId, setResertionId] = useState("");
  const [reservations, setReservations] = useState<
    ReservationScheduledResponse[]
  >([]);
  const { dynamicPath } = useParams();

  const onCloseModal = () => {
    setOpen(false);
  };

  const onOpenModal = () => {
    setOpen(true);
  };

  const handleChangeReservationId = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setResertionId(event.target.value);
  };

  const fetchMyReservations = async () => {
    const reservationsData = await getMyReservations(reservationId);
    setReservations(reservationsData);
  };

  const onRemoveReservation = async () => {
    if (reservationToRemove) {
      await removeReservation(reservationToRemove);
      await fetchMyReservations();
      onCloseModal();
    }
  };

  return (
    <Box>
      <ClientHeader previewsPage={`/${dynamicPath}`} />

      <Box sx={{ padding: { xs: "10px 10px", md: "30px 40px" } }}>
        <Box margin={"30px 0"}>
          <Typography
            sx={{ fontWeight: 600, letterSpacing: "0.2" }}
            fontSize="18px"
            color="#22303E"
          >
            Meus Agendamentos
          </Typography>
        </Box>
        <Box
          marginTop="40px"
          display={{ xs: "block", md: "flex" }}
          alignItems="end"
          gap="50px"
        >
          <FormControl sx={{ width: { xs: "100%", md: "40%" } }}>
            <FormLabel>Código da Reserva ou Número do Responsável </FormLabel>
            <TextField
              id="cod"
              type="text"
              onChange={handleChangeReservationId}
              fullWidth
              name="cod"
              placeholder=""
              variant="outlined"
            />
          </FormControl>
          <Button
            variant="contained"
            fullWidth={isMobile}
            sx={{
              marginTop: { xs: "16px" },
              padding: { xs: "12px 30px", md: "16px 48px" },
              background: "#E45609",
              fontWeight: 600,
            }}
            onClick={fetchMyReservations}
          >
            Buscar
          </Button>
        </Box>
        <br />
        {reservations.map((res) => (
          <Box marginTop="20px">
            <ReservationCard
              reservation={res}
              onOpenModal={onOpenModal}
              setReservationToRemove={setReservationToRemove}
            />
          </Box>
        ))}
      </Box>
      <ConfirmationDeleteModal
        open={open}
        closeModal={onCloseModal}
        onRemoveReservation={onRemoveReservation}
      />
    </Box>
  );
};

export default MyReservations;
