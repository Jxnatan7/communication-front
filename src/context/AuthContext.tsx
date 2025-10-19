import axiosClient from '../lib/axiosClient';
import {createContext, useContext, useState, ReactNode, useEffect} from 'react';

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextData = {
  user: User | null;
  token: string | null;
  setToken: (token: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextData | undefined>(undefined);

const AuthProvider = function ({children}: {children: ReactNode}) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [houseId, setHouseId] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setToken(storedToken);
    } else {
      setToken(null);
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('accessToken', token);
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosClient.post('/auth/login', {email, password});
      const {token: authToken, user: authUser, houseId} = response.data;
      localStorage.setItem('accessToken', authToken);
      localStorage.setItem('houseId', houseId);

      setToken(authToken);
      setUser(authUser);
      setHouseId(houseId);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{user, token, setToken, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth precisa ser usado dentro de um AuthProvider');
  }
  return context;
};

export default AuthProvider;
