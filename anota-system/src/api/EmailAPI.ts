import api from "./api";

export const sendEmail = (email: string, subject: string, body: string) => {
  api.post("/emailtest/send");
};
