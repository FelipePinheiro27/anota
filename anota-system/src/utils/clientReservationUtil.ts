import { FormDataType } from "../pages/clientsPages/Confirmation";
import {
  CourtTypes,
  ReservationPayloadType,
  ReservationTypes,
  ScheduledTimeTypes,
} from "../types/generalTypes";

export const getScheduledRangeTime = (slotsSelected: ReservationTypes[]) => {
  if (slotsSelected.length > 0) {
    const initialTime = slotsSelected[0].start;
    const finalTime = slotsSelected[slotsSelected.length - 1].end;

    return { initialTime, finalTime };
  }

  return null;
};

export const parseReservationDataToPayload = (
  userData: FormDataType,
  courtData: CourtTypes | null | undefined,
  scheduleData: ScheduledTimeTypes | undefined
) => {
  const createdDate = new Date(
    `${scheduleData?.date}T${
      scheduleData?.time && scheduleData.time[0].start
    }:00`
  );
  createdDate.setHours(createdDate.getHours() - 3);

  const endDate = new Date(
    `${scheduleData?.date}T${
      scheduleData?.time && scheduleData.time[scheduleData.time.length - 1].end
    }:00`
  );
  endDate.setHours(endDate.getHours() - 3);

  const price =
    scheduleData?.time &&
    scheduleData.time?.length > 0 &&
    scheduleData.time[0].price;

  const reservation: ReservationPayloadType = {
    user_name: userData.clientName,
    user_phone: userData.phoneNumer.replace(/\D/g, ""),
    court_id: Number(courtData?.courtId),
    modality: scheduleData?.modality || 0,
    price: price || 10,
    created_date: createdDate.toISOString(),
    end_date: endDate.toISOString(),
  };

  return reservation;
};
