import React from "react";
import { styled } from "@mui/material/styles";
import MuiCard from "@mui/material/Card";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(8, 6),
  gap: theme.spacing(5),
  margin: "0 auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  [theme.breakpoints.down("sm")]: {
    background: "rgba(236, 245, 237, 0.2)",
    boxShadow: "none",
    padding: theme.spacing(8, 3),
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

interface CardComponentProps {
  children: React.ReactNode;
  variant?: "elevation" | "outlined";
}

export const CardComponent = ({ children, variant }: CardComponentProps) => {
  return <Card variant={variant}>{children}</Card>;
};
