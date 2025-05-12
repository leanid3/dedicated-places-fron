"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/lib/hooks/useAuth";
import style from "./regLog.module.css";

const LoginForm = () => {
  const { login, error, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Перенаправление если пользователь уже авторизован
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/profile");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
      });

      if (result?.success) {
        router.push("/profile");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  if (loading) return <div className={style.loading}>Загрузка...</div>;

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <h1 className={style.h1}>Вход</h1>

      <input
        type="email"
        placeholder="Эл. Почта"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        className={style.inp}
      />

      <input
        type="password"
        placeholder="Пароль"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
        minLength={6}
        className={style.inp}
      />

      {error && (
        <div className={style.error}>
          {typeof error === "string"
            ? error
            : Object.entries(error).map(([field, messages]) => (
                <div key={field}>
                  <strong>{field}:</strong>{" "}
                  {Array.isArray(messages)
                    ? messages.join(", ")
                    : String(messages)}
                </div>
              ))}
        </div>
      )}

      <button 
        type="submit" 
        className={style.but2}
        disabled={loading}
      >
        {loading ? "Вход..." : "Войти"}
      </button>
    </form>
  );
};

export default LoginForm;