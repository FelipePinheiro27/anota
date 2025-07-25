export type DateButtonTypes = "today" | "specific";

export type CourtTypes = {
  courtId: number | string;
  companyId: number;
  name: string;
  modality: number;
  description: string;
};

export type ReservationTypes = {
  price: number;
  start: string;
  end: string;
};

export type ScheduledTimeTypes = {
  time?: ReservationTypes[];
  date?: string;
  modality?: ModalityEnum;
};

export type ReservationPayloadType = {
  user_name: string;
  user_phone: string;
  court_id: number;
  price: number;
  created_date: string;
  end_date: string;
  modality: ModalityEnum;
};

export type BulkReservationPayloadType = {
  user_name: string;
  user_phone: string;
  court_id: number;
  price: number;
  startDate: string;
  startTime: string;
  endTime: string;
  durationMonths: number;
  modality: ModalityEnum;
};

export type ReservationScheduledResponse = {
  id?: string | number;
  client: string;
  clientPhone: string;
  courtName: string;
  price: number;
  createdDate: string;
  endDate: string;
  modality: ModalityEnum;
  isPaid?: boolean;
};

export enum ModalityEnum {
  BeachTennis = 0,
  Futvolei = 1,
  Volei = 2,
}

export type CompanyType = {
  id: number | string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  pathRouteKey: string;
  isPaid: boolean;
  plan: "BASICO" | "AVANCADO" | "PRO" | "";
};

export type CompanyFormType = {
  user: string;
  email: string;
  name: string;
  pass: string;
  pathRouteKey: string;
  primaryColor: string;
  secondaryColor: string;
};

export type CourtPayloadType = {
  courtId: number | string;
  company_id: number | string;
  name: string;
  modality: number;
  description: string;
};

export type ConfigReservations = {
  id?: number | string;
  day_of_week: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  price: number;
  start_time: string;
  end_time: string;
  court_id: number | string;
};

export type CreateCourtPayloadType = {
  company_id: number | string;
  name: string;
  modality: number;
  description: string;
  image_url: string;
};
