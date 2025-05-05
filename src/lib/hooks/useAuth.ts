"use client";
// hooks/useAuth.ts
import { useState, useEffect, useCallback } from "react";
import { AuthState, LoginData, RegisterData } from "@/types/types"; // Adjust the import path as necessary
export default function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });
  const base_url = "http://194.87.147.159:8000";



  const setLoading = (loading: boolean) => {
    setAuthState((prev) => ({ ...prev, loading }));
  };

  const setError = (error: string | null) => {
    setAuthState((prev) => ({ ...prev, error }));
  };

  const saveToken = (token: string) => {
    localStorage.setItem("access_token", token);
  };

  const getToken = () => {
    return localStorage.getItem("access_token");
  };

  const clearToken = () => {
    localStorage.removeItem("access_token");
  };

  const [lastChecked, setLastChecked] = useState<number>(0);

  const checkAuth = useCallback(
    async (force = false): Promise<boolean> => {
      if (!force && Date.now() - lastChecked < 30000 && authState.user) {
        return true;
      }

      setLoading(true);
      const token = getToken();

      if (!token) {
        setAuthState({
          user: null,
          loading: false,
          error: null,
        });
        return false;
      }

      try {
        const response = await fetch("http://your-api-url/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Unauthorized");

        const userData = await response.json();
        setAuthState({
          user: userData,
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
      }

      setLastChecked(Date.now());
    },
    [lastChecked, authState.user]
  );

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const register = async (data: RegisterData) => {
    setLoading(true);
    try {
      const response = await fetch(`${base_url}/api/v1/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Registration failed");
      }

      saveToken(responseData.access_token);
      setAuthState({
        user: responseData.user,
        loading: false,
        error: null,
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : "Registration error");
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (data: LoginData) => {
    setLoading(true);
    try {
      const response = await fetch(`${base_url}/api/v1//login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Login failed");
      }

      saveToken(responseData.access_token);
      setAuthState({
        user: responseData.user,
        loading: false,
        error: null,
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login error");
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await fetch(`${base_url}/api/v1//logout`, {
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

  return {
    ...authState,
    user: authState.user,
    register,
    login,
    logout,
    checkAuth,
    isAuthenticated: !!authState.user,
  };
}
