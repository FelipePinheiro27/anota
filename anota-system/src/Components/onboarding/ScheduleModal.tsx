import React, { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";
import { ConfigReservations } from "../../types/generalTypes";
import ScheduleEdit from "../scheduleEdit/ScheduleEdit";
import { createOrUpdateReservationsConfigByCourtId } from "../../api/ReservationsConfig";
import { getCompanyData } from "../../utils/generalUtil";
import { getCourtsByCompany } from "../../api/CourtAPI";
import { colors } from "../../constants/Colors";
import useIsMobile from "../../hooks/useIsMobile";
import DefaultScheduleConfig from "./DefaultScheduleConfig";

interface ScheduleModalProps {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
  onError: (message: string) => void;
  onSuccess: (message: string) => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", md: "600px" },
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
  maxHeight: "90vh",
};

const ScheduleModal = ({
  open,
  onClose,
  onComplete,
  onError,
  onSuccess,
}: ScheduleModalProps) => {
  const [loading, setLoading] = useState(false);
  const [reservationsConfig, setReservationsConfig] = useState<
    ConfigReservations[]
  >([]);
  const [courtId, setCourtId] = useState<number | null>(null);
  const isMobile = useIsMobile();

  React.useEffect(() => {
    const fetchCourtId = async () => {
      try {
        const companyData = getCompanyData();
        const courts = await getCourtsByCompany(companyData.companyId || 0);
        if (courts.length > 0) {
          setCourtId(courts[0].courtId as number);
        }
      } catch (error) {
        console.error("Erro ao buscar quadra:", error);
        onError("Erro ao carregar dados da quadra");
      }
    };

    if (open) {
      fetchCourtId();
    }
  }, [open, onError]);

  const handleSaveSchedules = async () => {
    if (!courtId) {
      onError("Quadra não encontrada");
      return;
    }

    if (reservationsConfig.length === 0) {
      onError("Configure pelo menos um dia da semana");
      return;
    }

    setLoading(true);
    try {
      const configsWithCourtId = reservationsConfig.map((config) => ({
        ...config,
        court_id: courtId,
      }));

      const success = await createOrUpdateReservationsConfigByCourtId(
        configsWithCourtId
      );

      if (success) {
        onSuccess("Horários configurados com sucesso!");
        onComplete();
        onClose();
      } else {
        onError("Erro ao salvar horários. Tente novamente.");
      }
    } catch (error) {
      onError("Erro ao salvar horários. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  const handleApplyDefault = (defaultConfigs: ConfigReservations[]) => {
    setReservationsConfig(defaultConfigs);
    onSuccess(
      "Configuração padrão aplicada! Você pode personalizar os horários abaixo."
    );
  };

  if (!courtId) {
    return null;
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="schedule-modal-title"
      aria-describedby="schedule-modal-description"
    >
      <Box sx={style}>
        <Stack spacing={2}>
          <Typography
            sx={{ fontWeight: 600, letterSpacing: "0.2" }}
            fontSize="18px"
            color="#22303E"
            paddingTop={isMobile ? "50px" : ""}
          >
            Configure os horários da sua quadra
          </Typography>

          <Typography
            sx={{
              fontSize: "14px",
              color: "#666",
              marginBottom: "16px",
            }}
          >
            Defina os horários de funcionamento e preços para cada dia da semana
          </Typography>

          <DefaultScheduleConfig
            courtId={courtId}
            onApplyDefault={handleApplyDefault}
          />

          <ScheduleEdit
            reservationsConfig={reservationsConfig}
            setReservationsConfig={setReservationsConfig}
            courtId={courtId}
          />

          <Box sx={{ display: "flex", gap: 2, paddingTop: "20px" }}>
            <Button
              variant="outlined"
              fullWidth
              sx={{
                borderColor: colors.blue,
                color: colors.blue,
                "&:hover": {
                  borderColor: colors.darkBlue,
                  backgroundColor: "rgba(34, 111, 226, 0.04)",
                },
                fontWeight: 550,
              }}
              onClick={handleClose}
              disabled={loading}
            >
              Pular por enquanto
            </Button>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: colors.blue,
                "&:hover": {
                  backgroundColor: colors.darkBlue,
                },
                "&.Mui-disabled": {
                  backgroundColor: colors.blue,
                  color: "#ffffff",
                  opacity: 0.8,
                },
                fontWeight: 550,
              }}
              onClick={handleSaveSchedules}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Salvar Horários"
              )}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ScheduleModal;
