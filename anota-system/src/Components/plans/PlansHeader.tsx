import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import Logo from "../../images/logo_anota.svg";
import useIsMobile from "../../hooks/useIsMobile";

const PlansHeader = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        padding: isMobile ? "20px 30px" : "20px 120px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: isMobile ? "center" : "left",
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
            width: "160px",
          }}
        />
      </Box>
      <Box onClick={() => navigate("/login")}>
        <Typography
          style={{
            cursor: "pointer",
            color: "#fff",
            fontSize: "14px",
            padding: "10px 25px",
            borderRadius: "30px",
            background: "linear-gradient(to right, #226FE2, #0033FF)",
            fontWeight: 510,
          }}
        >
          Acessar minha conta
        </Typography>
      </Box>
    </Box>
  );
};

export default PlansHeader;
