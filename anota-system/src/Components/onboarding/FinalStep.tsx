import React from "react";
import {
  Box,
  Typography,
  Button,
} from "@mui/material";
import { colors } from "../../constants/Colors";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { CompanyType } from "../../types/generalTypes";

interface FinalStepProps {
  company: CompanyType;
  onCopyLink: () => void;
  onViewPage: () => void;
  onCompleteOnboarding: () => void;
}

const FinalStep = ({ company, onCopyLink, onViewPage, onCompleteOnboarding }: FinalStepProps) => {
  const publicLink = `anotareservas.com/${company?.pathRouteKey}`;

  return (
    <Box sx={{ marginLeft: "44px" }}>
      <Typography
        sx={{
          fontWeight: 500,
          marginBottom: "16px",
          color: "#22303E",
        }}
      >
        Parabéns! Sua página de agendamento está pronta:
      </Typography>

      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          padding: "12px 16px",
          borderRadius: "8px",
          border: "1px solid #e0e0e0",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontFamily: "monospace",
            fontWeight: 600,
            color: colors.blue,
            fontSize: "16px",
          }}
        >
          {publicLink}
        </Typography>
        <Button
          onClick={onCopyLink}
          startIcon={<ContentCopyIcon />}
          sx={{
            color: colors.blue,
            textTransform: "none",
            fontWeight: 550,
          }}
        >
          Copiar Link
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: "12px", flexDirection: { xs: "column", sm: "row" } }}>
        <Button
          variant="outlined"
          onClick={onViewPage}
          sx={{
            borderColor: colors.blue,
            color: colors.blue,
            "&:hover": {
              borderColor: colors.darkBlue,
              backgroundColor: "rgba(34, 111, 226, 0.04)",
            },
            fontWeight: 550,
            padding: "12px",
            flex: 1,
          }}
        >
          Ver minha página
        </Button>
        <Button
          variant="contained"
          onClick={onCompleteOnboarding}
          sx={{
            backgroundColor: colors.blue,
            "&:hover": {
              backgroundColor: colors.darkBlue,
            },
            fontWeight: 550,
            padding: "12px",
            flex: 1,
          }}
        >
          Ir para o Dashboard
        </Button>
      </Box>
    </Box>
  );
};

export default FinalStep; 