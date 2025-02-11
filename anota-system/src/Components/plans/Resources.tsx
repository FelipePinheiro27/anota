import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import CalendarLogo from "../../images/calendar.svg";
import CheckedLogo from "../../images/checked.svg";
import ClickLogo from "../../images/click.svg";
import useIsMobile from "../../hooks/useIsMobile";

const Resources = () => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Box
        padding={isMobile ? "20px 10px" : "50px 120px"}
        sx={{
          color: "#22303E",
          marginTop: isMobile ? "20px" : "70px",
          margin: "0 auto",
          maxWidth: "1350px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            padding: isMobile ? "0 10px" : "0",
          }}
        >
          <Box
            margin="0 auto"
            width={isMobile ? "100%" : "65%"}
            marginTop={isMobile ? "40px" : "80px"}
          >
            <Typography
              letterSpacing="0.1px"
              fontWeight={500}
              lineHeight={1.2}
              fontSize={isMobile ? "28px" : "57px"}
            >
              Recursos poderosos para impulsionar seus resultados
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            gap: isMobile ? "20px" : "0",
            marginTop: isMobile ? "40px" : "80px",
            justifyContent: "space-around",
          }}
        >
          {[CalendarLogo, CheckedLogo, ClickLogo].map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Box
                sx={{
                  position: "relative",
                  border: "1px solid #BCBCBC",
                  width: isMobile ? "260px" : "300px",
                  height: isMobile ? "auto" : "285px",
                  borderRadius: "19px",
                  padding: isMobile ? "20px" : "0",
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "-30px",
                    left: isMobile ? "calc(50% - 30px)" : "30px",
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
                    src={logo}
                    alt="Ícone Anota Reservas"
                    sx={{
                      position: "relative",
                      width: "40px",
                    }}
                  />
                </Box>
                <Box margin={isMobile ? "50px 20px" : "50px 40px"}>
                  <Typography
                    letterSpacing="0.1px"
                    fontWeight={500}
                    lineHeight={1.3}
                    fontFamily="System-ui"
                    fontSize={isMobile ? "20px" : "26px"}
                  >
                    {index === 0
                      ? "Seu cliente agenda sozinho"
                      : index === 1
                      ? "Agendamento programado"
                      : "Tela personalizada"}
                  </Typography>
                  <Typography
                    letterSpacing="0.2px"
                    fontWeight={400}
                    lineHeight={1.3}
                    fontFamily="System-ui"
                    marginTop="15px"
                    fontSize={isMobile ? "12px" : "14px"}
                  >
                    {index === 0
                      ? "Com a nossa plataforma de agendamentos online, seus clientes podem marcar compromissos de forma rápida e fácil, no horário que preferirem."
                      : index === 1
                      ? "Com o agendamento programado, você otimiza sua rotina ao marcar horários de forma antecipada e sem complicações."
                      : "Com a tela personalizada, você leva a identidade visual da sua marca diretamente para a experiência do usuário."}
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Box>
    </motion.div>
  );
};

export default Resources;
