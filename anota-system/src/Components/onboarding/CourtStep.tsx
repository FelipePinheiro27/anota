import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  FormLabel,
  CircularProgress,
} from "@mui/material";
import { colors } from "../../constants/Colors";
import { CreateCourtPayloadType } from "../../types/generalTypes";
import { createCourt } from "../../api/CourtAPI";
import { getCompanyData } from "../../utils/generalUtil";

interface CourtStepProps {
  onComplete: () => void;
  onError: (message: string) => void;
  onSuccess: (message: string) => void;
  isEnabled: boolean;
}

const CourtStep = ({ onComplete, onError, onSuccess, isEnabled }: CourtStepProps) => {
  const [courtName, setCourtName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSaveCourt = async () => {
    if (!courtName.trim()) {
      onError("Digite o nome da quadra");
      return;
    }

    setLoading(true);
    try {
      const companyData = getCompanyData();
      const data: CreateCourtPayloadType = {
        company_id: companyData.companyId || 0,
        description: "Quadra principal",
        name: courtName,
        modality: 0,
        image_url: "",
      };

      await createCourt(data);
      onSuccess("Quadra criada com sucesso!");
      onComplete();
    } catch (error) {
      onError("Erro ao criar quadra. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ marginLeft: "44px" }}>
      <FormControl fullWidth sx={{ marginBottom: "16px" }}>
        <FormLabel>Nome da Quadra</FormLabel>
        <TextField
          value={courtName}
          onChange={(e) => setCourtName(e.target.value)}
          placeholder="Ex: Quadra 1 - Futebol"
          variant="outlined"
          disabled={loading}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSaveCourt();
            }
          }}
        />
      </FormControl>
      <Button
        variant="contained"
        onClick={handleSaveCourt}
        disabled={loading || !courtName.trim() || !isEnabled}
        sx={{
          backgroundColor: isEnabled ? colors.blue : "#e0e0e0",
          "&:hover": {
            backgroundColor: isEnabled ? colors.darkBlue : "#e0e0e0",
          },
          fontWeight: 550,
        }}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Salvar Quadra"
        )}
      </Button>
    </Box>
  );
};

export default CourtStep; 