export type DateButtonTypes = "today" | "specific";

type ModalitiesTypes = 0 | 1 | 2;

export type CourtTypes = {
  courtId: number | string;
  companyId: number;
  name: string;
  modality: ModalitiesTypes;
  description: string;
};

export type ReservationTypes = {
  start: string;
  end: string;
};

export type ScheduledTimeTypes = {
  time?: ReservationTypes[];
  date?: string;
  modality?: number;
};

export type ReservationPayloadType = {
  user_name: string;
  user_phone: string;
  court_id: number;
  price: number;
  created_date: string;
  end_date: string;
};
