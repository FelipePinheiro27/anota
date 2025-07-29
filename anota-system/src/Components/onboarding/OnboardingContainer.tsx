import React from "react";
import { Box, Typography, Snackbar, Alert } from "@mui/material";
import { useOnboarding } from "../../hooks/useOnboarding";
import OnboardingStep from "./OnboardingStep";
import CustomLinkStep from "./CustomLinkStep";
import CourtStep from "./CourtStep";
import ScheduleStep from "./ScheduleStep";
import FinalStep from "./FinalStep";

interface OnboardingContainerProps {
  onComplete?: () => void;
}

const OnboardingContainer = ({ onComplete }: OnboardingContainerProps) => {
  const {
    stepsCompleted,
    company,
    snackbar,
    completeStep,
    updateCompany,
    showSnackbar,
    hideSnackbar,
  } = useOnboarding();

  const handleStep1Complete = (updatedCompany: any) => {
    completeStep(1);
    updateCompany(updatedCompany);
  };

  const handleStep2Complete = () => {
    completeStep(2);
  };

  const handleStep3Complete = () => {
    completeStep(3);
  };

  const handleSuccess = (message: string) => {
    showSnackbar(message, "success");
  };

  const handleError = (message: string) => {
    showSnackbar(message, "error");
  };

  const handleCopyLink = async () => {
    const publicLink = `anotareservas.com/${company?.pathRouteKey}`;
    try {
      await navigator.clipboard.writeText(publicLink);
      handleSuccess("Link copiado para a área de transferência!");
    } catch (error) {
      handleError("Erro ao copiar link");
    }
  };

  const handleViewPage = () => {
    const publicLink = `https://anotareservas.com/${company?.pathRouteKey}`;
    window.open(publicLink, "_blank");
  };

  const handleCompleteOnboarding = () => {
    handleSuccess("Onboarding concluído! Redirecionando para o dashboard...");

    setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 2000);
  };

  return (
    <Box
      sx={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "40px 20px",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "32px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e0e0e0",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            textAlign: "center",
            marginBottom: "32px",
            color: "#22303E",
            fontSize: { xs: "24px", md: "28px" },
          }}
        >
          Configure sua agenda em 2 minutos para começar a receber reservas
        </Typography>
        <OnboardingStep
          stepNumber={1}
          title="Escolha seu link personalizado"
          isCompleted={stepsCompleted.step1}
        >
          {!stepsCompleted.step1 && (
            <CustomLinkStep
              onComplete={handleStep1Complete}
              onError={handleError}
              onSuccess={handleSuccess}
            />
          )}
        </OnboardingStep>
        <OnboardingStep
          stepNumber={2}
          title="Cadastre sua primeira quadra"
          isCompleted={stepsCompleted.step2}
        >
          {!stepsCompleted.step2 && (
            <CourtStep
              onComplete={handleStep2Complete}
              onError={handleError}
              onSuccess={handleSuccess}
              isEnabled={stepsCompleted.step1}
            />
          )}
        </OnboardingStep>
        <OnboardingStep
          stepNumber={3}
          title="Defina seus horários e preços"
          isCompleted={stepsCompleted.step3}
        >
          {!stepsCompleted.step3 && (
            <ScheduleStep
              onComplete={handleStep3Complete}
              onSuccess={handleSuccess}
              isEnabled={stepsCompleted.step2}
            />
          )}
        </OnboardingStep>
        {stepsCompleted.step1 &&
          stepsCompleted.step2 &&
          stepsCompleted.step3 &&
          company && (
            <OnboardingStep
              stepNumber={4}
              title="Receba seu link mágico!"
              isCompleted={true}
            >
              <FinalStep
                company={company}
                onCopyLink={handleCopyLink}
                onViewPage={handleViewPage}
                onCompleteOnboarding={handleCompleteOnboarding}
              />
            </OnboardingStep>
          )}
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={hideSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={hideSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OnboardingContainer;
