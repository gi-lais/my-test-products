import { createContext, useContext, useState } from 'react';
import { UserService } from '../services/userService';

interface AuthContextProps {
  user: string | null;
  login: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    const { data } = await UserService.findByEmail(email);
    const found = data[0];

    if (found && found.password === password) {
      localStorage.setItem('token', found.id);
      setUser(found.name);
    } else {
      throw new Error('Email ou senha inválidos');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);