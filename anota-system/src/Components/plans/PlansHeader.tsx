import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import Logo from "../../images/LogoHeader.svg";
import useIsMobile from "../../hooks/useIsMobile";

const PlansHeader = () => {
  const isMobile = useIsMobile();

  return (
    <Box
      sx={{
        padding: isMobile ? "10px 20px" : "10px 40px",
        borderTop: "0.2px solid rgba(0, 0, 0, 0.2)",
        borderBottom: "0.2px solid rgba(0, 0, 0, 0.2)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: isMobile ? "center" : "left",
        gap: isMobile ? "10px" : "0",
        color: "#22303E",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "7px",
          justifyContent: isMobile ? "center" : "flex-start",
        }}
      >
        <img
          src={Logo}
          alt="logo da empresa"
          style={{
            width: isMobile ? "45px" : "55px",
            height: isMobile ? "45px" : "55px",
          }}
        />
        <Typography fontWeight={300} fontSize={isMobile ? "16px" : "18px"}>
          Anota Reservas
        </Typography>
      </Box>
      <Link
        to="/login"
        style={{
          textDecoration: "none",
          color: "inherit",
          fontSize: isMobile ? "14px" : "16px",
          fontWeight: 500,
        }}
      >
        Acessar minha conta
      </Link>
    </Box>
  );
};

export default PlansHeader;
