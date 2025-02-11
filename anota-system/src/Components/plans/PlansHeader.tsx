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
        padding: isMobile ? "15px 20px" : "20px 80px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        // flexDirection: isMobile ? "column" : "row",
        textAlign: "center",
        color: "#22303E",
        gap: isMobile ? "10px" : "0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "7px",
          justifyContent: "center",
        }}
      >
        <img
          src={Logo}
          alt="logo da empresa"
          style={{
            width: isMobile ? "140px" : "160px",
          }}
        />
      </Box>
      <Box
        onClick={() => navigate("/login")}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            cursor: "pointer",
            color: "#fff",
            fontSize: isMobile ? "13px" : "14px",
            padding: isMobile ? "8px 20px" : "10px 25px",
            borderRadius: "30px",
            background: "linear-gradient(to right, #226FE2, #0033FF)",
            fontWeight: 510,
            textAlign: "center",
          }}
        >
          {isMobile ? <>Acessar conta</> : <>Acessar minha conta</>}
        </Typography>
      </Box>
    </Box>
  );
};

export default PlansHeader;
