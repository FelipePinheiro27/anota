import api from "./api";
import { CourtPayloadType } from "../types/generalTypes";

export const updateCourt = async (data: CourtPayloadType) => {
  await api.put(`/Court/${data.courtId}`, { ...data });
};
