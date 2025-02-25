import { CompanyFormType, CompanyType } from "../types/generalTypes";
import api from "./api";

export const getCompanyById = async (
  id: string
): Promise<CompanyType | null> => {
  try {
    const { data } = await api.get<CompanyType | null>(`/Companies/${id}`);

    return data;
  } catch (error: any) {
    console.error(error.response?.data?.message || "Erro ao resgatar empresa");
    return null;
  }
};

export const getCompanyByPathRouteKey = async (
  pathRouteKey: string
): Promise<CompanyType | null> => {
  try {
    const { data } = await api.get<CompanyType | null>(
      `/Companies/routeKey/${pathRouteKey}`
    );

    return data;
  } catch (error: any) {
    console.error(error.response?.data?.message || "Erro ao trazer empresa");
    return null;
  }
};

export const createCompany = async (payload: CompanyFormType) => {
  try {
    await api.post<CompanyType | null>("/Companies", {
      ...payload,
    });

    return true;
  } catch (error: any) {
    console.error(error);
    return false;
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
