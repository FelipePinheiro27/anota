import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import ClientHeader from "../../components/header/clientHeader/ClientHeader";
import ConfirmationModal from "../../components/confirmationModal/ConfirmationModal";

const Confirmation = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const onCloseModal = () => {
    setOpen(false);
    navigate("/");
  };

  return (
    <Box>
      <ClientHeader previewsPage="/horarios" />
      <Box sx={{ padding: "30px 40px" }}>
        <Box margin="30px 0">
          <Typography
            sx={{ fontWeight: 600, letterSpacing: "0.2" }}
            fontSize="18px"
            color="#22303E"
          >
            Quadra 01
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{ fontWeight: 500, letterSpacing: "0.2" }}
            fontSize="16px"
            color="#22303E"
          >
            Segunda Feira, 21/10/2024 de 18:00 às 20:00
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
              placeholder=""
              variant="outlined"
            />
          </FormControl>
        </Box>
        <Box marginTop="20px">
          <FormControl sx={{ width: { xs: "80%", md: "30%" } }}>
            <FormLabel>Número de Contato</FormLabel>
            <InputMask mask="(99) 99999-9999" maskChar="_">
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
            sx={{
              padding: "12px",
              background: "#0C927D",
              "&.Mui-disabled": {
                color: "#fff",
                background: "#C4C4C4",
              },
              fontWeight: 550,
            }}
            onClick={() => setOpen(true)}
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
