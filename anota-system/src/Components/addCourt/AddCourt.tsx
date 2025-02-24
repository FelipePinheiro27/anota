import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  colors,
  FormControl,
  FormLabel,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CreateCourtPayloadType } from "../../types/generalTypes";
import { getCompanyData } from "../../utils/generalUtil";
import { createCourt } from "../../api/CourtAPI";

interface AddCourtProps {
  closeModal: () => void;
  fetchCourts: () => Promise<void>;
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

const DEFAULT_MODALITY = 0;

const AddCourt = ({ closeModal, fetchCourts }: AddCourtProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const isDisabled = name === "" || description === "" || loading;

  const { companyId } = getCompanyData();

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const onSaveCourt = async () => {
    if (companyId) {
      setLoading(true);
      try {
        const data: CreateCourtPayloadType = {
          company_id: companyId,
          description: description,
          name: name,
          modality: DEFAULT_MODALITY,
          image_url: "",
        };

        await createCourt(data);
        await fetchCourts();
        closeModal();
      } finally {
        setLoading(false);
      }
    }
  };

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
          >
            Cadastrar Quadra
          </Typography>
          <br />
          <FormControl>
            <FormLabel>Nome da Quadra</FormLabel>
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
          <Box sx={{ display: "flex", gap: 2, paddingBottom: "30px" }}>
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
              onClick={onSaveCourt}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Cadastrar"
              )}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddCourt;
