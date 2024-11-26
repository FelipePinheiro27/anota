import { CompanyType } from "../types/generalTypes";
import api from "./api";

export const getCompanyByPathRouteKey = async (
  pathRouteKey: string
): Promise<CompanyType | null> => {
  try {
    const { data } = await api.get<CompanyType | null>(
      `/Companies/routeKey/${pathRouteKey}`
    );

    return data;
  } catch (error: any) {
    console.error(error.response?.data?.message || "Erro ao acessar empresa");
    return null;
  }
};

export const login = async (
  emailOrUser: string,
  password: string
): Promise<{
  message: string;
  companyId?: number;
  companyName?: string;
  success: boolean;
} | null> => {
  try {
    const { data } = await api.post("/Companies/login", {
      emailOrUser,
      password,
    });
    return data;
  } catch (error: any) {
    console.error(error.response?.data?.message || "Erro ao realizar login");
    return null;
  }
};
