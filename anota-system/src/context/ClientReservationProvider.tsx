import React, { createContext, ReactNode } from "react";
import {
  CompanyType,
  CourtTypes,
  ScheduledTimeTypes,
} from "../types/generalTypes";
import { useClientReservation } from "../hooks/useClientReservation";

type ClientReservationContextType = {
  company: CompanyType | null;
  fetchCompany: (dynamicPath: string) => Promise<void>;
  selectedCourt: CourtTypes | null;
  onSelectCourt: (court: CourtTypes) => void;
  scheduledTime: ScheduledTimeTypes;
  onSelectScheduleTime: (data: ScheduledTimeTypes) => void;
};

export const ClientReservationContext = createContext<
  ClientReservationContextType | undefined
>(undefined);

interface ClientReservationProviderProps {
  children: ReactNode;
}

export const ClientReservationProvider = ({
  children,
}: ClientReservationProviderProps) => {
  const {
    company,
    fetchCompany,
    selectedCourt,
    onSelectCourt,
    scheduledTime,
    onSelectScheduleTime,
  } = useClientReservation();

  return (
    <ClientReservationContext.Provider
      value={{
        company,
        fetchCompany,
        selectedCourt,
        onSelectCourt,
        scheduledTime,
        onSelectScheduleTime,
      }}
    >
      {children}
    </ClientReservationContext.Provider>
  );
};
