import React from "react";
import { Box } from "@mui/material";
import PlansHeader from "./PlansHeader";
import PlansTextInfo from "./PlansTextInfo";
import useIsMobile from "../../hooks/useIsMobile";
import PlansImages from "./PlansImages";

const SystemAbout = () => {
  const isMobile = useIsMobile();

  return (
    <Box
      sx={{
        background: "#fff",
        color: "#22303E",
        margin: "0 auto",
        maxWidth: "1350px",
      }}
    >
      <br />
      <PlansHeader />
      <Box
        padding={isMobile ? "40px 20px" : "50px 120px"}
        marginTop="40px"
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
  );
};

export default SystemAbout;
