"use client";
import CategoryCard from "./CategoryCard";
import { Category } from "@/types/types";
interface CategoriesProps {
  categories: Category[];
}
const CategoriesList = ({ categories }: CategoriesProps) => {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 md:mx-0 mx-3 my-5">
      {categories.map((category) => {
        return <CategoryCard key={category.category_id} category={category} />;
      })}
    </div>
  );
};

export default CategoriesList;
