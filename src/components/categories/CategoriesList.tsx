"use client";
import CategoryCard from "./CategoryCard";
import { Category } from "@/types/types";

interface CategoriesProps {
  categories: Category[];
}

const CategoriesList = ({ categories }: CategoriesProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {categories.map((category) => (
        <div key={category.category_id} className="flex justify-center">
          <CategoryCard category={category} />
        </div>
      ))}
    </div>
  );
};

export default CategoriesList;
