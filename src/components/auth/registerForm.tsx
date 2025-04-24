"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/lib/hooks/useAuth";
import style from "./register.module.css";
import { useMask } from "@react-input/mask";

const RegisterForm = () => {
  const { register, error, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const telMask = useMask({
    mask: "+_(___)-___-__-__",
    replacement: { _: /\d/ },
  });

  // Перенаправление если пользователь уже авторизован
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/profile");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Проверка совпадения паролей на клиенте
    if (formData.password !== formData.password_confirmation) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const status = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      });

      console.log("register success");
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <h1 className={style.h1}>Регистрация</h1>
      <input
        type="text"
        placeholder="Логин"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
      <input
        type="password"
        placeholder="Повторение пароля"
        value={formData.password_confirmation}
        onChange={(e) =>
          setFormData({ ...formData, password_confirmation: e.target.value })
        }
        required
        minLength={6}
        className={style.inp}
      />
      {/* ДОДЕЛАТЬ БЕК
       <input
        type="date"
        placeholder="Дата рождения"
        value={formData.ДОДЕЛАТЬ}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        className={style.inp}
      /> */}
      <input
        type="email"
        placeholder="Эл. Почта"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        className={style.inp}
      />
      {/* ДОДЕЛАТЬ БЕК
      <input
        type="text"
        placeholder="Номер телефона"
        value={formData.ДОДЕЛАТЬ}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        className={style.inp}
        ref={telMask}
      /> */}

      {error && (
        <div className="text-red-500">
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

      <button type="submit" className={style.but}>
        Регистрация
      </button>
    </form>
  );
};

export default RegisterForm;
