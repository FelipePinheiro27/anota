import React from "react";
import { Box } from "@mui/material";
import WhiteLogo from "../../images/whiteLogo.svg";
import LinkedinLogo from "../../images/linkedin.svg";
import InstagramLogo from "../../images/instagram.svg";
import useIsMobile from "../../hooks/useIsMobile";

const Footer = () => {
  const isMobile = useIsMobile();

  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #226FE2, #0033FF)",
        width: "100%",
        height: isMobile ? "120px" : "180px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: isMobile ? "center" : "space-around",
          alignItems: "center",
          width: "100%",
          gap: isMobile ? "15px" : "0",
        }}
      >
        <Box
          component="img"
          src={WhiteLogo}
          alt="Logo da Anota Reservas"
          sx={{ height: isMobile ? "40px" : "auto" }}
        />
        <Box
          sx={{
            display: "flex",
            gap: "15px",
            marginTop: isMobile ? "10px" : "0",
          }}
        >
          <Box
            component="img"
            src={LinkedinLogo}
            alt="LinkedIn"
            sx={{ height: isMobile ? "24px" : "30px", cursor: "pointer" }}
          />
          <Box
            component="img"
            src={InstagramLogo}
            alt="Instagram"
            sx={{ height: isMobile ? "24px" : "30px", cursor: "pointer" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
