import React from "react";
import { Box, Typography } from "@mui/material";
import Right from "../../images/right.svg";
import RightWhite from "../../images/rightWhite.svg";

const messageData = [
  "Olá, gostaria de saber mais sobre o plano básico anual.",
  "Olá, gostaria de saber mais sobre o plano avançado anual.",
  "Olá, gostaria de saber mais sobre o plano pro anual.",
];

const PlansCardYear = () => {
  const redirectToWhatsApp = (planType: number) => {
    const phone = "5588992429813";
    const message = messageData[planType];
    const encodedMessage = encodeURIComponent(message);

    window.location.href = `https://wa.me/${phone}?text=${encodedMessage}`;
  };

  return (
    <>
      <Box
        padding="0px 40px"
        width="220px"
        height="517px"
        borderRadius="19px"
        border="1px solid #BCBCBC"
        sx={{ background: "#fff", position: "relative" }}
      >
        <Typography
          letterSpacing="0.1px"
          fontWeight={600}
          lineHeight={1.2}
          fontFamily="sans-serif"
          fontSize="34px"
          marginTop="40px"
        >
          Básico
        </Typography>
        <Typography
          fontFamily="sans-serif"
          fontWeight={300}
          fontSize="14px"
          marginTop="10px"
        >
          Ideal para Beach Clubs, proporcione a melhor experiência para o seu
          cliente.
        </Typography>
        <Box display="flex" alignItems="center" marginTop="25px">
          <Typography
            color="#226FE2"
            fontFamily="sans-serif"
            fontWeight={400}
            fontSize="22px"
          >
            R$
          </Typography>
          <Typography
            color="#226FE2"
            fontFamily="sans-serif"
            fontWeight={600}
            marginLeft="8px"
            marginTop="-10px"
            fontSize="46px"
          >
            34,90
          </Typography>
        </Box>
        <Typography
          color="#22303E"
          fontFamily="sans-serif"
          fontWeight={300}
          fontSize="14px"
        >
          R$ 419,00 ao ano em até 12x no cartão
        </Typography>

        <Box display="flex" alignItems="center" gap="8px" marginTop="25px">
          <img src={Right} alt="Correto" style={{ width: "22px" }} />
          <Typography
            color="#22303E"
            fontFamily="sans-serif"
            fontWeight={300}
            fontSize="14px"
          >
            <strong>1 quadra </strong> cadastrada
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap="8px">
          <img src={Right} alt="Correto" style={{ width: "22px" }} />
          <Typography
            color="#22303E"
            fontFamily="sans-serif"
            fontWeight={300}
            fontSize="14px"
            width="260px"
          >
            <strong>Plataforma personalizada</strong>
          </Typography>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          gap="8px"
          sx={{
            position: "absolute",
            bottom: "40px",
            width: "100%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Box
            sx={{
              background: "linear-gradient(to right, #226FE2, #0033FF)",
              color: "#fff",
              padding: "7px 60px",
              borderRadius: "43px",
              cursor: "pointer",
            }}
            onClick={() => redirectToWhatsApp(0)}
          >
            <Typography
              fontFamily="sans-serif"
              fontWeight={600}
              fontSize="14px"
            >
              Teste grátis
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        padding="0 40px"
        width="220px"
        height="517px"
        borderRadius="19px"
        border="1px solid #BCBCBC"
        sx={{ background: "#fff", position: "relative" }}
      >
        <Typography
          letterSpacing="0.1px"
          fontWeight={600}
          lineHeight={1.2}
          marginTop="40px"
          fontFamily="sans-serif"
          fontSize="34px"
        >
          Avançado
        </Typography>
        <Typography
          fontFamily="sans-serif"
          fontWeight={300}
          fontSize="14px"
          marginTop="10px"
        >
          Ideal para Beach Clubs, proporcione a melhor experiência para o seu
          cliente.
        </Typography>
        <Box display="flex" alignItems="center" marginTop="25px">
          <Typography
            color="#226FE2"
            fontFamily="sans-serif"
            fontWeight={400}
            fontSize="22px"
          >
            R$
          </Typography>
          <Typography
            color="#226FE2"
            fontFamily="sans-serif"
            fontWeight={600}
            marginLeft="8px"
            marginTop="-10px"
            fontSize="46px"
          >
            49,90
          </Typography>
        </Box>
        <Typography
          color="#22303E"
          fontFamily="sans-serif"
          fontWeight={300}
          fontSize="14px"
        >
          R$ 599,00 ao ano em até 12x no cartão
        </Typography>
        <Box display="flex" alignItems="center" gap="8px" marginTop="25px">
          <img src={Right} alt="Correto" style={{ width: "22px" }} />
          <Typography
            color="#22303E"
            fontFamily="sans-serif"
            fontWeight={300}
            fontSize="14px"
          >
            <strong>3 quadras </strong> cadastradas
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="8px">
          <img src={Right} alt="Correto" style={{ width: "22px" }} />
          <Typography
            color="#22303E"
            fontFamily="sans-serif"
            fontWeight={300}
            fontSize="14px"
            width="260px"
          >
            <strong>Plataforma personalizada</strong>
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="8px">
          <img src={Right} alt="Correto" style={{ width: "22px" }} />
          <Typography
            color="#22303E"
            fontFamily="sans-serif"
            fontWeight={300}
            fontSize="14px"
            width="260px"
          >
            <strong>Agendamento programado</strong>
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          gap="8px"
          sx={{
            position: "absolute",
            bottom: "40px",
            width: "100%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Box
            sx={{
              background: "linear-gradient(to right, #226FE2, #0033FF)",
              color: "#fff",
              padding: "7px 60px",
              borderRadius: "43px",
              cursor: "pointer",
            }}
            onClick={() => redirectToWhatsApp(1)}
          >
            <Typography
              fontFamily="sans-serif"
              fontWeight={600}
              fontSize="14px"
            >
              Teste grátis
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        padding="0 40px"
        width="220px"
        height="517px"
        borderRadius="19px"
        border="1px solid #BCBCBC"
        color="#fff"
        sx={{ background: "#226FE2", position: "relative" }}
      >
        <Typography
          letterSpacing="0.1px"
          fontWeight={600}
          lineHeight={1.2}
          marginTop="40px"
          fontFamily="sans-serif"
          fontSize="34px"
        >
          Pro
        </Typography>
        <Typography
          fontFamily="sans-serif"
          fontWeight={300}
          fontSize="14px"
          marginTop="10px"
        >
          Ideal para Beach Clubs, proporcione a melhor experiência para o seu
          cliente.
        </Typography>
        <Box display="flex" alignItems="center" marginTop="25px">
          <Typography
            color="#fff"
            fontFamily="sans-serif"
            fontWeight={400}
            fontSize="22px"
          >
            R$
          </Typography>
          <Typography
            color="#fff"
            fontFamily="sans-serif"
            fontWeight={600}
            marginLeft="8px"
            marginTop="-10px"
            fontSize="46px"
          >
            104,90
          </Typography>
        </Box>
        <Typography
          color="#fff"
          fontFamily="sans-serif"
          fontWeight={300}
          fontSize="14px"
        >
          R$ 1.259,00 ao ano em até 12x no cartão
        </Typography>
        <Box display="flex" alignItems="center" gap="8px" marginTop="25px">
          <img src={RightWhite} alt="Correto" style={{ width: "22px" }} />
          <Typography
            color="#fff"
            fontFamily="sans-serif"
            fontWeight={300}
            fontSize="14px"
          >
            <strong>8 quadras </strong> cadastradas
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="8px">
          <img src={RightWhite} alt="Correto" style={{ width: "22px" }} />
          <Typography
            color="#fff"
            fontFamily="sans-serif"
            fontWeight={300}
            fontSize="14px"
            width="260px"
          >
            <strong>Plataforma personalizada</strong>
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="8px">
          <img src={RightWhite} alt="Correto" style={{ width: "22px" }} />
          <Typography
            color="#fff"
            fontFamily="sans-serif"
            fontWeight={300}
            fontSize="14px"
            width="260px"
          >
            <strong>Agendamento programado</strong>
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          gap="8px"
          sx={{
            position: "absolute",
            bottom: "40px",
            width: "100%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Box
            sx={{
              background: "#fff",
              color: "#226FE2",
              padding: "7px 60px",
              borderRadius: "43px",
              cursor: "pointer",
            }}
            onClick={() => redirectToWhatsApp(2)}
          >
            <Typography
              fontFamily="sans-serif"
              fontWeight={600}
              fontSize="14px"
            >
              Teste grátis
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PlansCardYear;
