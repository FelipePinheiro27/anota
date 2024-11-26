export type DateButtonTypes = "today" | "specific";

export type CourtTypes = {
  courtId: number | string;
  companyId: number;
  name: string;
  modality: ModalityEnum;
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

export type ReservationScheduledResponse = {
  client: string;
  clientPhone: string;
  courtName: string;
  price: number;
  createdDate: string;
  endDate: string;
  modality: ModalityEnum;
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
};
