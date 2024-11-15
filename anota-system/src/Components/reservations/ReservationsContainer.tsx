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
      <Link
        to="/reservas"
        style={{ textDecoration: "none", color: "inherit", padding: "0" }}
      >
        <ReservationsButton text="Novo Agendamento" bgColor="#0C927D" />
      </Link>
      <Link
        to="/reservas"
        style={{ textDecoration: "none", color: "inherit", padding: "0" }}
      >
        <ReservationsButton text="Minhas Reservas" bgColor="#7F42D9" />
      </Link>
    </Box>
  );
};

export default ReservationsContainer;
