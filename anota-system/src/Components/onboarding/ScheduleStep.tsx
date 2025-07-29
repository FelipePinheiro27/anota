import React from "react";
import { Box, Button } from "@mui/material";
import { colors } from "../../constants/Colors";

interface ScheduleStepProps {
  onComplete: () => void;
  onSuccess: (message: string) => void;
  isEnabled: boolean;
}

const ScheduleStep = ({ onComplete, onSuccess, isEnabled }: ScheduleStepProps) => {
  const handleDefineSchedules = () => {
    onSuccess("Passo 3 concluído!");
    onComplete();
  };

  return (
    <Box sx={{ marginLeft: "44px" }}>
      <Button
        variant="contained"
        onClick={handleDefineSchedules}
        disabled={!isEnabled}
        sx={{
          backgroundColor: isEnabled ? colors.blue : "#e0e0e0",
          "&:hover": {
            backgroundColor: isEnabled ? colors.darkBlue : "#e0e0e0",
          },
          fontWeight: 550,
        }}
      >
        Definir Horários
      </Button>
    </Box>
  );
};

export default ScheduleStep; 