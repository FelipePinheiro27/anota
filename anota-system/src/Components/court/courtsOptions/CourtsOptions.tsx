import { Link, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import React from "react";
import CourtCard from "../CourtCard";
import { CourtTypes } from "../../../types/generalTypes";

interface CourtsOptionsProps {
  courts: CourtTypes[];
  onSelectCourt: ((court: CourtTypes) => void) | undefined;
}

const CourtsOptions = ({ courts, onSelectCourt }: CourtsOptionsProps) => {
  const { dynamicPath } = useParams();

  return (
    <Box marginLeft="40px" gap="30px" display="flex" flexWrap="wrap">
      {courts.map((court, index) => (
        <Link
          key={index}
          to={`/${dynamicPath}/horarios`}
          onClick={() => onSelectCourt && onSelectCourt(court)}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <CourtCard
            key={index}
            title={court.name}
            description={court.description}
          />
        </Link>
      ))}
    </Box>
  );
};

export default CourtsOptions;
