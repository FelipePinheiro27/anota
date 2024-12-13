import React from "react";
import { Box } from "@mui/material";
import ReservationsButton from "../buttons/ReservationsButton";
import { Link, useParams } from "react-router-dom";
import "./ReservationsContainer.scss";

interface ReservationsContainerProps {
  primaryColor: string;
  secondaryColor: string;
}

const ReservationsContainer = ({
  primaryColor,
  secondaryColor,
}: ReservationsContainerProps) => {
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
        <ReservationsButton text="Novo Agendamento" bgColor={secondaryColor} />
      </Link>
      <Link
        to={`/${dynamicPath}/minhas-reservas`}
        style={{ textDecoration: "none", color: "inherit", padding: "0" }}
      >
        <ReservationsButton text="Minhas Reservas" bgColor={primaryColor} />
      </Link>
    </Box>
  );
};

export default ReservationsContainer;
