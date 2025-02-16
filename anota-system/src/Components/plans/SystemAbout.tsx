import React from "react";
import { Box } from "@mui/material";
import PlansHeader from "./PlansHeader";
import PlansTextInfo from "./PlansTextInfo";
import useIsMobile from "../../hooks/useIsMobile";
import PlansImages from "./PlansImages";

interface SystemAboutProps {
  scrollToPricing: () => void;
}

const SystemAbout = ({ scrollToPricing }: SystemAboutProps) => {
  const isMobile = useIsMobile();

  return (
    <Box
      sx={{
        background: "#fff",
        color: "#22303E",
        margin: "0 auto",
        maxWidth: "1350px",
        padding: isMobile ? "20px 10px" : "40px 80px",
      }}
    >
      <PlansHeader />
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "center" : "flex-start",
          justifyContent: "space-between",
          gap: isMobile ? "20px" : "50px",
          marginTop: "60px",
        }}
      >
        <Box
          sx={{
            width: isMobile ? "100%" : "60%",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          <PlansTextInfo scrollToPricing={scrollToPricing} />
        </Box>
        <Box
          sx={{
            width: isMobile ? "100%" : "35%",
            display: "flex",
            justifyContent: "center",
            marginTop: isMobile ? "60px" : "0",
          }}
        >
          <PlansImages />
        </Box>
      </Box>
    </Box>
  );
};

export default SystemAbout;
