import React from "react";
import { Box, Typography } from "@mui/material";
import UnderLine from "../../images/underline.svg";
import Arrow from "../../images/arrow.svg";

const PlansTextInfo = () => {
  const handleScroll = () => {
    window.scrollBy({
      top: window.innerHeight + 50,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Typography
        letterSpacing="0.1px"
        fontWeight={500}
        lineHeight={1.2}
        fontSize="67px"
      >
        Sistema de Agendamentos de Quadras
      </Typography>
      <br /> <br /> <br />
      <Typography
        color="#6B7280"
        fontFamily="Manrope"
        fontWeight={500}
        fontSize="32px"
      >
        Gerencie suas reservas de forma
      </Typography>
      <Box marginTop="-10px">
        <Typography
          fontFamily="Manrope"
          fontWeight={700}
          fontSize="32px"
          marginBottom="-10px"
        >
          simples e eficiente
        </Typography>
        <img src={UnderLine} alt="Linha abaixo" style={{ width: "270px" }} />
      </Box>
      <Box
        onClick={handleScroll}
        marginTop="80px"
        width="295px"
        borderBottom="1.2px solid #22303E"
        display="flex"
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
          fontSize="30px"
        >
          Confira nossos planos
        </Typography>
        <img
          src={Arrow}
          alt="Nossos planos"
          style={{ marginTop: "5px", opacity: 0.8 }}
        />
      </Box>
    </>
  );
};

export default PlansTextInfo;
