import React from "react";
import { Box, Paper } from "@mui/material";
import useIsMobile from "../../hooks/useIsMobile";
import Logo from "../../images/minimalistWhiteLogo.svg";

const HorizontalStrip = () => {
  const isMobile = useIsMobile();

  return (
    <Box
      sx={{
        color: "#22303E",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        marginTop: isMobile ? "40px" : "70px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "38vh",
          background: "linear-gradient(to right, #226FE2, #0033FF)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          position="relative"
          display="inline-block"
          sx={{
            width: "70%",
            height: "62vh",
            background: "#F2F2F2",
            borderRadius: "16px",
            border: "3px solid #fff",
            margin: "0 auto",
            marginTop: "-12vh",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <Paper
            sx={{
              position: "absolute",
              bottom: -40,
              right: -40,
              height: "105px",
              width: "105px",
              background: "linear-gradient(to right, #0033FF, #226FE2)",
              borderRadius: "50%",
              zIndex: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 510,
              fontSize: "16px",
            }}
          >
            <Box
              component="img"
              src={Logo}
              alt="Logo Anota Reservas"
              sx={{
                position: "relative",
                zIndex: 2,
                width: "60px",
                borderRadius: 2,
              }}
            />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default HorizontalStrip;
