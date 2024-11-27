import React, { useContext } from "react";
import { Box, createTheme, ThemeProvider, Typography } from "@mui/material";
import CompanyLogo from "../../images/levelBeach.png";
import ReservationsContainer from "../../components/reservations/ReservationsContainer";
import { useRetrieveCompany } from "../../hooks/useRetrieveCompany";
import { ClientReservationContext } from "../../context/ClientReservationProvider";

const theme = createTheme({
  typography: {
    fontFamily: "inherit",
  },
});

const Home = () => {
  const { company } = useContext(ClientReservationContext) || {};
  useRetrieveCompany();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      gap="15px"
    >
      <div>
        <img src={CompanyLogo} alt="Level Beach Club" />
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
      <Box position="absolute" bottom="20px" textAlign="center">
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
