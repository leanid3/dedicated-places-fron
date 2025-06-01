"use client";
import Link from "next/link";
import { Category } from "@/types/types";

interface CategoryProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryProps) => {
  return (
    <div className="group relative flex h-[200px] w-[350px] items-center justify-center rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-amber-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <h1 className="relative text-2xl font-semibold text-gray-800 transition-colors duration-300 group-hover:text-amber-500">
        <Link href={`/categories/${category.category_id}`}>
          {category.name}
        </Link>
      </h1>
    </div>
  );
};

export default CategoryCard;
