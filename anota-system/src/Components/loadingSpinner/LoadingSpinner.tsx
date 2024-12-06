import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingSpinnerProps {
  message?: string;
  color?: string;
}

const LoadingSpinner = ({
  message = "Carregando...",
  color,
}: LoadingSpinnerProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress
        sx={{
          color: { color },
          marginBottom: 2,
        }}
      />
      <Typography variant="h6" color="#22303e">
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;
