import api from "./api";

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
