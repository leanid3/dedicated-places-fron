"use client";
import CategoriesList from "@/components/categories/CategoriesList";
import { getCategories } from "@/lib/categories";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@/types/types";
import style from "@/components/categories/categories.module.css";

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
    return <div>загрузка категорий</div>;
  }
  if (isError) {
    return <div>категории не найдены</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className={style.h1}>Категории</h1>

      {categories && categories.length > 0 ? (
        <CategoriesList categories={categories} />
      ) : (
        <div>категории не найдены</div>
      )}
    </div>
  );
};

export default CategoriesPage;
