import React, { useState, useEffect } from "react";
import { Box, Paper } from "@mui/material";
import BeachTennis from "../../images/beach_plan.jpg";
import Futvolei from "../../images/futvolei.jpg";
import Volei from "../../images/volei.jpg";

const PlansImages = () => {
  const [imagesIterator, setImagesIterator] = useState(0);
  const images = [BeachTennis, Futvolei, Volei];

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setImagesIterator((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  //   }, 3000);

  //   return () => clearInterval(timer);
  // }, [images.length]);

  return (
    <Box position="relative" display="inline-block">
      <Box
        sx={{
          position: "absolute",
          top: -20,
          left: -20,
          height: "55px",
          width: "120px",
          background: "linear-gradient(to right, #226FE2, #0033FF)",
          borderRadius: "20px 20px 20px 0",
          zIndex: 1,
        }}
      />

      <Paper
        sx={{
          position: "absolute",
          bottom: -20,
          right: -20,
          height: "65px",
          width: "162px",
          background: "linear-gradient(to right, #226FE2, #0033FF)",
          borderRadius: "20px 20px 20px 0",
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: 510,
          fontSize: "16px",
        }}
      >
        Beach tennis
      </Paper>

      <Box
        component="img"
        src={images[imagesIterator]}
        alt="Modalidades"
        sx={{
          position: "relative",
          zIndex: 2,
          height: 400,
          width: 400,
          borderRadius: 2,
        }}
      />
    </Box>
  );
};

export default PlansImages;
