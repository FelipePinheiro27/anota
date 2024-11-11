import React from "react";
import CourtsOptions from "../../components/court/courtsOptions/CourtsOptions";
import CompanyLogo from "../../images/levelBeach.png";
import { Box, Typography } from "@mui/material";
import useIsMobile from "../../hooks/useIsMobile";

const Reservation = () => {
  const isMobile = useIsMobile();
  console.log(isMobile);

  return (
    <Box sx={{ padding: "30px 40px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img width={61} src={CompanyLogo} alt="Level Beach Club" />
        <Typography
          sx={{ fontWeight: 500, letterSpacing: "0.2" }}
          fontSize="28px"
          color="#E45609"
        >
          Level Beach Club
        </Typography>
      </Box>
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
  );
};

export default Reservation;
