import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { ConfigReservations } from "../../types/generalTypes";
import { colors } from "../../constants/Colors";

interface DefaultScheduleConfigProps {
  courtId: number;
  onApplyDefault: (configs: ConfigReservations[]) => void;
}

const DefaultScheduleConfig = ({
  courtId,
  onApplyDefault,
}: DefaultScheduleConfigProps) => {
  const createDefaultConfig = () => {
    const defaultConfigs: ConfigReservations[] = [
      {
        day_of_week: 1,
        start_time: "08:00:00",
        end_time: "22:00:00",
        price: 80,
        court_id: courtId,
      },
      {
        day_of_week: 2,
        start_time: "08:00:00",
        end_time: "22:00:00",
        price: 80,
        court_id: courtId,
      },
      {
        day_of_week: 3,
        start_time: "08:00:00",
        end_time: "22:00:00",
        price: 80,
        court_id: courtId,
      },
      {
        day_of_week: 4,
        start_time: "08:00:00",
        end_time: "22:00:00",
        price: 80,
        court_id: courtId,
      },
      {
        day_of_week: 5,
        start_time: "08:00:00",
        end_time: "22:00:00",
        price: 80,
        court_id: courtId,
      },
      {
        day_of_week: 6,
        start_time: "08:00:00",
        end_time: "18:00:00",
        price: 100,
        court_id: courtId,
      },

      {
        day_of_week: 0,
        start_time: "08:00:00",
        end_time: "18:00:00",
        price: 120,
        court_id: courtId,
      },
    ];

    return defaultConfigs;
  };

  const handleApplyDefault = () => {
    const defaultConfigs = createDefaultConfig();
    onApplyDefault(defaultConfigs);
  };

  return (
    <Box
      sx={{
        marginBottom: "20px",
        padding: "16px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
      }}
    >
      <Typography
        sx={{
          fontSize: "14px",
          color: "#666",
          marginBottom: "12px",
        }}
      >
        Não tem certeza dos horários? Use nossa configuração padrão:
      </Typography>

      <Box sx={{ marginBottom: "12px" }}>
        <Typography
          sx={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}
        >
          <strong>Segunda a Sexta:</strong> 08:00 - 22:00 | R$ 80/hora
        </Typography>
        <Typography
          sx={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}
        >
          <strong>Sábado:</strong> 08:00 - 18:00 | R$ 100/hora
        </Typography>
        <Typography sx={{ fontSize: "12px", color: "#666" }}>
          <strong>Domingo:</strong> 08:00 - 18:00 | R$ 120/hora
        </Typography>
      </Box>

      <Button
        variant="outlined"
        size="small"
        onClick={handleApplyDefault}
        sx={{
          borderColor: colors.blue,
          color: colors.blue,
          "&:hover": {
            borderColor: colors.darkBlue,
            backgroundColor: "rgba(34, 111, 226, 0.04)",
          },
          fontWeight: 550,
        }}
      >
        Aplicar Configuração Padrão
      </Button>
    </Box>
  );
};

export default DefaultScheduleConfig;
