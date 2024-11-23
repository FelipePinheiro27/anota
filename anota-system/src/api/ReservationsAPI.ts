import {
  ReservationPayloadType,
  ReservationScheduledResponse,
  ReservationTypes,
} from "../types/generalTypes";
import api from "./api";

export const getReservationsByDate = async (
  date: string
): Promise<ReservationScheduledResponse[]> => {
  try {
    const { data } = (await api.get(`/Reservation/scheduled/${date}`)) || [];
    const reponse: ReservationScheduledResponse[] = data.map((value: any) => ({
      client: value.client,
      clientPhone: value.client_phone,
      price: value.price,
      modality: value.modality,
      courtName: value.court_name,
      createdDate: value.created_date,
      endDate: value.end_date,
    }));

    return reponse;
  } catch (error) {
    console.error(error);
    return [];
  }
};

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
  try {
    api.post("/Reservation", payload);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
