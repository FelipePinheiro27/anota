import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import Logo from "../../images/LogoHeader.svg";

const PlansHeader = () => {
  return (
    <Box
      sx={{
        padding: "10px 40px",
        borderTop: "0.2px solid rgba(0, 0, 0, 0.2)",
        borderBottom: "0.2px solid rgba(0, 0, 0, 0.2)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#22303E",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "7px" }}>
        <img
          src={Logo}
          alt="logo da empresa"
          style={{ width: "55px", height: "55px" }}
        />
        <Typography fontWeight={300} fontSize="18px">
          Anota Reservas
        </Typography>
      </Box>
      <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
        Acessar minha conta
      </Link>
    </Box>
  );
};

export default PlansHeader;
