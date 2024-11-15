import React from "react";
import { Box } from "@mui/material";
import ReservationsButton from "../buttons/ReservationsButton";
import { Link } from "react-router-dom";
import "./ReservationsContainer.css";

const ReservationsContainer = () => {
  return (
    <Box
      className="ReservationsContainer"
      display="flex"
      gap="25px"
      marginTop="20px"
    >
      <Link to="/reservas" style={{ textDecoration: "none", color: "inherit" }}>
        <ReservationsButton text="Novo Agendamento" bgColor="#0C927D" />
      </Link>
      <ReservationsButton text="Minhas Reservas" bgColor="#7F42D9" />
    </Box>
  );
};

export default ReservationsContainer;
