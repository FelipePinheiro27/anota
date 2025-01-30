import { ConfigReservations } from "../types/generalTypes";
import api from "./api";

export const retrieveReservationsConfigByCourtId = async (
  courtId: number | string
) => {
  const { data } =
    (await api.get<ConfigReservations[]>(
      `/ReservationConfig/court/${courtId}`
    )) || [];

  return data;
};

export const createOrUpdateReservationsConfigByCourtId = async (
  configs: ConfigReservations[]
) => {
  try {
    await api.post<ConfigReservations[]>("/ReservationConfig/bulk", configs);

    return true;
  } catch (err: any) {
    console.error(err);
    return false;
  }
};
