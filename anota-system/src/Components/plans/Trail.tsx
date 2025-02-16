import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import useIsMobile from "../../hooks/useIsMobile";
import Logo from "../../images/anota_mask.png";
import SignUpLogo from "../../images/signUpLogo.svg";
import LinkLogo from "../../images/link.svg";
import ManageLogo from "../../images/manage.svg";

const trailSteps = [
  {
    title: "Cadastro",
    description: "Faça o cadastro e tenha acesso imediato ao sistema",
    icon: SignUpLogo,
  },
  {
    title: "Compartilhe",
    description:
      "Receba o link personalizado da sua empresa e compartilhe-o com seus clientes",
    icon: LinkLogo,
  },
  {
    title: "Gerencie",
    description:
      "Simplifique o gerenciamento das suas reservas com um sistema intuitivo",
    icon: ManageLogo,
  },
];

const Trail = () => {
  const isMobile = useIsMobile();

  return (
    <motion.section
      initial={{ opacity: 0.3, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      aria-label="Passos para utilizar o sistema"
    >
      <Box
        sx={{
          background: "#fff",
          color: "#22303E",
          margin: "0 auto",
          maxWidth: "1350px",
          padding: isMobile ? "20px 20px" : "40px 80px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: isMobile ? "40px" : "30px",
          }}
        >
          <Box component="article" role="list">
            {trailSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0.3, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                role="listitem"
              >
                <Box
                  display="flex"
                  gap="20px"
                  alignItems="center"
                  mt={index !== 0 ? 4 : 0}
                  fontFamily="system-ui"
                >
                  {index % 2 === 0 && (
                    <Box
                      component="img"
                      src={step.icon}
                      alt={`Ícone de ${step.title}`}
                      sx={{ width: isMobile ? 70 : 100 }}
                    />
                  )}
                  {index % 2 === 1 && (
                    <>
                      {!isMobile && (
                        <Typography
                          component="h2"
                          color="#22303E"
                          fontWeight={400}
                          fontSize="70px"
                          textAlign="left"
                          mx={isMobile ? "auto" : 0}
                          marginRight="60px"
                        >
                          0{index + 1}
                        </Typography>
                      )}
                      <Box
                        component="img"
                        src={step.icon}
                        alt={`Ícone de ${step.title}`}
                        sx={{ width: isMobile ? 70 : 100 }}
                      />
                    </>
                  )}
                  <Box marginRight={isMobile ? "10px" : "50px"}>
                    <Typography
                      component="h3"
                      color="#22303E"
                      fontWeight={400}
                      letterSpacing={1.6}
                      fontFamily="system-ui"
                      fontSize={isMobile ? "14px" : "20px"}
                      textAlign="left"
                    >
                      {step.title}
                    </Typography>
                    <Typography
                      color="#22303E"
                      fontWeight={300}
                      maxWidth={isMobile ? "100%" : "260px"}
                      fontSize={isMobile ? "12px" : "14px"}
                      textAlign="left"
                      mx={isMobile ? "auto" : 0}
                    >
                      {step.description}
                    </Typography>
                  </Box>
                  {index % 2 === 0 && !isMobile && (
                    <Typography
                      color="#22303E"
                      fontWeight={400}
                      fontSize={isMobile ? "18px" : "70px"}
                      textAlign="left"
                      mx={isMobile ? "auto" : 0}
                    >
                      0{index + 1}
                    </Typography>
                  )}
                </Box>
              </motion.div>
            ))}
          </Box>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { duration: 0.6 } }}
          >
            <Box
              component={motion.img}
              src={Logo}
              alt="Logo Anota Reservas"
              sx={{
                position: "relative",
                zIndex: 2,
                width: isMobile ? "310px" : "580px",
                marginTop: isMobile ? "60px" : 0,
                borderRadius: 2,
              }}
            />
          </motion.div>
        </Box>
      </Box>
    </motion.section>
  );
};

export default Trail;
