"use client";

import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";

interface AuthContextType {
  user: any;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterProps) => Promise<boolean>;
  logout: () => Promise<void>;
}
interface RegisterProps {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const APP_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        try {
          const response = await fetch(`${APP_URL}/api/v1/user`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });
          if (!response.ok) throw new Error();
          const userData = await response.json();
          setUser(userData);
          setToken(storedToken);
        } catch (error) {
          localStorage.removeItem("authToken");
        }
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${APP_URL}/api/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Вход не выполнен");
      localStorage.setItem("authToken", data.token);
      setUser(data.user);
      setToken(data.token);
      return true;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
      return false;
    }
  };

  const register = async (userData: RegisterProps) => {
    try {
      const response = await fetch(`${APP_URL}/api/v1/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) {
        if (data.error) throw data.errors;
        throw new Error(data.message || "Регистрация не прошла");
      }
      return await login(userData.email, userData.password);
    } catch (error) {
      setError(String(error));
      return false;
    }
  };
  const logout = async () => {
    try {
      await fetch(`${APP_URL}/api/v1/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } finally {
      localStorage.removeItem("authToken");
      setUser(null);
      setToken(null);
    }
  };
  return (
    <AuthContext.Provider
      value={{ user, isLoading, error, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
