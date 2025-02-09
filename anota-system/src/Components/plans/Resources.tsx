import React from "react";
import { Box, Typography } from "@mui/material";
import CalendarLogo from "../../images/calendar.svg";
import CheckedLogo from "../../images/checked.svg";
import ClickLogo from "../../images/click.svg";
import useIsMobile from "../../hooks/useIsMobile";

const Resources = () => {
  const isMobile = useIsMobile();

  return (
    <Box
      padding={isMobile ? "40px 20px" : "50px 120px"}
      sx={{
        color: "#22303E",
        marginTop: isMobile ? "40px" : "70px",
        margin: "0 auto",
        maxWidth: "1350px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          padding: isMobile ? "0 20px" : "0",
        }}
      >
        <Box margin="0 auto" width={isMobile ? "100%" : "65%"}>
          <Typography
            letterSpacing="0.1px"
            fontWeight={500}
            lineHeight={1.2}
            fontSize={isMobile ? "36px" : "57px"}
          >
            Recursos poderosos para impulsionar seus resultados{" "}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          marginTop: "80px",
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{
            position: "relative",
            border: "1px solid #BCBCBC",
            width: "300px",
            height: "285px",
            borderRadius: "19px",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "-30px",
              left: "30px",
              backgroundColor: "#226FE2",
              width: "60px",
              height: "60px",
              display: "flex",
              borderRadius: "12px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src={CalendarLogo}
              alt="Caledário Anota Reservas"
              sx={{
                position: "relative",
                width: "40px",
              }}
            />
          </Box>
          <Box margin="50px 40px">
            <Typography
              letterSpacing="0.1px"
              fontWeight={500}
              lineHeight={1.3}
              fontFamily="System-ui"
              fontSize="26px"
            >
              Seu cliente agenda sozinho
            </Typography>
            <Typography
              letterSpacing="0.2px"
              fontWeight={400}
              lineHeight={1.3}
              fontFamily="System-ui"
              marginTop="25px"
              fontSize="14px"
            >
              Com a nossa plataforma de agendamentos online, seus clientes podem
              marcar compromissos de forma rápida e fácil, no horário que
              preferirem.
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            position: "relative",
            border: "1px solid #BCBCBC",
            width: "300px",
            height: "285px",
            borderRadius: "19px",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "-30px",
              left: "30px",
              backgroundColor: "#226FE2",
              width: "60px",
              height: "60px",
              display: "flex",
              borderRadius: "12px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src={CheckedLogo}
              alt="Check Anota Reservas"
              sx={{
                position: "relative",
                width: "40px",
              }}
            />
          </Box>
          <Box margin="50px 40px">
            <Typography
              letterSpacing="0.1px"
              fontWeight={500}
              lineHeight={1.3}
              fontFamily="System-ui"
              fontSize="26px"
            >
              Agendamento programado
            </Typography>
            <Typography
              letterSpacing="0.2px"
              fontWeight={400}
              lineHeight={1.3}
              fontFamily="System-ui"
              marginTop="25px"
              fontSize="14px"
            >
              Com o agendamento programado, você otimiza sua rotina ao marcar
              horários de forma antecipada e sem complicações.
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            position: "relative",
            border: "1px solid #BCBCBC",
            width: "300px",
            height: "285px",
            borderRadius: "19px",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "-30px",
              left: "30px",
              backgroundColor: "#226FE2",
              width: "60px",
              height: "60px",
              display: "flex",
              borderRadius: "12px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src={ClickLogo}
              alt="Caledário Anota Reservas"
              sx={{
                position: "relative",
                width: "40px",
              }}
            />
          </Box>
          <Box margin="50px 40px">
            <Typography
              letterSpacing="0.1px"
              fontWeight={500}
              lineHeight={1.3}
              marginRight="10px"
              fontFamily="System-ui"
              fontSize="26px"
            >
              Tela personalizada
            </Typography>
            <Typography
              letterSpacing="0.2px"
              fontWeight={400}
              lineHeight={1.3}
              fontFamily="System-ui"
              marginTop="25px"
              fontSize="14px"
            >
              Com a tela personalizada, você leva a identidade visual da sua
              marca diretamente para a experiência do usuário.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Resources;
