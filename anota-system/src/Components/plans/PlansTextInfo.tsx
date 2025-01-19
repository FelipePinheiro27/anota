import React from "react";
import { Box, Typography } from "@mui/material";
import UnderLine from "../../images/underline.svg";
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
        lineHeight={1.2}
        fontSize={isMobile ? "36px" : "67px"}
        textAlign="left"
      >
        Sistema de Agendamentos de Quadras
      </Typography>
      <br /> <br /> <br />
      <Typography
        color="#6B7280"
        fontFamily="Manrope"
        fontWeight={500}
        fontSize={isMobile ? "20px" : "32px"}
        textAlign="left"
      >
        Gerencie suas reservas de forma
      </Typography>
      <Box marginTop={isMobile ? "10px" : "-10px"}>
        <Typography
          fontFamily="Manrope"
          fontWeight={700}
          fontSize={isMobile ? "20px" : "32px"}
          textAlign="left"
          marginBottom={isMobile ? "-5px" : "-10px"}
        >
          simples e eficiente
        </Typography>
        <img
          src={UnderLine}
          alt="Linha abaixo"
          style={{
            width: isMobile ? "180px" : "270px",
            display: isMobile ? "block" : "inline",
            margin: "0",
          }}
        />
      </Box>
      <Box
        onClick={handleScroll}
        marginTop={isMobile ? "40px" : "80px"}
        width={isMobile ? "205px" : "295px"}
        borderBottom="1.2px solid #22303E"
        display="flex"
        justifyContent={isMobile ? "center" : "flex-start"}
        alignItems="center"
        sx={{
          cursor: "pointer",
          opacity: 0.9,
          "&:hover": {
            opacity: 1,
          },
        }}
      >
        <Typography
          color="#22303E"
          fontFamily="Manrope"
          fontWeight={300}
          lineHeight={1.2}
          fontSize={isMobile ? "20px" : "30px"}
          textAlign="left"
        >
          Confira nossos planos
        </Typography>
        <img
          src={Arrow}
          alt="Nossos planos"
          style={{
            marginTop: isMobile ? "0" : "5px",
            opacity: 0.8,
          }}
        />
      </Box>
    </>
  );
};

export default PlansTextInfo;
