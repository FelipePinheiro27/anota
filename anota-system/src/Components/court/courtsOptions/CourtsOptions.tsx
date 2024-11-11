import { Box } from "@mui/material";
import React from "react";
import CourtCard from "../CourtCard";

const CourtsOptions = () => {
  return (
    <Box marginLeft="40px" gap="30px" display="flex" flexWrap="wrap">
      <CourtCard />
      <CourtCard />
      <CourtCard />
      <CourtCard />
      <CourtCard />
    </Box>
  );
};

export default CourtsOptions;
