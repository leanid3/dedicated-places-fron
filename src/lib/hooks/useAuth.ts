"use client";
import { useState, useEffect, useCallback } from "react";
import { AuthState, LoginData, RegisterData } from "@/types/types";

export default function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });
  
  const base_url = "http://194.87.147.159:8000";
  const [lastChecked, setLastChecked] = useState<number>(0);

  // Упрощенная обработка токена
  const getToken = () => localStorage.getItem("access_token");
  const saveToken = (token: string) => localStorage.setItem("access_token", token);
  const clearToken = () => localStorage.removeItem("access_token");

  // Проверка авторизации
  const checkAuth = useCallback(async (force = false): Promise<boolean> => {
    if (!force && Date.now() - lastChecked < 30000 && authState.user) {
      return true;
    }

    const token = getToken();
    if (!token) {
      setAuthState(prev => ({ ...prev, loading: false }));
      return false;
    }

    try {
      const response = await fetch(`${base_url}/api/v1/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Unauthorized");
      
      const userData = await response.json();
      setAuthState({
        user: userData.data,
        loading: false,
        error: null,
      });
      return true;
    } catch (error) {
      clearToken();
      setAuthState({
        user: null,
        loading: false,
        error: error instanceof Error ? error.message : "Auth error",
      });
      return false;
    } finally {
      setLastChecked(Date.now());
    }
  }, [lastChecked, authState.user]);

  // Регистрация
  const register = async (data: RegisterData) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await fetch(`${base_url}/api/v1/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(
          responseData.errors 
            ? Object.values(responseData.errors).join(", ")
            : responseData.message || "Registration failed"
        );
      }
      console.log(responseData);
      if (!responseData.token) {
        throw new Error("No access token received");
      }

      saveToken(responseData.token);
      await checkAuth(true);
      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Registration error";
      setAuthState(prev => ({ ...prev, error: message, loading: false }));
      return { success: false, error: message };
    }
  };

  const login = async (data: LoginData) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await fetch(`${base_url}/api/v1/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(
          responseData.errors 
            ? Object.values(responseData.errors).join(", ")
            : responseData.message || "Login failed"
        );
      }
  
      if (!responseData.token) {
        throw new Error("No access token received");
      }
  
      saveToken(responseData.token);
      await checkAuth(true);
      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login error";
      setAuthState(prev => ({ ...prev, error: message, loading: false }));
      return { success: false, error: message };
    }
  };
  
  const logout = async () => {
    try {
      await fetch(`${base_url}/api/v1/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      });
    } finally {
      clearToken();
      setAuthState({
        user: null,
        loading: false,
        error: null,
      });
    }
  };

  // Остальные методы (login, logout) аналогично...

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    ...authState,
    isAuthenticated: !!authState.user,
    register,
    login,
    logout,
    checkAuth,
  };
}