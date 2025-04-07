import { IUser } from '../interfaces/IUser';
import { api } from '../config/api';

export const UserService = {
  register: async (user: IUser) => {
    return api.post('/user', user);
  },

  findByEmail: async (email: string) => {
    return api.get(`/user?search=${email}`);
  },
};