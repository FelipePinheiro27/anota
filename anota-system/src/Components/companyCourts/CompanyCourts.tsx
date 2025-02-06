import React, { useEffect, useState, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { retrieveCourtsByCompany } from "../../api/ClientAPI";
import CourtsTable from "../court/courtsTable/CourtsTable";
import { CourtTypes } from "../../types/generalTypes";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import useIsMobile from "../../hooks/useIsMobile";

const CompanyCourts = () => {
  const [courts, setCourts] = useState<CourtTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  const fetchCourts = useCallback(async () => {
    try {
      setIsLoading(true);
      const value = localStorage.getItem("userSession");
      const companyData: { companyId?: string | number } = value
        ? JSON.parse(value)
        : {};
      const courtsData = await retrieveCourtsByCompany(
        companyData?.companyId || 0
      );
      setCourts(courtsData);
    } catch (error) {
      console.error("Failed to fetch courts:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourts();
  }, [fetchCourts]);

  return (
    <Box>
      <Typography
        sx={{ fontWeight: 600, letterSpacing: "0.2" }}
        fontSize={isMobile ? "16px" : "18px"}
        color="#22303E"
      >
        Minhas Quadras
      </Typography>
      <Box marginTop={isMobile ? "24px" : "40px"}>
        {isLoading ? (
          <Box marginTop="180px" display="flex" justifyContent="center">
            <LoadingSpinner />
          </Box>
        ) : (
          <CourtsTable courts={courts} refetchCourts={fetchCourts} />
        )}
      </Box>
    </Box>
  );
};

export default CompanyCourts;
