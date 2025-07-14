import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import Arrow from "../../images/arrow.svg";
import useIsMobile from "../../hooks/useIsMobile";

interface PlansTextInfoProps {
  scrollToPricing: () => void;
}

const PlansTextInfo = ({ scrollToPricing }: PlansTextInfoProps) => {
  const isMobile = useIsMobile();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          letterSpacing="0.1px"
          fontWeight={600}
          lineHeight={1.1}
          color="#22303E"
          maxWidth={isMobile ? "100%" : "400px"}
          fontFamily="sans-serif"
          fontSize={isMobile ? "28px" : "40px"}
          textAlign={isMobile ? "center" : "left"}
          mx={isMobile ? "auto" : 0}
        >
          Sua quadra lotada, sem o telefone tocar a cada 5 minutos
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <Typography
          color="#6B7280"
          fontWeight={500}
          maxWidth={isMobile ? "90%" : "360px"}
          fontFamily="sans-serif"
          fontSize={isMobile ? "18px" : "20px"}
          marginTop="20px"
          textAlign={isMobile ? "center" : "left"}
          mx={isMobile ? "auto" : 0}
        >
          Chega de perder tempo com o WhatsApp e caderno. Com a Anota Reservas,
          seu cliente agenda sozinho e você só se preocupa em gerenciar seu
          negócio.
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Box
          display="flex"
          marginTop="50px"
          justifyContent={isMobile ? "center" : "left"}
          width={isMobile ? "100%" : "275px"}
        >
          <Button
            onClick={scrollToPricing}
            variant="contained"
            sx={{
              textTransform: "none",
              fontSize: isMobile ? "14px" : "16px",
              padding: isMobile ? "10px 20px" : "11px 30px",
              borderRadius: "30px",
              background: "linear-gradient(to right, #226FE2, #0033FF)",
              fontWeight: 510,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              cursor: "pointer",
            }}
            aria-label="Confira nossos planos"
            role="button"
          >
            Confira nossos planos
            <img
              src={Arrow}
              width={isMobile ? "16px" : "20px"}
              alt="Seta indicando mais informações sobre os planos"
            />
          </Button>
        </Box>
      </motion.div>
    </>
  );
};

export default PlansTextInfo;
