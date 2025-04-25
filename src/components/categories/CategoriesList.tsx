"use client";
import CategoryCard from "./CategoryCard";
import { Category } from "@/types/types";
import style from "./categories.module.css";
interface CategoriesProps {
  categories: Category[];
}
const CategoriesList = ({ categories }: CategoriesProps) => {
  return (
    <div className={style.main}>
      <h1 className={style.h1}>Категории</h1>
      <div className={style.cards}>
        {categories.map((category) => {
          return (
            <CategoryCard key={category.category_id} category={category} />
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesList;
