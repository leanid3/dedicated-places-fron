"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useMask } from "@react-input/mask";
import useAuth from "@/lib/hooks/useAuth";
import ErrorMessage from "../template/input/errorMessage";
import { RegisterFormData, ErrorRegisterForm } from "@/types/forms";
import Link from "next/link";

const RegisterForm = () => {
  const { error, isAuthenticated, loading, register } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) router.push("/profile");
  }, [isAuthenticated, router]);

  // данные для формы
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    fio: "",
    age: 0,
    phone: "",
  });

  // ошибки для формы
  const [formErrors, setFormErrors] = useState<ErrorRegisterForm>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    fio: "",
    age: 0,
    phone: "",
  });

  // таймер для задержки проверки ошибок
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // маска для телефона
  const telMask = useMask({
    mask: "+7 (___) ___-__-__",
    replacement: { _: /\d/ },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await register({
      ...formData,
      phone: formData.phone.replace(/\D/g, ""),
    });

    if (result.success) {
      router.push("/profile");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Очищаем ошибку при изменении поля
    setFormErrors((prev) => ({ ...prev, [field]: "" }));

    // Удаляем предыдущий таймер
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Устанавливаем новый таймер для проверки ошибок
    typingTimeoutRef.current = setTimeout(() => {
      checkErrors(field);
    }, 500); // задержка в 500 мс
  };

  // проверка на ошибки
  const checkErrors = (field: string) => {
    switch (field) {
      case "password":
        if (formData.password.length < 6) {
          setFormErrors((prev) => ({ ...prev, password: "Пароль должен быть не менее 6 символов!" }));
        } else {
          setFormErrors((prev) => ({ ...prev, password: "" }));
        }
        break;
      case "password_confirmation":
        if (formData.password !== formData.password_confirmation) {
          setFormErrors((prev) => ({ ...prev, password_confirmation: "Пароли не совпадают!" }));
        } else {
          setFormErrors((prev) => ({ ...prev, password_confirmation: "" }));
        }
        break;
      case "email":
        if (!formData.email.includes("@")) {
          setFormErrors((prev) => ({ ...prev, email: "Неверный формат электронной почты!" }));
        } else {
          setFormErrors((prev) => ({ ...prev, email: "" }));
        }
        break;
      case "name":
        if (formData.name.length < 3) {
          setFormErrors((prev) => ({ ...prev, name: "Имя должно быть не менее 3 символов!" }));
        } else {
          setFormErrors((prev) => ({ ...prev, name: "" }));
        }
        break;
      case "fio":
        if (formData.fio.length < 3) {
          setFormErrors((prev) => ({ ...prev, fio: "ФИО должно быть не менее 3 символов!" }));
        } else {
          setFormErrors((prev) => ({ ...prev, fio: "" }));
        }
        break;
    }
  };

  const getInputClassName = (field: keyof RegisterFormData) => {
    const baseClasses = "shadow-md rounded-md p-2 w-1/5 transition-all duration-300";
    if (formErrors[field as keyof ErrorRegisterForm]) {
      return `${baseClasses} border-2 border-red-500`;
    }
    if (formData[field] && !formErrors[field as keyof ErrorRegisterForm]) {
      return `${baseClasses} border-2 border-green-500`;
    } 
    return `${baseClasses} border-2 border-gray-300`;
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col items-center gap-5 h-[73vh] w-full">
      <h1 className="text-3xl font-bold mb-5">Регистрация</h1>

      {/* Логин */}
      <input
        type="text"
        placeholder="Логин"
        value={formData.name}
        onChange={(e) => handleInputChange("name", e.target.value)}
        required
        className={getInputClassName("name")}
      />
      {formErrors.name && <ErrorMessage type="error" message={formErrors.name} />}

      {/* ФИО */}
      <input
        type="text"
        placeholder="ФИО"
        value={formData.fio}
        onChange={(e) => handleInputChange("fio", e.target.value)}
        required
        className={getInputClassName("fio")}
      />
      {formErrors.fio && <ErrorMessage type="error" message={formErrors.fio} />}

      {/* электронная почта */}
      <input
        type="email"
        placeholder="Эл. Почта"
        value={formData.email}
        onChange={(e) => handleInputChange("email", e.target.value)}
        required
        className={getInputClassName("email")}
      />
      {formErrors.email && <ErrorMessage type="error" message={formErrors.email} />}

      {/* возраст */}
      <input
        type="number"
        placeholder="Возраст"
        min={1}
        max={100}
        value={formData.age}
        onChange={(e) => handleInputChange("age", e.target.value)}
        required
        className={getInputClassName("age")}
      />

      <input
        type="text"
        placeholder="Номер телефона"
        value={formData.phone}
        onChange={(e) => handleInputChange("phone", e.target.value)}
        required
        className={getInputClassName("phone")}
        ref={telMask}
      />
      {formErrors.phone && <ErrorMessage type="error" message={formErrors.phone} />}

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

      <input
        type="password"
        placeholder="Повторение пароля"
        value={formData.password_confirmation}
        onChange={(e) => handleInputChange("password_confirmation", e.target.value)}
        required
        minLength={6}
        className={getInputClassName("password_confirmation")}
      />
      {formErrors.password_confirmation && <ErrorMessage type="error" message={formErrors.password_confirmation} />}

      <button
        type="submit"
        className="py-3 px-2 bg-amber-300 rounded-2xl font-bold hover:bg-amber-500 hover:text-white transition-all duration-300 cursor-pointer"
        disabled={loading}
      >
        {loading ? "Обработка..." : "Регистрация"}
      </button>
      {error && (
        <div className="text-red-500">
          {typeof error === "string" ? error : "Ошибка регистрации"}
        </div>
      )}
      <div className="text-sm text-gray-500">
        Уже есть аккаунт? <Link href="/login" className="text-amber-500 hover:text-amber-700 transition-all duration-300">Войти</Link>
      </div>
    </form>
  );
};

export default RegisterForm;
