"use client";
import CategoryCard from "./CategoryCard";
import { Category } from "@/types/types";
interface CategoriesProps {
  categories: Category[];
}
const CategoriesList = ({ categories }: CategoriesProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => {
        return (
          <CategoryCard key={category.category_id} category={category} />
        );
      })}
      </div>
  );
};

export default CategoriesList;
