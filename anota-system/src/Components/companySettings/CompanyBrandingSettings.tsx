import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  FormLabel,
  CircularProgress,
  Divider,
} from "@mui/material";
import { colors } from "../../constants/Colors";
import { CompanyType } from "../../types/generalTypes";
import {
  updateCompanyColors,
  updateCompanyLogo,
  updateCompanyName,
  getCompanyById,
} from "../../api/CompanyAPI";
import { getCompanyData } from "../../utils/generalUtil";
import {
  uploadCompanyLogo,
  getCompanyLogoByUrl,
} from "../../utils/firebaseStorage";
import FileUpload from "../fileUpload/FileUpload";

interface CompanyBrandingSettingsProps {
  company: CompanyType;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
  onCompanyUpdate: (company: CompanyType) => void;
}

const CompanyBrandingSettings = ({
  company,
  onSuccess,
  onError,
  onCompanyUpdate,
}: CompanyBrandingSettingsProps) => {
  const [companyName, setCompanyName] = useState(company.name || "");
  const [primaryColor, setPrimaryColor] = useState(
    company.primaryColor || "#1976d2"
  );
  const [secondaryColor, setSecondaryColor] = useState(
    company.secondaryColor || "#dc004e"
  );
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadExistingLogo = async () => {
      if (company.id) {
        try {
          const existingLogoUrl = await getCompanyLogoByUrl(
            company.logoUrl || null,
            company.id
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
  }, [company.id, company.logoUrl]);

  const handleFileSelect = (file: File) => {
    setLogoFile(file);
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

  const handleSave = async () => {
    if (!companyName.trim()) {
      onError("Nome da empresa é obrigatório");
      return;
    }

    setSaving(true);
    try {
      const companyData = getCompanyData();

      if (companyName !== company.name) {
        const nameResult = await updateCompanyName(
          companyData.companyId || 0,
          companyName
        );

        if (!nameResult.success) {
          onError(nameResult.message || "Erro ao salvar nome da empresa.");
          return;
        }
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
      const updatedCompany = await getCompanyById(
        companyData?.companyId?.toString() ?? ""
      );
      if (updatedCompany) {
        onCompanyUpdate(updatedCompany);
      }

      onSuccess("Configurações da empresa salvas com sucesso!");
    } catch (error) {
      onError("Erro ao salvar configurações da empresa. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          marginBottom: "24px",
          color: "#22303E",
        }}
      >
        Personalize a marca da sua empresa
      </Typography>

      <Box sx={{ marginBottom: "32px" }}>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#333",
            marginBottom: "12px",
          }}
        >
          Nome da empresa
        </Typography>
        <TextField
          fullWidth
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Digite o nome da sua empresa"
          variant="outlined"
          disabled={saving}
        />
      </Box>
      <Divider sx={{ marginBottom: "32px" }} />
      <Box sx={{ marginBottom: "32px" }}>
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
        <FileUpload
          onFileSelect={handleFileSelect}
          onError={onError}
          loading={uploadingLogo}
          currentImageUrl={logoUrl}
          accept="image/*"
          maxSize={5}
        />
      </Box>

      <Divider sx={{ marginBottom: "32px" }} />

      <Box sx={{ marginBottom: "32px" }}>
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
              disabled={saving}
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
              disabled={saving}
              sx={{ flex: 1 }}
            />
          </Box>
        </FormControl>
      </Box>

      <Button
        variant="contained"
        onClick={handleSave}
        disabled={saving || !companyName.trim()}
        sx={{
          backgroundColor: colors.blue,
          "&:hover": {
            backgroundColor: colors.darkBlue,
          },
          fontWeight: 550,
          padding: "12px 32px",
          fontSize: "16px",
        }}
      >
        {saving ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Salvar Configurações"
        )}
      </Button>
    </Box>
  );
};

export default CompanyBrandingSettings;
