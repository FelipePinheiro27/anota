import {
  ReservationPayloadType,
  ReservationTypes,
} from "../types/generalTypes";
import api from "./api";

export const getReservations = () => api.get("/ReservationConfig");

export const getAvailableSchedulesByCourtAndDate = async (
  date: string,
  courtId: string | number
): Promise<ReservationTypes[]> => {
  try {
    const { data } =
      (await api.get(`/Reservation/available/${date}/${courtId}`)) || {};
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createReservation = (payload: ReservationPayloadType) => {
  api.post("/Reservation", payload);
};
