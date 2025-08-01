import React from "react";
import { Box, Typography } from "@mui/material";
import { useCompanyLogo } from "../../hooks/useCompanyLogo";

interface CompanyLogoProps {
  companyId?: string | number;
  companyName?: string;
  width?: string | number;
  height?: string | number;
  showFallback?: boolean;
  fallbackText?: string;
  style?: React.CSSProperties;
}

const CompanyLogo: React.FC<CompanyLogoProps> = ({
  companyId,
  companyName,
  width = "auto",
  height = "auto",
  showFallback = true,
  fallbackText,
  style = {},
}) => {
  const { logoUrl, loading } = useCompanyLogo(companyId);

  if (loading) {
    return (
      <Box
        sx={{
          width,
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          borderRadius: "4px",
        }}
      >
        <Typography variant="body2" color="textSecondary">
          Carregando...
        </Typography>
      </Box>
    );
  }

  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={`Logo da ${companyName || "empresa"}`}
        style={{
          width,
          height,
          objectFit: "contain",
          ...style,
        }}
      />
    );
  }

  if (showFallback) {
    return (
      <Box
        sx={{
          width,
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          borderRadius: "4px",
          border: "1px solid #e0e0e0",
        }}
      >
        <Typography 
          variant="body2" 
          color="textSecondary"
          sx={{ textAlign: "center", padding: "8px" }}
        >
          {fallbackText || (companyName ? companyName.charAt(0).toUpperCase() : "E")}
        </Typography>
      </Box>
    );
  }

  return null;
};

export default CompanyLogo; 