import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import CourtsTable from "../court/courtsTable/CourtsTable";
import { CourtTypes } from "../../types/generalTypes";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import useIsMobile from "../../hooks/useIsMobile";
import Add from "../../images/plusWhite.svg";
import { useCompanyCourts } from "../../hooks/useCompanyCourts";
import AddCourt from "../addCourt/AddCourt";

const CompanyCourts = () => {
  const [courts, setCourts] = useState<CourtTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openAddCourt, setOpenAddCourt] = useState(false);
  const isMobile = useIsMobile();
  const { fetchCourts } = useCompanyCourts({ setCourts, setIsLoading });

  useEffect(() => {
    fetchCourts();
  }, [fetchCourts]);

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography
          sx={{ fontWeight: 600, letterSpacing: "0.2" }}
          fontSize={isMobile ? "16px" : "18px"}
          color="#22303E"
        >
          Minhas Quadras
        </Typography>
        <Box
          height="45px"
          width="45px"
          borderRadius="50%"
          onClick={() => setOpenAddCourt(true)}
          sx={{
            background: "#226FE2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <img src={Add} alt="Add" width="18px" height="18px" />
        </Box>
      </Box>
      <Box marginTop={isMobile ? "24px" : "40px"}>
        {isLoading ? (
          <Box marginTop="180px" display="flex" justifyContent="center">
            <LoadingSpinner />
          </Box>
        ) : (
          <CourtsTable courts={courts} refetchCourts={fetchCourts} />
        )}
      </Box>
      {openAddCourt && (
        <AddCourt
          closeModal={() => setOpenAddCourt(false)}
          fetchCourts={fetchCourts}
        />
      )}
    </Box>
  );
};

export default CompanyCourts;
