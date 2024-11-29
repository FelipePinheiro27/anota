import React, { useContext } from "react";
import { Box, createTheme, ThemeProvider, Typography } from "@mui/material";
import CompanyLogo from "../../images/levelBeach.png";
import ReservationsContainer from "../../Components/reservations/ReservationsContainer";
import { useRetrieveCompany } from "../../hooks/useRetrieveCompany";
import { ClientReservationContext } from "../../context/ClientReservationProvider";
import useIsMobile from "../../hooks/useIsMobile";

const theme = createTheme({
  typography: {
    fontFamily: "inherit",
  },
});

const Home = () => {
  const isMobile = useIsMobile();
  const { company } = useContext(ClientReservationContext) || {};
  useRetrieveCompany();

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
            src={CompanyLogo}
            width={isMobile ? "230px" : "300px"}
            alt="Logo da empresa"
          />
        </div>
        <ThemeProvider theme={theme}>
          <Typography
            sx={{ fontWeight: 700, letterSpacing: "0.2" }}
            fontSize="28px"
            color="#E45609"
          >
            {company?.name}
          </Typography>
        </ThemeProvider>
        <ReservationsContainer />
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
