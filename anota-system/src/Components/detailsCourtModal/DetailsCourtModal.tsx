import React, { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  Stack,
  Button,
  FormControl,
  FormLabel,
  TextField,
  CircularProgress,
} from "@mui/material";
import { CourtPayloadType, CourtTypes } from "../../types/generalTypes";
import { colors } from "../../constants/Colors";
import { updateCourt } from "../../api/CourtAPI";

interface DetailsCourtModalProps {
  open: boolean;
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

const DetailsCourtModal = ({
  court,
  open,
  closeModal,
  refetchCourts,
}: DetailsCourtModalProps) => {
  const [name, setName] = useState(court.name);
  const [description, setDescription] = useState(court.description);
  const [loading, setLoading] = useState(false);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const onEditCourt = async () => {
    setLoading(true);
    const data: CourtPayloadType = {
      courtId: court.courtId,
      company_id: court.companyId,
      description: description,
      name: name,
      modality: court.modality,
    };

    await updateCourt(data);
    await refetchCourts();
    setLoading(false);
    closeModal();
  };

  const isDisabled = name === "" || description === "" || loading;

  return (
    <Modal
      open={open}
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
          >
            Editar Quadra
          </Typography>

          <FormControl>
            <FormLabel>Nome</FormLabel>
            <TextField
              id="name"
              value={name}
              onChange={onChangeName}
              required
              fullWidth
              variant="outlined"
              disabled={loading}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Descrição</FormLabel>
            <TextField
              id="description"
              value={description}
              onChange={onChangeDescription}
              required
              fullWidth
              variant="outlined"
              disabled={loading}
            />
          </FormControl>
          <br />
          <Box sx={{ display: "flex", gap: 2 }}>
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
              disabled={isDisabled}
              sx={{
                background: colors.blue,
                "&.Mui-disabled": {
                  background: colors.blue,
                  color: "#ffffff",
                  opacity: 0.8,
                },
                fontWeight: 550,
              }}
              onClick={onEditCourt}
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

export default DetailsCourtModal;
