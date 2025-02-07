import React from "react";
import { Box, Typography } from "@mui/material";
import Arrow from "../../images/arrow.svg";
import useIsMobile from "../../hooks/useIsMobile";

const PlansTextInfo = () => {
  const isMobile = useIsMobile();

  const handleScroll = () => {
    window.scrollBy({
      top: isMobile ? window.innerHeight + 180 : window.innerHeight + 50,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Typography
        letterSpacing="0.1px"
        fontWeight={500}
        lineHeight={1.1}
        color="#22303E"
        width="400px"
        fontFamily="system-ui"
        fontSize={isMobile ? "36px" : "67px"}
        textAlign="left"
      >
        Sistema de agendamentos de quadras
      </Typography>
      <Typography
        color="#6B7280"
        fontWeight={500}
        width="360px"
        fontFamily="system-ui"
        fontSize={isMobile ? "24px" : "28px"}
        marginTop="20px"
        textAlign="left"
      >
        Gerencie suas reservas de forma simples e eficiente!
      </Typography>

      <Box
        onClick={handleScroll}
        marginTop="30px"
        width="275px"
        display="flex"
        sx={{
          cursor: "pointer",
        }}
      >
        <Typography
          sx={{
            textDecoration: "none",
            color: "#fff",
            fontSize: "16px",
            padding: "11px 30px",
            borderRadius: "30px",
            background: "linear-gradient(to right, #226FE2, #0033FF)",
            fontWeight: 510,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "18px",
            cursor: "pointer",
          }}
        >
          Confira nossos planos{" "}
          <img src={Arrow} width="20px" alt="Nossos planos" />
        </Typography>
      </Box>
    </>
  );
};

export default PlansTextInfo;
