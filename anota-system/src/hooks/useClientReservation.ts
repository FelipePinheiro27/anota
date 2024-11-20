import { useState } from "react";
import { CourtTypes, ScheduledTimeTypes } from "../types/generalTypes";

export const useClientReservation = () => {
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

  return {
    selectedCourt,
    onSelectCourt,
    scheduledTime,
    onSelectScheduleTime,
  };
};
