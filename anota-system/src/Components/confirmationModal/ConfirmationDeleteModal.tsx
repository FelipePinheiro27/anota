import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import React from "react";

interface ConfirmationDeleteModalProps {
  open: boolean;
  closeModal: () => void;
  onRemoveReservation: () => void;
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
  textAlign: "center",
};

const ConfirmationDeleteModal = ({
  open,
  closeModal,
  onRemoveReservation,
}: ConfirmationDeleteModalProps) => {
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack alignItems="center" spacing={2}>
          <Typography
            id="modal-modal-title"
            sx={{ fontWeight: 600, letterSpacing: "0.2" }}
            fontSize="20px"
            color="#22303E"
          >
            Tem Certeza?
          </Typography>
          <Typography
            id="modal-modal-title"
            sx={{ letterSpacing: "0.2" }}
            fontSize="16px"
            color="#22303E"
          >
            Deseja desmarcar a reserva de 18:00 de sábado, 16 de novembro?
          </Typography>
          <Box display="flex" gap="10px">
            <Button
              fullWidth
              variant="contained"
              sx={{
                textTransform: "capitalize",
                background: "#c10015",
                fontWeight: 550,
              }}
              onClick={onRemoveReservation}
            >
              Desmarcar
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{
                textTransform: "capitalize",
                background: "#0C927D",
                fontWeight: 550,
              }}
              onClick={closeModal}
            >
              Manter
            </Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ConfirmationDeleteModal;
