export type DateButtonTypes = "today" | "specific";

type ModalitiesTypes = 0 | 1 | 2;

export type CourtTypes = {
  courtId: number | string;
  companyId: number;
  name: string;
  modality: ModalitiesTypes;
  description: string;
};
