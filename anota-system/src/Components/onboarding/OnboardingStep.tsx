import React from "react";
import { Box, Typography } from "@mui/material";
import { colors } from "../../constants/Colors";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface OnboardingStepProps {
  stepNumber: number;
  title: string;
  isCompleted: boolean;
  children?: React.ReactNode;
}

const OnboardingStep = ({ stepNumber, title, isCompleted, children }: OnboardingStepProps) => {
  return (
    <Box sx={{ marginBottom: "32px" }}>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
        <Box
          sx={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: isCompleted ? colors.blue : "#e0e0e0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "12px",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {isCompleted ? <CheckCircleIcon /> : stepNumber}
        </Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: isCompleted ? colors.blue : "#22303E",
          }}
        >
          {title}
        </Typography>
      </Box>
      {children}
    </Box>
  );
};

export default OnboardingStep; 