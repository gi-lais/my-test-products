import { IUser } from "../interfaces/IUser";
import { api } from "../config/api";

export const UserService = {
  register: async (user: IUser) => {
    return api.post("/user", user);
  },

  findByEmail: async (email: string) => {
    try {
      const response = await api.get(`/user?search=${email}`);
      return response;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return { data: [] };
      }
      throw error;
    }
  },
};
