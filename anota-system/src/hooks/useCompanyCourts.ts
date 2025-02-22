import React, { useCallback } from "react";
import { CourtTypes } from "../types/generalTypes";
import { retrieveCourtsByCompany } from "../api/ClientAPI";
import { getCompanyData } from "../utils/generalUtil";

interface companyCourtsProps {
  setCourts: React.Dispatch<React.SetStateAction<CourtTypes[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useCompanyCourts = ({
  setCourts,
  setIsLoading,
}: companyCourtsProps) => {
  const fetchCourts = useCallback(async () => {
    try {
      setIsLoading(true);
      const companyData = getCompanyData();
      const courtsData = await retrieveCourtsByCompany(
        companyData?.companyId || 0
      );
      setCourts(courtsData);
    } catch (error) {
      console.error("Failed to fetch courts:", error);
    } finally {
      setIsLoading(false);
    }
  }, [setCourts, setIsLoading]);

  return { fetchCourts };
};
