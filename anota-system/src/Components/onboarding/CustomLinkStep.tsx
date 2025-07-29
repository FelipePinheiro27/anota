import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  FormLabel,
  CircularProgress,
} from "@mui/material";
import { colors } from "../../constants/Colors";
import { updatePathRouteKey } from "../../api/CompanyAPI";
import { getCompanyData } from "../../utils/generalUtil";
import { getCompanyById } from "../../api/CompanyAPI";
import { CompanyType } from "../../types/generalTypes";

interface CustomLinkStepProps {
  onComplete: (company: CompanyType) => void;
  onError: (message: string) => void;
  onSuccess: (message: string) => void;
}

const CustomLinkStep = ({ onComplete, onError, onSuccess }: CustomLinkStepProps) => {
  const [customLink, setCustomLink] = useState("");
  const [loading, setLoading] = useState(false);

  const validateCustomLink = (link: string) => {
    const regex = /^[a-z0-9-]+$/;
    return regex.test(link) && link.length >= 3 && link.length <= 20;
  };

  const handleSaveCustomLink = async () => {
    if (!customLink.trim()) {
      onError("Digite seu link personalizado");
      return;
    }

    if (!validateCustomLink(customLink)) {
      onError("Link deve conter apenas letras minúsculas, números e hífens (3-20 caracteres)");
      return;
    }

    setLoading(true);
    try {
      const companyData = getCompanyData();
      const result = await updatePathRouteKey(companyData.companyId || 0, customLink);

      if (result.success) {
        onSuccess(result.message || "Link personalizado salvo com sucesso!");
        const updatedCompany = await getCompanyById(companyData?.companyId?.toString() ?? "");
        if (updatedCompany) {
          onComplete(updatedCompany);
        }
      } else {
        onError(result.message || "Erro ao salvar link personalizado. Tente novamente.");
      }
    } catch (error) {
      onError("Erro ao salvar link personalizado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ marginLeft: "44px" }}>
      <Typography
        sx={{
          fontSize: "14px",
          color: "#666",
          marginBottom: "16px",
        }}
      >
        Este será o link da sua página de agendamento pública
      </Typography>
      <FormControl fullWidth sx={{ marginBottom: "16px" }}>
        <FormLabel>Seu link personalizado</FormLabel>
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Typography
            sx={{
              color: "#666",
              fontSize: "16px",
              fontWeight: 500,
            }}
          >
            anotareservas.com/
          </Typography>
          <TextField
            value={customLink}
            onChange={(e) => setCustomLink(e.target.value.toLowerCase())}
            placeholder="exemplo-quadra"
            variant="outlined"
            disabled={loading}
            sx={{ flex: 1 }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSaveCustomLink();
              }
            }}
            helperText="Apenas letras minúsculas, números e hífens (3-20 caracteres)"
          />
        </Box>
      </FormControl>
      <Button
        variant="contained"
        onClick={handleSaveCustomLink}
        disabled={loading || !customLink.trim() || !validateCustomLink(customLink)}
        sx={{
          backgroundColor: colors.blue,
          "&:hover": {
            backgroundColor: colors.darkBlue,
          },
          fontWeight: 550,
        }}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Salvar Link"
        )}
      </Button>
    </Box>
  );
};

export default CustomLinkStep; 