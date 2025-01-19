import React from "react";
import { Box, Typography } from "@mui/material";
import PlansHeader from "../../Components/plans/PlansHeader";
import PlansTextInfo from "../../Components/plans/PlansTextInfo";
import PlansImages from "../../Components/plans/PlansImages";
import PlansCard from "../../Components/plans/PlansCard";
import PlansCardYear from "../../Components/plans/PlansCardYear";

const Plans = () => {
  return (
    <>
      <Box
        sx={{
          background: "#fff",
          fontFamily: "Manrope",
          color: "#22303E",
          height: "100vh",
        }}
      >
        <br /> <br />
        <PlansHeader />
        <Box padding="80px 0 20px 40px" gap="70px" display="flex">
          <Box width="62%">
            <PlansTextInfo />
          </Box>
          <Box width="30%">
            <PlansImages />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          color: "#22303E",
          height: "100vh",
          marginTop: "70px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Box width="65%">
            <Typography
              letterSpacing="0.1px"
              fontWeight={500}
              lineHeight={1.2}
              fontFamily="Manrope"
              fontSize="57px"
            >
              Foque no que importa e deixe o resto com a gente
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          marginTop="120px"
          gap="80px"
        >
          <PlansCard />
          <PlansCardYear />
        </Box>
      </Box>
    </>
  );
};

export default Plans;
