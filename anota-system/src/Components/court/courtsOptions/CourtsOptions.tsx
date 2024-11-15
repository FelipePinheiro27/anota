import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import React from "react";
import CourtCard from "../CourtCard";

const CourtsOptions = () => {
  return (
    <Box marginLeft="40px" gap="30px" display="flex" flexWrap="wrap">
      <Link to="/horarios" style={{ textDecoration: "none", color: "inherit" }}>
        <CourtCard />
      </Link>
      <CourtCard />
      <CourtCard />
      <CourtCard />
      <CourtCard />
    </Box>
  );
};

export default CourtsOptions;
