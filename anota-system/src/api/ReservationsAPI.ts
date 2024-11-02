import api from "./api";

export const getReservations = () => api.get("/ReservationConfig");
