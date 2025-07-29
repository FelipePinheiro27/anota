import { useState, useEffect } from "react";
import { getCompanyData } from "../utils/generalUtil";
import { getCompanyById } from "../api/CompanyAPI";
import { CompanyType } from "../types/generalTypes";

interface OnboardingState {
  stepsCompleted: {
    step1: boolean;
    step2: boolean;
    step3: boolean;
  };
  company: CompanyType | null;
  snackbar: {
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  };
}

export const useOnboarding = () => {
  const [state, setState] = useState<OnboardingState>({
    stepsCompleted: {
      step1: false,
      step2: false,
      step3: false,
    },
    company: null,
    snackbar: {
      open: false,
      message: "",
      severity: "success",
    },
  });

  useEffect(() => {
    const fetchCompanyData = async () => {
      const companyPartialData = getCompanyData();
      const companyValue = await getCompanyById(
        companyPartialData?.companyId?.toString() ?? ""
      );
      setState(prev => ({ ...prev, company: companyValue }));
    };
    fetchCompanyData();
  }, []);

  const completeStep = (stepNumber: 1 | 2 | 3) => {
    setState(prev => ({
      ...prev,
      stepsCompleted: {
        ...prev.stepsCompleted,
        [`step${stepNumber}`]: true,
      },
    }));
  };

  const updateCompany = (updatedCompany: CompanyType) => {
    setState(prev => ({ ...prev, company: updatedCompany }));
  };

  const showSnackbar = (message: string, severity: "success" | "error" | "info" | "warning" = "success") => {
    setState(prev => ({
      ...prev,
      snackbar: {
        open: true,
        message,
        severity,
      },
    }));
  };

  const hideSnackbar = () => {
    setState(prev => ({
      ...prev,
      snackbar: {
        ...prev.snackbar,
        open: false,
      },
    }));
  };

  return {
    ...state,
    completeStep,
    updateCompany,
    showSnackbar,
    hideSnackbar,
  };
}; 