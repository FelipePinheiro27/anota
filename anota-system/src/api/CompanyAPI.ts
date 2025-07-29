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

export const updateCompany = async (
  id: string | number,
  payload: Partial<CompanyType>
): Promise<boolean> => {
  try {
    await api.put(`/Companies/${id}`, {
      ...payload,
    });

    return true;
  } catch (error: any) {
    console.error(error.response?.data?.message || "Erro ao atualizar empresa");
    return false;
  }
};

export const updatePathRouteKey = async (
  id: string | number,
  pathRouteKey: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    const { data } = await api.patch(`/Companies/${id}/pathRouteKey`, {
      pathRouteKey,
    });

    return { success: true, message: data.message };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Erro ao atualizar link personalizado";
    console.error(errorMessage);
    return { success: false, message: errorMessage };
  }
};

export const login = async (
  emailOrUser: string,
  password: string
): Promise<{
  message: string;
  companyId?: number;
  companyName?: string;
  token?: string;
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
