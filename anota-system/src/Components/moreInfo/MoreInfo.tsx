import React, { useState } from "react";
import { Box, Typography, Collapse } from "@mui/material";
import useIsMobile from "../../hooks/useIsMobile";
import PlusIcon from "../../images/plus.svg";

interface MoreInfoProps {
  title: string;
  description: string;
}

const MoreInfo = ({ title, description }: MoreInfoProps) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding={isMobile ? "0 28px" : "0 60px"}
        minHeight="70px"
        sx={{
          cursor: "pointer",
          background: "#F8F9FB",
          border: "1px solid #BCBCBC",
          borderRadius: "19px",
        }}
        onClick={toggleOpen}
      >
        <Typography
          letterSpacing="0.1px"
          color="#22303E"
          fontWeight={400}
          lineHeight={1.3}
          fontSize={isMobile ? "16px" : "24px"}
        >
          {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: isMobile ? 22 : 24,
            height: isMobile ? 22 : 24,
            borderRadius: "50%",
            transition: "transform 0.3s ease-in-out",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          <Box
            component="img"
            src={PlusIcon}
            alt="Ícone de expansão"
            sx={{ height: isMobile ? 16 : 18, width: isMobile ? 16 : 18 }}
          />
        </Box>
      </Box>
      <Collapse in={isOpen} timeout="auto">
        <Box
          padding={isMobile ? "15px 20px" : "20px 60px"}
          bgcolor="#F8F9FB"
          sx={{ borderRadius: isOpen ? "0 0 19px 19px" : "0" }}
        >
          <Typography color="#22303E" fontSize={isMobile ? "14px" : "20px"}>
            {description}
          </Typography>
        </Box>
      </Collapse>
    </Box>
  );
};

export default MoreInfo;
