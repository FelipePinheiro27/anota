import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import Header, { activeItemType } from "../../Components/header/Header";
import ReservationsTableData from "../../Components/reservationsTableData/ReservationsTableData";
import CompanyCourts from "../../Components/companyCourts/CompanyCourts";
import ScheduleFix from "../../Components/scheduleFix/ScheduleFix";
import CompanySettings from "./CompanySettings";
import OnboardingChecklist from "../../Components/OnboardingChecklist";
import { getCompanyData } from "../../utils/generalUtil";
import { getCompanyById } from "../../api/CompanyAPI";
import { getCourtsByCompany } from "../../api/CourtAPI";
import { CompanyType } from "../../types/generalTypes";
import LoadingSpinner from "../../Components/loadingSpinner/LoadingSpinner";

const Company = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<activeItemType>("Agendamentos");
  const [company, setCompany] = useState<CompanyType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setLoading(true);
        const companyPartialData = getCompanyData();
        const companyValue = await getCompanyById(
          companyPartialData?.companyId?.toString() ?? ""
        );
        setCompany(companyValue);

        if (companyValue) {
          const courts = await getCourtsByCompany(companyValue.id);
          setIsNewUser(courts.length === 0);
        }
      } catch (error) {
        console.error("Erro ao buscar dados da empresa:", error);

        setIsNewUser(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  const handleOnboardingComplete = () => {
    setIsNewUser(false);
  };

  const contentData = {
    Agendamentos: <ReservationsTableData />,
    Quadras: <CompanyCourts />,
    Horários: <ScheduleFix setActiveItem={setActiveItem} />,
    Configurações: <CompanySettings />,
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <LoadingSpinner />
      </Box>
    );
  }

  if (isNewUser) {
    return <OnboardingChecklist onComplete={handleOnboardingComplete} />;
  }

  return (
    <Box>
      <Header activeItem={activeItem} setActiveItem={setActiveItem} />
      <Box sx={{ padding: { xs: "30px 10px ", md: "30px 40px" } }}>
        {contentData[activeItem]}
      </Box>
    </Box>
  );
};

export default Company;
