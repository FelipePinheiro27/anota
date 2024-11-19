import { useEffect, useState } from "react";
import { CourtTypes } from "../types/generalTypes";
import { retrieveCourtsByCompany } from "../api/ClientAPI";

export const useClientReservation = () => {
  const [courts, setCourts] = useState<CourtTypes[]>([]);
  const [selectedCourt, setSelectedCourt] = useState<CourtTypes | null>(null);

  const onSelectCourt = (courtId: number | string) => {
    const court = courts.find((ct) => ct.courtId === courtId);

    setSelectedCourt(court || null);
  };

  useEffect(() => {
    const fetchCourts = async () => {
      setCourts(await retrieveCourtsByCompany());
    };

    fetchCourts();
  }, []);

  return {
    courts,
    selectedCourt,
    onSelectCourt,
  };
};
