import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import CalendarLogo from "../../images/calendar.svg";
import CheckedLogo from "../../images/checked.svg";
import ClickLogo from "../../images/click.svg";
import useIsMobile from "../../hooks/useIsMobile";

const Resources = () => {
  const isMobile = useIsMobile();

  const features = [
    {
      img: CalendarLogo,
      title: "Seu cliente agenda sozinho",
      description:
        "Com a nossa plataforma de agendamentos online, seus clientes podem marcar horários de forma rápida e fácil.",
      alt: "Ícone de calendário representando agendamentos online",
    },
    {
      img: CheckedLogo,
      title: "Agendamentos fixos",
      description:
        "Com o agendamento fixo, você pode reservar horários recorrentes por longos períodos, ideal para clientes fiéis.",
      alt: "Ícone de check representando agendamentos recorrentes",
    },
    {
      img: ClickLogo,
      title: "Tela e link personalizados",
      description:
        "Com uma tela e um link personalizados, sua marca se destaca, proporcionando uma experiência única.",
      alt: "Ícone de clique representando personalização de tela",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      aria-labelledby="resources-title"
    >
      <Box
        padding={isMobile ? "10px 10px" : "0px 120px"}
        sx={{
          color: "#22303E",
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
          <Typography
            width={isMobile ? "100%" : "70%"}
            marginTop={isMobile ? "40px" : "80px"}
            id="resources-title"
            component="h2"
            letterSpacing="0.1px"
            fontWeight={600}
            lineHeight={1.2}
            fontFamily="sans-serif"
            fontSize={isMobile ? "28px" : "57px"}
          >
            Recursos poderosos para impulsionar seus resultados
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            gap: isMobile ? "20px" : "0",
            marginTop: "80px",
            justifyContent: "space-around",
          }}
        >
          {features.map((feature, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              aria-labelledby={`feature-title-${index}`}
            >
              <Box
                sx={{
                  position: "relative",
                  border: "1px solid #BCBCBC",
                  width: isMobile ? "260px" : "300px",
                  height: isMobile ? "auto" : "285px",
                  borderRadius: "19px",
                  padding: isMobile ? "20px" : "0",
                  textAlign: "left",
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
                    src={feature.img}
                    alt={feature.alt}
                    sx={{ width: "40px" }}
                    loading="lazy"
                  />
                </Box>
                <Box margin={isMobile ? "50px 20px" : "50px 40px"}>
                  <Typography
                    id={`feature-title-${index}`}
                    component="h3"
                    letterSpacing="0.1px"
                    fontWeight={600}
                    lineHeight={1.3}
                    fontFamily="sans-serif"
                    fontSize={isMobile ? "20px" : "26px"}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    letterSpacing="0.2px"
                    fontWeight={400}
                    lineHeight={1.3}
                    fontFamily="sans-serif"
                    marginTop="15px"
                    fontSize={isMobile ? "12px" : "14px"}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </Box>
            </motion.article>
          ))}
        </Box>
      </Box>
    </motion.section>
  );
};

export default Resources;
