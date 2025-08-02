import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Paper,
} from "@mui/material";
import { colors } from "../../constants/Colors";
import { CompanyType } from "../../types/generalTypes";
import { updatePathRouteKey, getCompanyById } from "../../api/CompanyAPI";
import { getCompanyData } from "../../utils/generalUtil";

interface CompanyLinkSettingsProps {
  company: CompanyType;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
  onCompanyUpdate: (company: CompanyType) => void;
}

const CompanyLinkSettings = ({
  company,
  onSuccess,
  onError,
  onCompanyUpdate,
}: CompanyLinkSettingsProps) => {
  const [pathRouteKey, setPathRouteKey] = useState(company.pathRouteKey || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!pathRouteKey.trim()) {
      onError("Link personalizado é obrigatório");
      return;
    }

    // Validar formato do link (apenas letras, números e hífens)
    const linkRegex = /^[a-zA-Z0-9-]+$/;
    if (!linkRegex.test(pathRouteKey)) {
      onError("Link personalizado deve conter apenas letras, números e hífens");
      return;
    }

    if (pathRouteKey.length < 3) {
      onError("Link personalizado deve ter pelo menos 3 caracteres");
      return;
    }

    if (pathRouteKey.length > 20) {
      onError("Link personalizado deve ter no máximo 20 caracteres");
      return;
    }

    setSaving(true);
    try {
      const companyData = getCompanyData();
      const result = await updatePathRouteKey(
        companyData.companyId || 0,
        pathRouteKey.trim()
      );

      if (result.success) {
        const updatedCompany = await getCompanyById(
          companyData?.companyId?.toString() ?? ""
        );
        if (updatedCompany) {
          onCompanyUpdate(updatedCompany);
        }

        onSuccess(
          result.message || "Link personalizado atualizado com sucesso!"
        );
      } else {
        onError(result.message || "Erro ao atualizar link personalizado");
      }
    } catch (error) {
      onError("Erro ao atualizar link personalizado. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  const currentLink = `anotareservas.com/${company.pathRouteKey}`;
  const newLink = `anotareservas.com/${pathRouteKey}`;

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
        Link Personalizado
      </Typography>

      <Typography
        sx={{
          fontSize: "14px",
          color: "#666",
          marginBottom: "24px",
        }}
      >
        Personalize o link da sua página de reservas para ficar mais
        profissional e fácil de lembrar.
      </Typography>
      <Box sx={{ marginBottom: "24px" }}>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#333",
            marginBottom: "8px",
          }}
        >
          Link atual
        </Typography>
        <Paper
          sx={{
            padding: "16px",
            backgroundColor: "#f5f5f5",
            border: "1px solid #e0e0e0",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontFamily: "monospace",
              color: "#666",
            }}
          >
            {currentLink}
          </Typography>
        </Paper>
      </Box>

      {/* Novo Link */}
      <Box sx={{ marginBottom: "24px" }}>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#333",
            marginBottom: "8px",
          }}
        >
          Novo link personalizado
        </Typography>
        <TextField
          fullWidth
          value={pathRouteKey}
          onChange={(e) => setPathRouteKey(e.target.value.toLowerCase())}
          placeholder="exemplo: minha-empresa"
          variant="outlined"
          disabled={saving}
          helperText="Apenas letras, números e hífens (3-20 caracteres)"
        />
      </Box>
      {pathRouteKey && pathRouteKey !== company.pathRouteKey && (
        <Box sx={{ marginBottom: "24px" }}>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              color: "#333",
              marginBottom: "8px",
            }}
          >
            Seu novo link será:
          </Typography>
          <Paper
            sx={{
              padding: "16px",
              backgroundColor: "#e8f5e8",
              border: "1px solid #4caf50",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontFamily: "monospace",
                color: "#2e7d32",
                fontWeight: 600,
              }}
            >
              {newLink}
            </Typography>
          </Paper>
        </Box>
      )}
      {pathRouteKey && !/^[a-zA-Z0-9-]+$/.test(pathRouteKey) && (
        <Alert severity="warning" sx={{ marginBottom: "16px" }}>
          Link personalizado deve conter apenas letras, números e hífens
        </Alert>
      )}
      {pathRouteKey && pathRouteKey.length < 3 && (
        <Alert severity="warning" sx={{ marginBottom: "16px" }}>
          Link personalizado deve ter pelo menos 3 caracteres
        </Alert>
      )}
      {pathRouteKey && pathRouteKey.length > 20 && (
        <Alert severity="warning" sx={{ marginBottom: "16px" }}>
          Link personalizado deve ter no máximo 20 caracteres
        </Alert>
      )}
      <Button
        variant="contained"
        onClick={handleSave}
        disabled={
          saving ||
          !pathRouteKey.trim() ||
          pathRouteKey === company.pathRouteKey ||
          !/^[a-zA-Z0-9-]+$/.test(pathRouteKey) ||
          pathRouteKey.length < 3 ||
          pathRouteKey.length > 20
        }
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
          "Atualizar Link"
        )}
      </Button>
    </Box>
  );
};

export default CompanyLinkSettings;
