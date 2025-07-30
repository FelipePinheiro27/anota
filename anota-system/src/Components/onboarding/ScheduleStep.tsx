import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { colors } from "../../constants/Colors";
import ScheduleModal from "./ScheduleModal";

interface ScheduleStepProps {
  onComplete: () => void;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
  isEnabled: boolean;
}

const ScheduleStep = ({ onComplete, onSuccess, onError, isEnabled }: ScheduleStepProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleModalComplete = () => {
    onComplete();
    setModalOpen(false);
  };

  return (
    <>
      <Box sx={{ marginLeft: "44px" }}>
        <Button
          variant="contained"
          onClick={handleOpenModal}
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

      <ScheduleModal
        open={modalOpen}
        onClose={handleCloseModal}
        onComplete={handleModalComplete}
        onSuccess={onSuccess}
        onError={onError}
      />
    </>
  );
};

export default ScheduleStep; 