import React, { useContext } from "react";
import { Box, createTheme, ThemeProvider, Typography } from "@mui/material";
import ReservationsContainer from "../../Components/reservations/ReservationsContainer";
import { useRetrieveCompany } from "../../hooks/useRetrieveCompany";
import { ClientReservationContext } from "../../context/ClientReservationProvider";
import useIsMobile from "../../hooks/useIsMobile";
import LoadingSpinner from "../../Components/loadingSpinner/LoadingSpinner";

const theme = createTheme({
  typography: {
    fontFamily: "inherit",
  },
});

const Home = () => {
  const isMobile = useIsMobile();
  const { company } = useContext(ClientReservationContext) || {};
  const { primaryColor, secondaryColor, pathRouteKey } = company || {};
  useRetrieveCompany();
  const route = `/images/${pathRouteKey}.png`;

  if (!company) {
    return (
      <Box
        minHeight={{ xs: "80vh", md: "100vh" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <LoadingSpinner />
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      minHeight={{ xs: "80vh", md: "100vh" }}
      overflow="hidden"
    >
      <Box
        flexGrow={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <div>
          <img
            src={route}
            width={isMobile ? "230px" : "300px"}
            alt="Logo da empresa"
          />
        </div>
        <ThemeProvider theme={theme}>
          <Typography
            sx={{ fontWeight: 700, letterSpacing: "0.2" }}
            fontSize="28px"
            color={primaryColor}
          >
            {company?.name}
          </Typography>
        </ThemeProvider>
        <ReservationsContainer
          primaryColor={primaryColor || ""}
          secondaryColor={secondaryColor || ""}
        />
      </Box>

      <Box textAlign="center" paddingBottom={isMobile ? 0 : "30px"}>
        <Typography fontSize="12px" color="#22303E">
          Deseja nossa solução em sua empresa?
        </Typography>
        <Typography fontSize="12px" color="#22303E">
          Fale conosco: anota.reservas@gmail.com
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
