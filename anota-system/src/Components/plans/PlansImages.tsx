import React, { useState, useEffect } from "react";
import { Box, Paper } from "@mui/material";
import { motion } from "framer-motion";
import BeachTennis from "../../images/beach_plan.jpg";
import Futvolei from "../../images/futvolei.jpg";
import Volei from "../../images/volei.jpg";
import useIsMobile from "../../hooks/useIsMobile";

const PlansImages = () => {
  const [imagesIterator, setImagesIterator] = useState(0);
  const images = [BeachTennis, Futvolei, Volei];
  const isMobile = useIsMobile();

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setImagesIterator((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  //   }, 3000);

  //   return () => clearInterval(timer);
  // }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Box position="relative" display="inline-block">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -15,
              left: -15,
              height: isMobile ? "40px" : "55px",
              width: isMobile ? "90px" : "120px",
              background: "linear-gradient(to right, #226FE2, #0033FF)",
              borderRadius: "20px 20px 20px 0",
              zIndex: 1,
            }}
          />
        </motion.div>

        <Paper
          sx={{
            position: "absolute",
            bottom: -15,
            right: -15,
            height: isMobile ? "50px" : "65px",
            width: isMobile ? "130px" : "162px",
            background: "linear-gradient(to right, #226FE2, #0033FF)",
            borderRadius: "20px 20px 20px 0",
            zIndex: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 510,
            fontSize: isMobile ? "14px" : "16px",
          }}
        >
          Beach tennis
        </Paper>

        <motion.img
          key={imagesIterator}
          src={images[imagesIterator]}
          alt="Modalidades"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            position: "relative",
            zIndex: 2,
            height: isMobile ? 300 : 400,
            width: isMobile ? 300 : 400,
            borderRadius: 8,
            objectFit: "cover",
          }}
        />
      </Box>
    </motion.div>
  );
};

export default PlansImages;
