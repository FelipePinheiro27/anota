import React from "react";
import { Box } from "@mui/material";
import ReservationsButton from "../buttons/ReservationsButton";
import { Link, useParams } from "react-router-dom";
import "./ReservationsContainer.scss";

const ReservationsContainer = () => {
  const { dynamicPath } = useParams();

  return (
    <Box
      className="ReservationsContainer"
      display="flex"
      gap="25px"
      marginTop="20px"
    >
      <Link
        to={`/${dynamicPath}/reservas`}
        style={{ textDecoration: "none", color: "inherit", padding: "0" }}
      >
        <ReservationsButton text="Novo Agendamento" bgColor="#0C927D" />
      </Link>
      <Link
        to={`/${dynamicPath}/minhas-reservas`}
        style={{ textDecoration: "none", color: "inherit", padding: "0" }}
      >
        <ReservationsButton text="Minhas Reservas" bgColor="#7F42D9" />
      </Link>
    </Box>
  );
};

export default ReservationsContainer;
