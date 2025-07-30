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
import { CompanyType } from "../../types/generalTypes";
import { updateCompanyColors, getCompanyById } from "../../api/CompanyAPI";
import { getCompanyData } from "../../utils/generalUtil";

interface BrandingStepProps {
  onComplete: (company: CompanyType) => void;
  onError: (message: string) => void;
  onSuccess: (message: string) => void;
}

const BrandingStep = ({
  onComplete,
  onError,
  onSuccess,
}: BrandingStepProps) => {
  const [primaryColor, setPrimaryColor] = useState("#1976d2");
  const [secondaryColor, setSecondaryColor] = useState("#dc004e");
  const [loading, setLoading] = useState(false);

  const handleSaveBranding = async () => {
    if (!primaryColor || !secondaryColor) {
      onError("Selecione as cores da sua empresa");
      return;
    }

    setLoading(true);
    try {
      const companyData = getCompanyData();
      const result = await updateCompanyColors(
        companyData.companyId || 0,
        primaryColor,
        secondaryColor
      );

      if (result.success) {
        onSuccess(result.message || "Cores da empresa salvas com sucesso!");
        const updatedCompany = await getCompanyById(
          companyData?.companyId?.toString() ?? ""
        );
        if (updatedCompany) {
          onComplete(updatedCompany);
        }
      } else {
        onError(
          result.message ||
            "Erro ao salvar cores da empresa. Tente novamente."
        );
      }
    } catch (error) {
      onError("Erro ao salvar cores da empresa. Tente novamente.");
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
        Personalize as cores da sua empresa
      </Typography>
      
      <FormControl fullWidth sx={{ marginBottom: "16px" }}>
        <FormLabel>Cor Primária</FormLabel>
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            style={{
              width: "50px",
              height: "40px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          />
          <TextField
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            placeholder="#1976d2"
            variant="outlined"
            disabled={loading}
            sx={{ flex: 1 }}
          />
        </Box>
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: "16px" }}>
        <FormLabel>Cor Secundária</FormLabel>
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input
            type="color"
            value={secondaryColor}
            onChange={(e) => setSecondaryColor(e.target.value)}
            style={{
              width: "50px",
              height: "40px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          />
          <TextField
            value={secondaryColor}
            onChange={(e) => setSecondaryColor(e.target.value)}
            placeholder="#dc004e"
            variant="outlined"
            disabled={loading}
            sx={{ flex: 1 }}
          />
        </Box>
      </FormControl>

      <Button
        variant="contained"
        onClick={handleSaveBranding}
        disabled={loading || !primaryColor || !secondaryColor}
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
          "Salvar Cores"
        )}
      </Button>
    </Box>
  );
};

export default BrandingStep; 