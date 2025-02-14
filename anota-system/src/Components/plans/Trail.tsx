import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";
import useIsMobile from "../../hooks/useIsMobile";
import Logo from "../../images/minimalistWhiteLogo.svg";
import SignUpLogo from "../../images/signUpLogo.svg";
import LinkLogo from "../../images/link.svg";

const trailDescriptions = [
  "Faça o cadastro e tenha acesso imediato ao sistema",
  "Receba o link personalizado da sua empresa e compartilhe-o com seus clientes",
  "Simplifique o gerenciamento das suas reservas com um sistema intuitivo",
];

const Trail = () => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={{ opacity: 0.3, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <Box
        sx={{
          background: "#fff",
          color: "#22303E",
          margin: "0 auto",
          maxWidth: "1350px",
          padding: isMobile ? "20px 10px" : "40px 80px",
          marginTop: "50px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "30px",
          }}
        >
          <Box>
            {["Cadastro", "Compartilhe", "Gerencie"].map((title, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0.3, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                <Box
                  display="flex"
                  gap="20px"
                  alignItems="center"
                  mt={index !== 0 ? 4 : 0}
                >
                  {index % 2 === 0 && (
                    <Box
                      component="img"
                      src={SignUpLogo}
                      alt="Logo"
                      sx={{ width: 130 }}
                    />
                  )}
                  {index % 2 === 1 && (
                    <>
                      <Typography
                        color="#22303E"
                        fontWeight={400}
                        fontFamily="sans-serif"
                        fontSize={isMobile ? "18px" : "86px"}
                        textAlign={isMobile ? "center" : "left"}
                        mx={isMobile ? "auto" : 0}
                        marginRight="145px"
                      >
                        0{index + 1}
                      </Typography>
                      <Box
                        component="img"
                        src={LinkLogo}
                        alt="Logo"
                        sx={{ width: 130 }}
                      />
                    </>
                  )}
                  <Box marginRight="145px">
                    <Typography
                      color="#22303E"
                      fontWeight={400}
                      letterSpacing={1.6}
                      fontFamily="system-ui"
                      fontSize={isMobile ? "18px" : "28px"}
                      textAlign={isMobile ? "center" : "left"}
                    >
                      {title}
                    </Typography>
                    <Typography
                      color="#6B7280"
                      fontWeight={300}
                      maxWidth={isMobile ? "85%" : "260px"}
                      fontFamily="system-ui"
                      fontSize={isMobile ? "18px" : "16px"}
                      textAlign={isMobile ? "center" : "left"}
                      mx={isMobile ? "auto" : 0}
                    >
                      {trailDescriptions[index]}
                    </Typography>
                  </Box>
                  {index % 2 === 0 && (
                    <Typography
                      color="#22303E"
                      fontWeight={400}
                      fontFamily="sans-serif"
                      fontSize={isMobile ? "18px" : "86px"}
                      textAlign={isMobile ? "center" : "left"}
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
            <Paper
              sx={{
                height: isMobile ? "70px" : "400px",
                width: isMobile ? "70px" : "400px",
                background: "linear-gradient(to right,#226FE2, #0033FF)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 510,
                fontSize: isMobile ? "14px" : "16px",
              }}
            >
              <Box
                component={motion.img}
                src={Logo}
                alt="Logo Anota Reservas"
                sx={{
                  position: "relative",
                  zIndex: 2,
                  width: isMobile ? "40px" : "210px",
                  borderRadius: 2,
                }}
              />
            </Paper>
          </motion.div>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Trail;
