import {
  BulkReservationPayloadType,
  ReservationPayloadType,
  ReservationScheduledResponse,
  ReservationTypes,
} from "../types/generalTypes";
import api from "./api";

export const getReservationsByDate = async (
  companyId: string | number,
  date: string
): Promise<ReservationScheduledResponse[]> => {
  try {
    const { data } =
      (await api.get(`/Reservation/scheduled/${companyId}/${date}`)) || [];
    const reponse: ReservationScheduledResponse[] = data.map((value: any) => ({
      id: value.id,
      client: value.client,
      clientPhone: value.client_phone,
      price: value.price,
      modality: value.modality,
      courtName: value.court_name,
      createdDate: value.created_date,
      endDate: value.end_date,
      isPaid: value.isPaid,
    }));

    return reponse;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getAvailableSchedulesByCourtAndDate = async (
  date: string,
  courtId: string | number,
  minutes: number | null
): Promise<ReservationTypes[]> => {
  try {
    const { data } =
      (await api.get(`/Reservation/available/${date}/${courtId}/${minutes}`)) ||
      {};
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createReservation = async (payload: ReservationPayloadType) => {
  try {
    await api.post("/Reservation", payload);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const bulkReservation = async (payload: BulkReservationPayloadType) => {
  try {
    await api.post("/Reservation/fix", payload);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getMyReservations = async (
  value: string
): Promise<ReservationScheduledResponse[]> => {
  try {
    const { data } =
      (await api.get(`/Reservation/myReservations/${value}`)) || [];
    const reponse: ReservationScheduledResponse[] = data.map((value: any) => ({
      id: value.id,
      client: value.client,
      clientPhone: value.client_phone,
      price: value.price,
      modality: value.modality,
      courtName: value.court.name,
      createdDate: value.created_date,
      endDate: value.end_date,
    }));

    return reponse;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const removeReservation = async (reservationId: string | number) => {
  return await api.delete(`/Reservation/${reservationId}`);
};

export const updateReservation = async (
  reservationId: string | number,
  payload: ReservationPayloadType
) => {
  try {
    const { data } = await api.put(`/Reservation/${reservationId}`, payload);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const markReservationAsPaid = async (
  reservationId: string | number,
  isPaid: boolean
) => {
  try {
    const { data } = await api.put(
      `/Reservation/mark-paid/${reservationId}`,
      isPaid,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
