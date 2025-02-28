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

  const fetchCompany = async (dynamicPath: string) => {
    const data = await getCompanyByPathRouteKey(dynamicPath);

    setCompany(data);
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
