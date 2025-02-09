import React from "react";
import { Box, Typography } from "@mui/material";
import useIsMobile from "../../hooks/useIsMobile";
import PlansCard from "./PlansCard";

const Pricing = () => {
  const isMobile = useIsMobile();

  return (
    <Box
      padding={isMobile ? "40px 20px" : "50px 120px"}
      sx={{
        color: "#22303E",
        marginTop: isMobile ? "40px" : "70px",
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
        <Box width={isMobile ? "100%" : "65%"}>
          <Typography
            letterSpacing="0.1px"
            fontWeight={500}
            lineHeight={1.2}
            fontSize={isMobile ? "36px" : "57px"}
          >
            Comece sua jornada conosco
          </Typography>
          <br />
          <Typography
            letterSpacing="0.1px"
            color="#6B7280"
            fontWeight={400}
            lineHeight={1.2}
            fontSize={isMobile ? "24px" : "24px"}
          >
            Escolha o plano ideal para você
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        justifyContent="center"
        alignItems={isMobile ? "center" : "flex-start"}
        marginTop={isMobile ? "60px" : "120px"}
        marginBottom="30px"
        gap={isMobile ? "40px" : "80px"}
      >
        <PlansCard />
      </Box>
    </Box>
  );
};

export default Pricing;
