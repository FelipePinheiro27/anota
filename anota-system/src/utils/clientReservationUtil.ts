import { ReservationTypes } from "../types/generalTypes";

export const getScheduledRangeTime = (slotsSelected: ReservationTypes[]) => {
  if (slotsSelected.length > 0) {
    const initialTime = slotsSelected[0].start;
    const finalTime = slotsSelected[slotsSelected.length - 1].end;

    return { initialTime, finalTime };
  }

  return null;
};
