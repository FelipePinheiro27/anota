import React, { useState, useEffect } from "react";
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
import {
  updateCompanyColors,
  updateCompanyLogo,
  getCompanyById,
} from "../../api/CompanyAPI";
import { getCompanyData } from "../../utils/generalUtil";
import {
  uploadCompanyLogo,
  getCompanyLogoByUrl,
} from "../../utils/firebaseStorage";
import FileUpload from "../fileUpload/FileUpload";

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
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [uploadingLogo, setUploadingLogo] = useState(false);

  // Buscar logo existente do Firebase quando o componente carregar
  useEffect(() => {
    const loadExistingLogo = async () => {
      const companyData = getCompanyData();
      if (companyData.companyId) {
        try {
          const existingLogoUrl = await getCompanyLogoByUrl(
            null,
            companyData.companyId
          );
          if (existingLogoUrl) {
            setLogoUrl(existingLogoUrl);
          }
        } catch (error) {
          console.log("Nenhum logo encontrado para a empresa");
        }
      }
    };

    loadExistingLogo();
  }, []);

  const handleFileSelect = (file: File) => {
    setLogoFile(file);
    // Criar uma URL temporária para preview imediato
    const tempUrl = URL.createObjectURL(file);
    setLogoUrl(tempUrl);
  };

  useEffect(() => {
    return () => {
      if (logoUrl && logoUrl.startsWith("blob:")) {
        URL.revokeObjectURL(logoUrl);
      }
    };
  }, [logoUrl]);

  const handleSaveBranding = async () => {
    if (!primaryColor || !secondaryColor) {
      onError("Selecione as cores da sua empresa");
      return;
    }

    setLoading(true);
    try {
      const companyData = getCompanyData();

      const colorsResult = await updateCompanyColors(
        companyData.companyId || 0,
        primaryColor,
        secondaryColor
      );

      if (!colorsResult.success) {
        onError(
          colorsResult.message ||
            "Erro ao salvar cores da empresa. Tente novamente."
        );
        return;
      }

      if (logoFile) {
        try {
          const uploadedUrl = await uploadCompanyLogo(
            logoFile,
            companyData.companyId || 0
          );
          const logoResult = await updateCompanyLogo(
            companyData.companyId || 0,
            uploadedUrl
          );

          if (!logoResult.success) {
            onError(logoResult.message || "Erro ao salvar logo da empresa.");
            return;
          }

          setLogoUrl(uploadedUrl);
        } catch (error) {
          onError("Erro ao fazer upload do logo. Tente novamente.");
          return;
        }
      }

      onSuccess("Configurações da empresa salvas com sucesso!");
      const updatedCompany = await getCompanyById(
        companyData?.companyId?.toString() ?? ""
      );
      if (updatedCompany) {
        onComplete(updatedCompany);
      }
    } catch (error) {
      onError("Erro ao salvar configurações da empresa. Tente novamente.");
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
        Personalize a marca da sua empresa
      </Typography>

      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 600,
          color: "#333",
          marginBottom: "12px",
        }}
      >
        Logo da empresa
      </Typography>

      <Box sx={{ marginBottom: "24px" }}>
        <FileUpload
          onFileSelect={handleFileSelect}
          onError={onError}
          loading={uploadingLogo}
          currentImageUrl={logoUrl}
          accept="image/*"
          maxSize={5}
        />
      </Box>

      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 600,
          color: "#333",
          marginBottom: "12px",
        }}
      >
        Cores da empresa
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
