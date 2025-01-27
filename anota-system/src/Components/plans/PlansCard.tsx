import React from "react";
import { Box, Typography } from "@mui/material";
import Right from "../../images/right.svg";
import { colors } from "../../constants/Colors";

const PlansCard = () => {
  const redirectToWhatsApp = () => {
    const phone = "5588992429813";
    const message = "Olá, gostaria de saber mais sobre o plano mensal.";
    const encodedMessage = encodeURIComponent(message);

    window.location.href = `https://wa.me/${phone}?text=${encodedMessage}`;
  };

  return (
    <Box
      padding="20px 40px"
      width="280px"
      borderRadius="15px"
      boxShadow="hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px"
    >
      <Typography
        color="#22303E"
        fontFamily="Manrope"
        fontWeight={600}
        fontSize="26px"
      >
        Mensal
      </Typography>
      <Typography
        color="#6B7280"
        fontFamily="Inter"
        fontWeight={300}
        fontSize="16px"
        marginTop="10px"
      >
        Ideal para Beach Clubs, proporcione a melhor experiência para o seu
        cliente
      </Typography>
      <Box display="flex" alignItems="center" marginTop="15px">
        <Typography
          color="#22303E"
          fontFamily="Manrope"
          fontWeight={400}
          fontSize="18px"
        >
          R$
        </Typography>
        <Typography
          color="#22303E"
          fontFamily="Manrope"
          fontWeight={600}
          marginLeft="5px"
          fontSize="28px"
        >
          49,90
        </Typography>
      </Box>
      <Typography
        color="#6B7280"
        fontFamily="Manrope"
        fontWeight={300}
        fontSize="16px"
        marginTop="-10px"
      >
        Com primeiro mês <strong>grátis</strong>
      </Typography>
      <Box display="flex" alignItems="center" gap="8px" marginTop="20px">
        <img src={Right} alt="Correto" style={{ width: "32px" }} />
        <Typography
          color="#6B7280"
          fontFamily="Manrope"
          fontWeight={300}
          fontSize="16px"
        >
          <strong>3 quadras </strong> cadastradas
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" gap="8px" marginTop="-6px">
        <img src={Right} alt="Correto" style={{ width: "32px" }} />
        <Typography
          color="#6B7280"
          fontFamily="Manrope"
          fontWeight={300}
          fontSize="16px"
          marginTop="18px"
          width="260px"
        >
          Link de agendamento com cores e logo da sua empresa
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" gap="8px" marginTop="10px">
        <img src={Right} alt="Correto" style={{ width: "32px" }} />
        <Typography
          color="#6B7280"
          fontFamily="Manrope"
          fontWeight={300}
          fontSize="16px"
        >
          Clientes <strong>ilimitados</strong>
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" gap="8px" marginTop="10px">
        <img src={Right} alt="Correto" style={{ width: "32px" }} />
        <Typography
          color="#6B7280"
          fontFamily="Manrope"
          fontWeight={300}
          fontSize="16px"
        >
          Modalidades <strong>costumizáveis</strong>
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" gap="8px" marginTop="30px">
        <Box
          sx={{
            background: colors.green,
            color: "#fff",
            padding: "7px 60px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          onClick={redirectToWhatsApp}
        >
          <Typography fontFamily="Manrope" fontWeight={600} fontSize="16px">
            Teste grátis
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PlansCard;
