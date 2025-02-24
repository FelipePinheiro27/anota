import React, { useEffect, useState } from "react";
import {
  Box,
  Modal,
  Typography,
  Stack,
  Button,
  CircularProgress,
  colors,
} from "@mui/material";
import { ConfigReservations, CourtTypes } from "../../../types/generalTypes";
import ScheduleEdit from "../../scheduleEdit/ScheduleEdit";
import {
  createOrUpdateReservationsConfigByCourtId,
  retrieveReservationsConfigByCourtId,
} from "../../../api/ReservationsConfig";
import useIsMobile from "../../../hooks/useIsMobile";

interface ModalConfigScheduleCourtProps {
  closeModal: () => void;
  court: CourtTypes;
  refetchCourts: () => Promise<void>;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "80%", md: "500px" },
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
  maxHeight: "90vh",
};

const ModalConfigScheduleCourt = ({
  refetchCourts,
  closeModal,
  court,
}: ModalConfigScheduleCourtProps) => {
  const [loading, setLoading] = useState(false);
  const [reservationsConfig, setReservationsConfig] = useState<
    ConfigReservations[]
  >([]);
  const isMobile = useIsMobile();

  const onEditScheduleCourt = async () => {
    setLoading(true);

    await createOrUpdateReservationsConfigByCourtId(reservationsConfig);
    await refetchCourts();
    setLoading(false);
    closeModal();
  };

  useEffect(() => {
    const fetchReservationsConfig = async () => {
      const data = await retrieveReservationsConfigByCourtId(court.courtId);
      setReservationsConfig(data || []);
    };

    fetchReservationsConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal
      open
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack spacing={2}>
          <Typography
            sx={{ fontWeight: 600, letterSpacing: "0.2" }}
            fontSize="18px"
            color="#22303E"
            paddingTop={isMobile ? "50px" : ""}
          >
            Editar Horários
          </Typography>
          <br />
          <ScheduleEdit
            reservationsConfig={reservationsConfig}
            setReservationsConfig={setReservationsConfig}
            courtId={court.courtId}
          />
          <br />
          <Box sx={{ display: "flex", gap: 2, paddingBottom: "80px" }}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                background: "#ffffff",
                color: "#3e3e3e",
                fontWeight: 550,
              }}
              onClick={closeModal}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                background: colors.blue,
                "&.Mui-disabled": {
                  background: colors.blue,
                  color: "#ffffff",
                  opacity: 0.8,
                },
                fontWeight: 550,
              }}
              onClick={onEditScheduleCourt}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Salvar"
              )}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModalConfigScheduleCourt;
