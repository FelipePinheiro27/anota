import React from "react";
import CourtsOptions from "../../components/court/courtsOptions/CourtsOptions";
import { Box, Typography } from "@mui/material";
import useIsMobile from "../../hooks/useIsMobile";
import ClientHeader from "../../components/header/clientHeader/ClientHeader";

const Reservation = () => {
  const isMobile = useIsMobile();
  console.log(isMobile);

  return (
    <Box>
      <ClientHeader previewsPage="/" />
      <Box sx={{ padding: "30px 40px" }}>
        <Box margin={"30px 0"}>
          <Typography
            sx={{ fontWeight: 600, letterSpacing: "0.2" }}
            fontSize="18px"
            color="#22303E"
          >
            Escolha uma Opção
          </Typography>
        </Box>
        <Box marginTop="40px">
          <CourtsOptions />
        </Box>
      </Box>
    </Box>
  );
};

export default Reservation;
