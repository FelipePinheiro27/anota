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
  const isPrimaryColorWhite = primaryColor === "#FFFFFF";
  const isSecondaryColorWhite = secondaryColor === "#FFFFFF";

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
        <ReservationsButton
          text="Novo Agendamento"
          bgColor={secondaryColor}
          fontColor={isSecondaryColorWhite ? primaryColor : "#FFFFFF"}
        />
      </Link>
      <Link
        to={`/${dynamicPath}/minhas-reservas`}
        style={{ textDecoration: "none", color: "inherit", padding: "0" }}
      >
        <ReservationsButton
          text="Minhas Reservas"
          bgColor={primaryColor}
          fontColor={isPrimaryColorWhite ? secondaryColor : "#FFFFFF"}
        />
      </Link>
    </Box>
  );
};

export default ReservationsContainer;
