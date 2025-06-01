"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/lib/hooks/useAuth";
import ErrorMessage from "../template/input/errorMessage";
import Link from "next/link";

const LoginForm = () => {
  const { login, error, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: "" }));

    // Проверка ошибок
    if (field === "email" && !value.includes("@")) {
      setFormErrors((prev) => ({ ...prev, email: "Неверный формат электронной почты!" }));
    }
    if (field === "password" && value.length < 6) {
      setFormErrors((prev) => ({ ...prev, password: "Пароль должен быть не менее 6 символов!" }));
    }
  };

  const getInputClassName = (field: keyof typeof formData) => {
    const baseClasses = "shadow-md rounded-md p-2 w-1/5 transition-all duration-300";
    if (formErrors[field]) {
      return `${baseClasses} border-2 border-red-500`;
    }
    if (formData[field] && !formErrors[field]) {
      return `${baseClasses} border-2 border-green-500`;
    }
    return `${baseClasses} border-2 border-gray-300`;
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col items-center gap-5 h-[73vh] w-full">
      <h1 className="text-3xl font-bold mb-5">Вход</h1>

      <input
        type="email"
        placeholder="Эл. Почта"
        value={formData.email}
        onChange={(e) => handleInputChange("email", e.target.value)}
        required
        className={getInputClassName("email")}
      />
      {formErrors.email && <ErrorMessage type="error" message={formErrors.email} />}

      <input
        type="password"
        placeholder="Пароль"
        value={formData.password}
        onChange={(e) => handleInputChange("password", e.target.value)}
        required
        minLength={6}
        className={getInputClassName("password")}
      />
      {formErrors.password && <ErrorMessage type="error" message={formErrors.password} />}

      {error && (
        <div className="text-red-500">
          {typeof error === "string" ? error : "Ошибка входа"}
        </div>
      )}

      <button 
        type="submit" 
        className="py-3 px-2 bg-amber-300 rounded-2xl font-bold hover:bg-amber-500 hover:text-white transition-all duration-300 cursor-pointer"
        disabled={loading}
      >
        {loading ? "Вход..." : "Войти"}
      </button>

      <div className="text-sm text-gray-500">
        Нет аккаунта? <Link href="/register" className="text-amber-500 hover:text-amber-700 transition-all duration-300">Зарегистрироваться</Link>
      </div>
    </form>
  );
};

export default LoginForm;