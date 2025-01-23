import { useState } from "react";
import {
  CompanyType,
  CourtTypes,
  ScheduledTimeTypes,
} from "../types/generalTypes";
import { getCompanyByPathRouteKey } from "../api/CompanyAPI";

export const useClientReservation = () => {
  const [company, setCompany] = useState<CompanyType | null>(null);
  const [selectedCourt, setSelectedCourt] = useState<CourtTypes | null>(null);
  const [scheduledTime, setScheduledTime] = useState<ScheduledTimeTypes>({
    time: [],
    date: "",
  });

  const onSelectCourt = (court: CourtTypes) => {
    setSelectedCourt(court);
  };

  const onSelectScheduleTime = (data: ScheduledTimeTypes) => {
    setScheduledTime(data);
  };

  const fetchCompany = async (
    dynamicPath: string,
    maxRetries = 4,
    delay = 2000
  ) => {
    let attempts = 0;

    while (attempts < maxRetries) {
      const data = await getCompanyByPathRouteKey(dynamicPath);
      if (!data) {
        attempts++;
        if (attempts >= maxRetries) {
          return;
        }

        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        setCompany(data);

        return;
      }
    }
  };

  return {
    company,
    fetchCompany,
    selectedCourt,
    onSelectCourt,
    scheduledTime,
    onSelectScheduleTime,
  };
};
