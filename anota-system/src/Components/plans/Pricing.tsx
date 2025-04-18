import React, { useState, forwardRef } from "react";
import { motion } from "framer-motion";
import { Box, Typography, Chip } from "@mui/material";
import useIsMobile from "../../hooks/useIsMobile";
import PlansCard from "./PlansCard";
import PlansCardYear from "./PlansCardYear";
import DiscountIcon from "@mui/icons-material/LocalOffer";
import { useSearchParams } from "react-router-dom";

const Pricing = forwardRef((_, ref) => {
  const isMobile = useIsMobile();
  const [showAnnualPlans, setShowAnnualPlans] = useState(false);
  const [searchParams] = useSearchParams();
  const promoCode = searchParams.get("promo");
  const isValidCode = promoCode === "MNTV10";

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
        ref={ref}
      >
        {isValidCode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Box
              sx={{
                background: "linear-gradient(to right, #3f51b5, #1e88e5)",
                borderRadius: "12px",
                padding: "16px",
                color: "#fff",
                textAlign: "center",
                marginBottom: "40px",
              }}
            >
              <Typography
                fontSize={isMobile ? "18px" : "22px"}
                fontWeight={600}
              >
                🎉 Código Promocional Aplicado:{" "}
                <Chip
                  label={promoCode}
                  color="secondary"
                  icon={<DiscountIcon />}
                  sx={{
                    fontWeight: "bold",
                    background: "#ffffff",
                    color: "#1e88e5",
                    marginLeft: "8px",
                  }}
                />
              </Typography>
              <Typography fontSize={isMobile ? "14px" : "18px"} marginTop="6px">
                Você ganhou <strong>10% de desconto</strong> nos planos!
              </Typography>
            </Box>
          </motion.div>
        )}

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
              fontFamily="sans-serif"
              fontWeight={600}
              lineHeight={1.2}
              fontSize={isMobile ? "28px" : "54px"}
            >
              Comece sua jornada conosco
            </Typography>
            <br />
            <Typography
              component="p"
              letterSpacing="0.1px"
              fontFamily="sans-serif"
              color="#6B7280"
              fontWeight={400}
              lineHeight={1.2}
              fontSize={isMobile ? "18px" : "24px"}
            >
              Escolha o plano <strong>mensal</strong> ideal para você
            </Typography>
          </Box>
        </Box>

        {/* <Box
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
            fontFamily="sans-serif"
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
            fontFamily="sans-serif"
            fontWeight={510}
            onClick={() => onShowAnnualPlansChange(true)}
          >
            Anual -30% OFF
          </Box>
        </Box> */}

        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          justifyContent="center"
          alignItems={isMobile ? "center" : "flex-start"}
          marginTop={isMobile ? "40px" : "80px"}
          gap={isMobile ? "20px" : "80px"}
        >
          {showAnnualPlans ? (
            <PlansCardYear hasPromoCod={isValidCode} />
          ) : (
            <PlansCard hasPromoCod={isValidCode} />
          )}
        </Box>
      </Box>
    </motion.section>
  );
});

export default Pricing;
