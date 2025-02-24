import api from "./api";
import {
  CourtPayloadType,
  CreateCourtPayloadType,
} from "../types/generalTypes";

export const updateCourt = async (data: CourtPayloadType) => {
  await api.put(`/Court/${data.courtId}`, { ...data });
};

export const createCourt = async (data: CreateCourtPayloadType) => {
  await api.post(`/Court`, { ...data });
};
