import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getCompanyData } from "../../utils/generalUtil";
import { getCompanyById } from "../../api/CompanyAPI";
import { CompanyType } from "../../types/generalTypes";
import CompanyBrandingSettings from "../../Components/companySettings/CompanyBrandingSettings";
import CompanyLinkSettings from "../../Components/companySettings/CompanyLinkSettings";
import LoadingSpinner from "../../Components/loadingSpinner/LoadingSpinner";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const CompanySettings = () => {
  const [value, setValue] = useState(0);
  const [company, setCompany] = useState<CompanyType | null>(null);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const loadCompany = async () => {
      try {
        const companyData = getCompanyData();
        if (!companyData.companyId) {
          return;
        }

        const companyInfo = await getCompanyById(
          companyData.companyId.toString()
        );
        if (companyInfo) {
          setCompany(companyInfo);
        }
      } catch (error) {
        console.error("Erro ao carregar dados da empresa:", error);
        setSnackbar({
          open: true,
          message: "Erro ao carregar dados da empresa",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    loadCompany();
  }, [navigate]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSuccess = (message: string) => {
    setSnackbar({
      open: true,
      message,
      severity: "success",
    });
  };

  const handleError = (message: string) => {
    setSnackbar({
      open: true,
      message,
      severity: "error",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleCompanyUpdate = (updatedCompany: CompanyType) => {
    setCompany(updatedCompany);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <LoadingSpinner />
      </Box>
    );
  }

  if (!company) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h6" color="error">
          Empresa não encontrada
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          marginBottom: "32px",
          color: "#22303E",
          textAlign: "center",
        }}
      >
        Configurações da Empresa
      </Typography>

      <Paper sx={{ width: "100%", borderRadius: "12px" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleTabChange}
            aria-label="configurações da empresa"
            sx={{
              "& .MuiTab-root": {
                fontWeight: 600,
                fontSize: "16px",
              },
            }}
          >
            <Tab label="Marca e Identidade" />
            <Tab label="Link Personalizado" />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <CompanyBrandingSettings
            company={company}
            onSuccess={handleSuccess}
            onError={handleError}
            onCompanyUpdate={handleCompanyUpdate}
          />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <CompanyLinkSettings
            company={company}
            onSuccess={handleSuccess}
            onError={handleError}
            onCompanyUpdate={handleCompanyUpdate}
          />
        </TabPanel>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CompanySettings;
