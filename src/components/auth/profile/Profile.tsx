"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/lib/hooks/useAuth";

export default function Profile() {
  const router = useRouter();
  const { user, loading, error, isAuthenticated, checkAuth } = useAuth();

  // Добавляем метод logout в хук
  const logout = async () => {
    localStorage.removeItem("access_token");
    await checkAuth(true);
    router.push("/login");
  };

  // Проверка авторизации и редирект
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);


  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded">
        Error: {error}
      </div>
    );
  }

  if (!user) {
    return null;
  }

  console.log(user);
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Профиль пользователя</h1>
      
      <div className="space-y-2">
        <ProfileField label="Имя" value={user.name} />
        <ProfileField label="Email" value={user.email} />
        {user.phone && <ProfileField label="Телефон" value={user.phone} />}
        {/* {user.age && (
          <ProfileField 
            label="Дата рождения" 
            value={new Date(user.age).toLocaleDateString()} 
          />
        )} */}
      </div>

      <button
        onClick={logout}
        className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Выйти
      </button>
    </div>
  );
}

// Компонент для отображения полей профиля
const ProfileField = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center border-b pb-2">
    <span className="text-gray-600">{label}:</span>
    <span className="text-gray-800">{value}</span>
  </div>
);