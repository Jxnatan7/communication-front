import axiosClient from "@/api/axiosClient";
import { useRouter } from "next/router";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

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
  house: string | null;
};

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [house, setHouse] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const storedHouse = localStorage.getItem("houseId");

    if (storedHouse) {
      setHouse(storedHouse);
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("accessToken", token);
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosClient.post("/auth/login", {
        email,
        password,
      });
      const { token: authToken, user: authUser, houseId } = response.data;
      localStorage.setItem("accessToken", authToken);
      setToken(authToken);
      setUser(authUser);
      if (houseId) {
        setHouse(houseId);
        localStorage.setItem("houseId", houseId);
      }
      router.push("/dashboard");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, setToken, login, logout, house }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth precisa ser usado dentro de um AuthProvider");
  }
  return context;
};
