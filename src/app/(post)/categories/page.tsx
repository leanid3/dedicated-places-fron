"use client";
import CategoriesList from "@/components/categories/CategoriesList";
import { getCategories } from "@/lib/categories";
import { useQuery } from "@tanstack/react-query";

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
    <div>
      {categories && categories.length > 0 ? (
        <div className="">
          <CategoriesList categories={categories} />
        </div>
      ) : (
        <div>категории не найдены</div>
      )}
    </div>
  );
}

export default CategoriesPage