import React from "react";
import { Box, Modal, Typography, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface ConfirmationModalProps {
  open: boolean;
  closeModal: () => void;
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

const ConfirmationModal = ({ open, closeModal }: ConfirmationModalProps) => {
  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack alignItems="center" spacing={2}>
          <CheckCircleIcon sx={{ fontSize: 60, color: "green" }} />
          <Typography
            id="modal-modal-title"
            sx={{ fontWeight: 600, letterSpacing: "0.2" }}
            fontSize="22px"
            color="#22303E"
          >
            Tudo Certo!
          </Typography>
          <Typography
            id="modal-modal-description"
            color="#22303E"
            sx={{ mt: 2 }}
          >
            Lembre-se de chegar 10 minutos antes. <br />
            Divirta-se!
          </Typography>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
