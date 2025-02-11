import React from "react";
import { Box, Paper } from "@mui/material";
import useIsMobile from "../../hooks/useIsMobile";
import { motion } from "framer-motion";
import Logo from "../../images/minimalistWhiteLogo.svg";

const HorizontalStrip = () => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <Box
        sx={{
          color: "#22303E",
          minHeight: isMobile ? "60vh" : "80vh",
          display: "flex",
          alignItems: "center",
          marginTop: isMobile ? "20px" : "70px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: isMobile ? "28vh" : "38vh",
            background: "linear-gradient(to right, #226FE2, #0033FF)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            position="relative"
            display="inline-block"
            sx={{
              width: isMobile ? "90%" : "70%",
              height: isMobile ? "45vh" : "62vh",
              background: "#F2F2F2",
              borderRadius: "16px",
              border: "2px solid #fff",
              margin: "0 auto",
              marginTop: isMobile ? "-8vh" : "-12vh",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
          >
            <Paper
              sx={{
                position: "absolute",
                bottom: isMobile ? -25 : -40,
                right: isMobile ? -25 : -40,
                height: isMobile ? "70px" : "105px",
                width: isMobile ? "70px" : "105px",
                background: "linear-gradient(to right, #0033FF, #226FE2)",
                borderRadius: "50%",
                zIndex: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 510,
                fontSize: isMobile ? "14px" : "16px",
              }}
            >
              <Box
                component="img"
                src={Logo}
                alt="Logo Anota Reservas"
                sx={{
                  position: "relative",
                  zIndex: 2,
                  width: isMobile ? "40px" : "60px",
                  borderRadius: 2,
                }}
              />
            </Paper>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default HorizontalStrip;
