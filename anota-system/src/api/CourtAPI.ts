import api from "./api";
import {
  CourtPayloadType,
  CreateCourtPayloadType,
  CourtTypes,
} from "../types/generalTypes";

export const updateCourt = async (data: CourtPayloadType) => {
  await api.put(`/Court/${data.courtId}`, { ...data });
};

export const createCourt = async (data: CreateCourtPayloadType) => {
  await api.post(`/Court`, { ...data });
};

export const getCourtsByCompany = async (
  companyId: string | number
): Promise<CourtTypes[]> => {
  try {
    const { data } = await api.get(`/Court/company/${companyId}`);
    return data.map((court: any) => ({
      courtId: court.id,
      companyId: court.company_id,
      name: court.name,
      modality: court.modality,
      description: court.description,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};
