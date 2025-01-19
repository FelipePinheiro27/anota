import React from "react";
import { Box, Typography } from "@mui/material";
import PlansHeader from "../../Components/plans/PlansHeader";
import PlansTextInfo from "../../Components/plans/PlansTextInfo";
import PlansImages from "../../Components/plans/PlansImages";
import PlansCard from "../../Components/plans/PlansCard";
import PlansCardYear from "../../Components/plans/PlansCardYear";
import useIsMobile from "../../hooks/useIsMobile";

const Plans = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <Box
        sx={{
          background: "#fff",
          fontFamily: "Manrope",
          color: "#22303E",
          minHeight: "100vh",
        }}
      >
        <br />
        <PlansHeader />
        <Box
          padding={isMobile ? "40px 20px" : "80px 0 20px 40px"}
          gap={isMobile ? "30px" : "70px"}
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          alignItems={isMobile ? "center" : "flex-start"}
        >
          <Box
            width={isMobile ? "100%" : "62%"}
            textAlign={isMobile ? "center" : "left"}
          >
            <PlansTextInfo />
          </Box>
          <Box
            width={isMobile ? "100%" : "30%"}
            display="flex"
            justifyContent={isMobile ? "center" : "flex-start"}
            marginTop={isMobile ? "20px" : "0"}
          >
            <PlansImages />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          color: "#22303E",
          minHeight: "100vh",
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
              fontFamily="Manrope"
              fontSize={isMobile ? "36px" : "57px"}
            >
              Foque no que importa e deixe o resto com a gente
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
          <PlansCardYear />
        </Box>
      </Box>
    </>
  );
};

export default Plans;
