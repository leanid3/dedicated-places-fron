"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import style from "./regLog.module.css";
import { useMask } from "@react-input/mask";
import useAuth from "@/lib/hooks/useAuth";

const RegisterForm = () => {
  const { error, isAuthenticated, loading, register } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    // birth_date: "",
    fio: "",
    age: 0,
    phone: ""
  });

  const telMask = useMask({
    mask: "+7 (___) ___-__-__",
    replacement: { _: /\d/ },
  });

  useEffect(() => {
    if (isAuthenticated) router.push("/profile");
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.password_confirmation) {
      alert("Пароли не совпадают!");
      return;
    }

    const result = await register({
      ...formData,
      phone: formData.phone.replace(/\D/g, ""), // Очистка номера телефона
    });

    if (result.success) {
      router.push("/profile");
    }
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <h1 className={style.h1}>Регистрация</h1>
      
      {/* Поле имени */}
      <input
        type="text"
        placeholder="Логин"
        value={formData.name}
        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
        required
        className={style.inp}
      />
      {/* ФИО */}
      <input
        type="text"
        placeholder="ФИО"
        value={formData.fio}
        onChange={e => setFormData(prev => ({ ...prev, fio: e.target.value }))}
        required
        className={style.inp}
      />

      {/* Поле email */}
      <input
        type="email"
        placeholder="Эл. Почта"
        value={formData.email}
        onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
        required
        className={style.inp}
      />

      {/* Возраст */}
      <input
        type="number"
        placeholder="Возраст"
        min={1}
        max={100}
        value={formData.age}
        onChange={e => setFormData(prev => ({ ...prev, age: Number(e.target.value) }))}
        required
        className={style.inp}
      />

      {/* Пароли */}
      <input
        type="password"
        placeholder="Пароль"
        value={formData.password}
        onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
        required
        minLength={6}
        className={style.inp}
      />

      <input
        type="password"
        placeholder="Повторение пароля"
        value={formData.password_confirmation}
        onChange={e => setFormData(prev => ({ ...prev, password_confirmation: e.target.value }))}
        required
        minLength={6}
        className={style.inp}
      />

      {/* Дата рождения */}
      {/* <input
        type="date"
        placeholder="Дата рождения"
        value={formData.birth_date}
        onChange={e => setFormData(prev => ({ ...prev, birth_date: e.target.value }))}
        required
        className={style.inp}
        max={new Date().toISOString().split('T')[0]}
      /> */}

      {/* Телефон */}
      <input
        type="text"
        placeholder="Номер телефона"
        value={formData.phone}
        onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
        required
        className={style.inp}
        ref={telMask}
      />
     <button type="submit" className="  py-3 px-2 bg-amber-300 rounded-2xl ft-" disabled={loading}>
        {loading ? "Обработка..." : "Регистрация"}
      </button>
      {error && (
        <div className={style.error}>
          {typeof error === "string" ? error : "Ошибка регистрации"}
        </div>
      )}

    
    </form>
  );
};

export default RegisterForm;