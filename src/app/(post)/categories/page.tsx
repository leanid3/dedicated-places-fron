"use client";
import CategoriesList from "@/components/categories/CategoriesList";
import { getCategories } from "@/lib/categories";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@/types/types";

const CategoriesPage = () => {
  const {
    data: categories,
    isError,
    isLoading,
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-lg text-gray-600">Загрузка категорий...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-lg text-red-500">Категории не найдены</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
          Категории
        </h1>

        {categories && categories.length > 0 ? (
          <CategoriesList categories={categories} />
        ) : (
          <div className="flex min-h-[50vh] items-center justify-center">
            <p className="text-lg text-gray-600">Категории не найдены</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default CategoriesPage;
