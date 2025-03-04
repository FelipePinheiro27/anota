import React from "react";
import { Box } from "@mui/material";
import WhiteLogo from "../../images/whiteLogo.svg";
import LinkedinLogo from "../../images/linkedin.svg";
import InstagramLogo from "../../images/instagram.svg";
import useIsMobile from "../../hooks/useIsMobile";

const Footer = () => {
  const isMobile = useIsMobile();

  return (
    <footer>
      <Box
        sx={{
          background: "linear-gradient(to right, #226FE2, #0033FF)",
          width: "100%",
          height: isMobile ? "120px" : "180px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "25px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: isMobile ? "center" : "space-around",
            alignItems: "center",
            width: "100%",
            gap: isMobile ? "10px" : "0",
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
              gap: "10px",
              marginTop: isMobile ? "10px" : "0",
            }}
          >
            <a
              href="https://www.linkedin.com/in/anota-reservas-2405ba354"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn da Anota Reservas"
            >
              <Box
                component="img"
                src={LinkedinLogo}
                alt="LinkedIn"
                sx={{ height: isMobile ? "24px" : "30px", cursor: "pointer" }}
              />
            </a>
            <a
              href="https://www.instagram.com/anota_reservas"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Anota Reservas"
            >
              <Box
                component="img"
                src={InstagramLogo}
                alt="Instagram"
                sx={{ height: isMobile ? "24px" : "30px", cursor: "pointer" }}
              />
            </a>
          </Box>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
