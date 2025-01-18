import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { retrieveCourtsByCompany } from "../../api/ClientAPI";
import CourtsTable from "../court/courtsTable/CourtsTable";
import { CourtTypes } from "../../types/generalTypes";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";

const CompanyCourts = () => {
  const [courts, setCourts] = useState<CourtTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refetchCourts = async () => {
    setIsLoading(true);
    const value = localStorage.getItem("userSession");
    const companyData: { companyId?: string | number } = JSON.parse(
      value || ""
    );
    const courtsData = await retrieveCourtsByCompany(
      companyData?.companyId || 0
    );
    setCourts(courtsData);
    setIsLoading(false);
  };

  useEffect(() => {
    const onFetchCourts = async () => {
      setIsLoading(true);
      const value = localStorage.getItem("userSession");
      const companyData: { companyId?: string | number } = JSON.parse(
        value || ""
      );
      const courtsData = await retrieveCourtsByCompany(
        companyData?.companyId || 0
      );
      setCourts(courtsData);
      setIsLoading(false);
    };

    onFetchCourts();
  }, []);

  return (
    <>
      <Typography
        sx={{ fontWeight: 600, letterSpacing: "0.2" }}
        fontSize="18px"
        color="#22303E"
      >
        Minhas Quadras
      </Typography>
      <br />
      {isLoading ? (
        <Box marginTop="180px">
          <LoadingSpinner />
        </Box>
      ) : (
        <CourtsTable courts={courts} refetchCourts={refetchCourts} />
      )}
    </>
  );
};

export default CompanyCourts;
