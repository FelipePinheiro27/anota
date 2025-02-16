import React, { useState } from "react";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";
import useIsMobile from "../../hooks/useIsMobile";
import PlansCard from "./PlansCard";
import PlansCardYear from "./PlansCardYear";

const Pricing = () => {
  const isMobile = useIsMobile();
  const [showAnnualPlans, setShowAnnualPlans] = useState(true);

  const onShowAnnualPlansChange = (value: boolean) => setShowAnnualPlans(value);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Box
        component="section"
        padding={isMobile ? "20px 10px" : "50px 120px"}
        sx={{ color: "#22303E", marginTop: isMobile ? "20px" : "70px" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            padding: isMobile ? "0 10px" : "0",
          }}
        >
          <Box width={isMobile ? "100%" : "65%"}>
            <Typography
              component="h2"
              letterSpacing="0.1px"
              fontFamily="system-ui"
              fontWeight={500}
              lineHeight={1.2}
              fontSize={isMobile ? "28px" : "54px"}
            >
              Comece sua jornada conosco
            </Typography>
            <br />
            <Typography
              component="p"
              letterSpacing="0.1px"
              fontFamily="system-ui"
              color="#6B7280"
              fontWeight={400}
              lineHeight={1.2}
              fontSize={isMobile ? "18px" : "24px"}
            >
              Escolha o plano ideal para você
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginTop={isMobile ? "40px" : "60px"}
          flexDirection={isMobile ? "column" : "row"}
          gap={isMobile ? "10px" : "0"}
        >
          <Box
            component="button"
            sx={{
              cursor: "pointer",
              background: !showAnnualPlans
                ? "linear-gradient(to right, #226FE2, #0033FF)"
                : "#fff",
              color: !showAnnualPlans ? "#fff" : "#22303E",
            }}
            border="1px solid #BCBCBC"
            borderRadius={isMobile ? "40px" : "40px 0 0 40px"}
            textAlign="center"
            padding="12px 0"
            width={isMobile ? "302px" : "200px"}
            fontSize="16px"
            fontFamily="system-ui"
            fontWeight={510}
            onClick={() => onShowAnnualPlansChange(false)}
          >
            Mensal
          </Box>
          <Box
            component="button"
            sx={{
              background: showAnnualPlans
                ? "linear-gradient(to right, #226FE2, #0033FF)"
                : "#fff",
              cursor: "pointer",
              color: showAnnualPlans ? "#fff" : "#22303E",
            }}
            border="1px solid #BCBCBC"
            borderLeft={isMobile ? "1px solid #BCBCBC" : "none"}
            borderRadius={isMobile ? "40px" : "0 40px 40px 0"}
            textAlign="center"
            fontSize="16px"
            padding="12px 0"
            width={isMobile ? "302px" : "200px"}
            fontFamily="system-ui"
            fontWeight={510}
            onClick={() => onShowAnnualPlansChange(true)}
          >
            Anual -30% OFF
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          justifyContent="center"
          alignItems={isMobile ? "center" : "flex-start"}
          marginTop={isMobile ? "40px" : "80px"}
          marginBottom="30px"
          gap={isMobile ? "20px" : "80px"}
        >
          {showAnnualPlans ? <PlansCardYear /> : <PlansCard />}
        </Box>
      </Box>
    </motion.section>
  );
};

export default Pricing;
