import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { retrieveCourtsByCompany } from "../../api/ClientAPI";
import CourtsTable from "../court/courtsTable/CourtsTable";
import { CourtTypes } from "../../types/generalTypes";

const CompanyCourts = () => {
  const [courts, setCourts] = useState<CourtTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
      <CourtsTable courts={courts} />
    </>
  );
};

export default CompanyCourts;
