import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { retrieveCourtsByCompany } from "../../api/ClientAPI";
import { CourtTypes } from "../../types/generalTypes";
import useIsMobile from "../../hooks/useIsMobile";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import BulkReservation from "../bulkReservation/BulkReservation";
import { activeItemType } from "../header/Header";

interface ScheduleFixProps {
  setActiveItem: React.Dispatch<React.SetStateAction<activeItemType>>;
}

const ScheduleFix = ({ setActiveItem }: ScheduleFixProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [courts, setCourts] = useState<CourtTypes[]>([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchCourts = async () => {
      setIsLoading(true);
      const value = localStorage.getItem("userSession");
      const companyData: { companyId?: string | number } = value
        ? JSON.parse(value)
        : {};
      const courtsData = await retrieveCourtsByCompany(
        companyData?.companyId || 0
      );
      setCourts(courtsData);
      setIsLoading(false);
    };

    fetchCourts();
  }, []);

  return (
    <Box>
      <Typography
        sx={{ fontWeight: 600, letterSpacing: "0.2" }}
        fontSize="18px"
        color="#22303E"
      >
        Agendar horários
      </Typography>

      <Box marginTop={isMobile ? "24px" : "40px"}>
        {isLoading ? (
          <Box marginTop="180px" display="flex" justifyContent="center">
            <LoadingSpinner />
          </Box>
        ) : (
          <BulkReservation courts={courts} setActiveItem={setActiveItem} />
        )}
      </Box>
    </Box>
  );
};

export default ScheduleFix;
