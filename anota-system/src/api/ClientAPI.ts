import api from "./api";
import { CourtTypes } from "../types/generalTypes";

export const retrieveCourtsByCompany = async (
  companyId: string | number
): Promise<CourtTypes[]> => {
  try {
    const { data } = await api.get(`/Court/company/${companyId}`);

    const courts: CourtTypes[] = data.map((court: any) => ({
      courtId: court.id,
      companyId: court.company_id,
      name: court.name,
      modality: court.modality,
      description: court.description || "",
    }));

    return courts;
  } catch (error) {
    console.error(error);
    return [];
  }
};
