"use client";
import Link from "next/link";
import { Category } from "@/types/types";
import style from "./categories.module.css";
interface CategoryProps {
  category: Category;
}
const CategoryCard = ({ category }: CategoryProps) => {
  return (
    <div className={style.card} key={category.category_id}>
      <h1 className="">
        <Link href={`/categories/${category.category_id}`}>
          {category.name}
        </Link>
      </h1>
    </div>
  );
};

export default CategoryCard;
