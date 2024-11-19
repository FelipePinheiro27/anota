import React, { createContext, ReactNode } from "react";
import { CourtTypes } from "../types/generalTypes";
import { useClientReservation } from "../hooks/useClientReservation";

type ClientReservationContextType = {
  courts: CourtTypes[];
  selectedCourt: CourtTypes | null;
  onSelectCourt: (courtId: string | number) => void;
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
  const { courts, selectedCourt, onSelectCourt } = useClientReservation();

  return (
    <ClientReservationContext.Provider
      value={{ courts, selectedCourt, onSelectCourt }}
    >
      {children}
    </ClientReservationContext.Provider>
  );
};
